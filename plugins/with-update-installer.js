const { withAndroidManifest, withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const pkg = "com.evrasia.hd";
const kotlinSource = "package com.evrasia.hd\n\nimport android.app.Activity\nimport android.content.Intent\nimport android.net.Uri\nimport android.os.Build\nimport android.provider.Settings\nimport androidx.core.content.FileProvider\nimport com.facebook.react.bridge.Arguments\nimport com.facebook.react.bridge.BaseActivityEventListener\nimport com.facebook.react.bridge.Promise\nimport com.facebook.react.bridge.ReactApplicationContext\nimport com.facebook.react.bridge.ReactContextBaseJavaModule\nimport com.facebook.react.bridge.ReactMethod\nimport com.facebook.react.modules.core.DeviceEventManagerModule\nimport java.io.File\nimport java.net.HttpURLConnection\nimport java.net.URL\nimport java.security.MessageDigest\nimport java.util.concurrent.Executors\nimport java.util.concurrent.atomic.AtomicBoolean\n\nclass UpdateInstallerModule(private val ctx: ReactApplicationContext) : ReactContextBaseJavaModule(ctx) {\n  private val executor = Executors.newSingleThreadExecutor()\n  private val busy = AtomicBoolean(false)\n  private var pending: Pair<File, Promise>? = null\n  private val permissionRequest = 8449\n\n  override fun getName() = \"UpdateInstaller\"\n  override fun getConstants(): MutableMap<String, Any> =\n    hashMapOf(\"currentVersionCode\" to BuildConfig.VERSION_CODE)\n\n  private val listener = object : BaseActivityEventListener() {\n    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {\n      if (requestCode != permissionRequest) return\n      val pair = pending ?: return\n      pending = null\n      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !ctx.packageManager.canRequestPackageInstalls()) {\n        busy.set(false)\n        pair.second.reject(\"INSTALL_PERMISSION\", \"Разрешение на установку не предоставлено. Разрешите установку из этого источника и повторите попытку.\")\n      } else openInstaller(pair.first, pair.second)\n    }\n  }\n\n  init { ctx.addActivityEventListener(listener) }\n\n  private fun allowedHost(host: String): Boolean =\n    host == \"github.com\" || host.endsWith(\".githubusercontent.com\")\n\n  private fun openDownload(initial: String): HttpURLConnection {\n    var url = URL(initial)\n    repeat(7) {\n      if (url.protocol != \"https\" || !allowedHost(url.host.lowercase())) {\n        throw IllegalStateException(\"Недопустимый адрес загрузки\")\n      }\n      val c = url.openConnection() as HttpURLConnection\n      c.instanceFollowRedirects = false\n      c.connectTimeout = 15000\n      c.readTimeout = 30000\n      c.setRequestProperty(\"User-Agent\", \"EvrasiaHD-Updater\")\n      val status = c.responseCode\n      if (status in 300..399) {\n        url = URL(url, c.getHeaderField(\"Location\") ?: throw IllegalStateException(\"Пустая переадресация\"))\n        c.disconnect()\n      } else {\n        if (status != 200) {\n          c.disconnect()\n          throw IllegalStateException(\"Ошибка загрузки APK, HTTP \" + status)\n        }\n        return c\n      }\n    }\n    throw IllegalStateException(\"Слишком много переадресаций\")\n  }\n\n  private fun progress(received: Long, total: Long) {\n    val event = Arguments.createMap()\n    event.putDouble(\"received\", received.toDouble())\n    event.putDouble(\"total\", total.toDouble())\n    event.putInt(\"percent\", ((received * 100.0) / total).toInt().coerceIn(0, 100))\n    ctx.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit(\"EvrasiaUpdateProgress\", event)\n  }\n\n  private fun verifyPackage(file: File, requested: Int) {\n    val info = ctx.packageManager.getPackageArchiveInfo(file.absolutePath, 0)\n      ?: throw IllegalStateException(\"Скачанный файл не распознан как APK\")\n    if (info.packageName != ctx.packageName) throw IllegalStateException(\"APK относится к другому приложению\")\n    val version = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) info.longVersionCode else info.versionCode.toLong()\n    if (version != requested.toLong() || version <= BuildConfig.VERSION_CODE) {\n      throw IllegalStateException(\"Версия скачанного APK не совпадает с заявленной\")\n    }\n  }\n\n  @ReactMethod\n  fun downloadAndInstall(url: String, sha256: String, size: Double, version: Int, promise: Promise) {\n    val count = size.toLong()\n    if (!Regex(\"^[a-fA-F0-9]{64}$\").matches(sha256) || count < 1024 ||\n        count > 200L * 1024 * 1024 || size != count.toDouble() ||\n        version <= BuildConfig.VERSION_CODE || version > 1000000 ||\n        url != \"https://github.com/lvlaksim1/evrasia-hd/releases/download/v\" + version + \"/evrasia-hd-v\" + version + \".apk\") {\n      promise.reject(\"INVALID_UPDATE\", \"Некорректные параметры обновления\")\n      return\n    }\n    if (!busy.compareAndSet(false, true)) {\n      promise.reject(\"UPDATE_BUSY\", \"Обновление уже выполняется\")\n      return\n    }\n    executor.execute {\n      val dir = File(ctx.cacheDir, \"updates\").apply { mkdirs() }\n      val temporary = File(dir, \"v\" + version + \".part\")\n      val destination = File(dir, \"v\" + version + \".apk\")\n      try {\n        temporary.delete()\n        val digest = MessageDigest.getInstance(\"SHA-256\")\n        var received = 0L\n        var lastNotification = 0L\n        val connection = openDownload(url)\n        try {\n          connection.inputStream.use { input ->\n            temporary.outputStream().use { output ->\n              val buffer = ByteArray(65536)\n              while (true) {\n                val n = input.read(buffer)\n                if (n < 0) break\n                received += n.toLong()\n                if (received > count) throw IllegalStateException(\"Размер файла превышает указанный GitHub\")\n                digest.update(buffer, 0, n)\n                output.write(buffer, 0, n)\n                val now = System.currentTimeMillis()\n                if (now - lastNotification >= 150) {\n                  progress(received, count)\n                  lastNotification = now\n                }\n              }\n            }\n          }\n        } finally { connection.disconnect() }\n        if (received != count) throw IllegalStateException(\"APK скачан не полностью\")\n        val actual = digest.digest().joinToString(\"\") { \"%02x\".format(it) }\n        if (!actual.equals(sha256, ignoreCase = true)) {\n          throw IllegalStateException(\"Контрольная сумма APK не совпадает с GitHub\")\n        }\n        if (destination.exists() && !destination.delete()) throw IllegalStateException(\"Не удалось заменить файл APK\")\n        if (!temporary.renameTo(destination)) throw IllegalStateException(\"Не удалось подготовить файл APK\")\n        try {\n          verifyPackage(destination, version)\n        } catch (error: Exception) {\n          destination.delete()\n          throw error\n        }\n        progress(received, count)\n        ctx.runOnUiQueueThread { prepareInstall(destination, promise) }\n      } catch (error: Exception) {\n        temporary.delete()\n        busy.set(false)\n        promise.reject(\"DOWNLOAD_FAILED\", error.message ?: \"Не удалось проверить или скачать APK\", error)\n      }\n    }\n  }\n\n  private fun prepareInstall(apk: File, promise: Promise) {\n    val activity = ctx.currentActivity\n    if (activity == null) {\n      busy.set(false)\n      promise.reject(\"NO_ACTIVITY\", \"Не удалось открыть системный установщик\")\n      return\n    }\n    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !ctx.packageManager.canRequestPackageInstalls()) {\n      try {\n        pending = apk to promise\n        activity.startActivityForResult(\n          Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse(\"package:\" + ctx.packageName)),\n          permissionRequest\n        )\n      } catch (error: Exception) {\n        pending = null\n        busy.set(false)\n        promise.reject(\"INSTALL_PERMISSION\", error.message ?: \"Не удалось открыть разрешения установки\", error)\n      }\n      return\n    }\n    openInstaller(apk, promise)\n  }\n\n  private fun openInstaller(apk: File, promise: Promise) {\n    try {\n      val activity = ctx.currentActivity ?: throw IllegalStateException(\"Приложение неактивно\")\n      val uri = FileProvider.getUriForFile(ctx, ctx.packageName + \".updates\", apk)\n      val intent = Intent(Intent.ACTION_VIEW).apply {\n        setDataAndType(uri, \"application/vnd.android.package-archive\")\n        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)\n      }\n      activity.startActivity(intent)\n      promise.resolve(true)\n    } catch (error: Exception) {\n      promise.reject(\"INSTALL_FAILED\", error.message ?: \"Не удалось запустить установку\", error)\n    } finally { busy.set(false) }\n  }\n}\n";

function withUpdateInstallerManifest(config) {
  return withAndroidManifest(config, config => {
    const manifest = config.modResults.manifest;
    manifest["uses-permission"] = manifest["uses-permission"] || [];
    if (!manifest["uses-permission"].some(item => item.$?.["android:name"] === "android.permission.REQUEST_INSTALL_PACKAGES")) {
      manifest["uses-permission"].push({ $: { "android:name": "android.permission.REQUEST_INSTALL_PACKAGES" } });
    }
    const application = manifest.application[0];
    application.provider = application.provider || [];
    if (!application.provider.some(item => item.$?.["android:authorities"] === pkg + ".updates")) {
      application.provider.push({
        $: { "android:name": "androidx.core.content.FileProvider",
             "android:authorities": pkg + ".updates",
             "android:exported": "false",
             "android:grantUriPermissions": "true" },
        "meta-data": [{ $: { "android:name": "android.support.FILE_PROVIDER_PATHS", "android:resource": "@xml/update_file_paths" } }]
      });
    }
    return config;
  });
}

function withUpdateInstallerNative(config) {
  return withDangerousMod(config, ["android", async config => {
    const root = config.modRequest.projectRoot;
    const dir = path.join(root, "android", "app", "src", "main", "java", ...pkg.split("."));
    const xmlDir = path.join(root, "android", "app", "src", "main", "res", "xml");
    fs.mkdirSync(dir, { recursive: true });
    fs.mkdirSync(xmlDir, { recursive: true });
    fs.writeFileSync(path.join(xmlDir, "update_file_paths.xml"), '<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
  <cache-path name="updates" path="updates/" />
</paths>
');
    fs.writeFileSync(path.join(dir, "UpdateInstallerModule.kt"), kotlinSource);
    const nativePackage = path.join(dir, "SmsCodePackage.kt");
    if (!fs.existsSync(nativePackage)) throw new Error("SmsCodePackage missing; update installer must run after with-sms-code");
    let source = fs.readFileSync(nativePackage, "utf8");
    if (!source.includes("UpdateInstallerModule(reactContext)")) {
      const needle = "AppearanceMediaModule(reactContext))";
      if (!source.includes(needle)) throw new Error("Native module registration not found");
      source = source.replace(needle, "AppearanceMediaModule(reactContext), UpdateInstallerModule(reactContext))");
      fs.writeFileSync(nativePackage, source);
    }
    return config;
  }]);
}

module.exports = function withUpdateInstaller(config) {
  return withUpdateInstallerNative(withUpdateInstallerManifest(config));
};
