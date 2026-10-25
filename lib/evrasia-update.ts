import { NativeModules } from "react-native";

export type AvailableUpdate = {
  tag: string;
  versionCode: number;
  url: string;
  sha256: string;
  size: number;
};

type NativeUpdater = {
  currentVersionCode: number;
  downloadAndInstall(url: string, sha256: string, size: number, versionCode: number): Promise<boolean>;
};

const Updater = NativeModules.UpdateInstaller as NativeUpdater | undefined;
const GITHUB_RELEASE = "https://api.github.com/repos/lvlaksim1/evrasia-hd/releases/latest";

export async function checkGitHubUpdate(): Promise<AvailableUpdate | null> {
  if (!Updater || !Number.isSafeInteger(Number(Updater.currentVersionCode))) {
    throw new Error("Модуль обновлений отсутствует в установленной версии приложения.");
  }

  const abort = new AbortController();
  const timeout = setTimeout(() => abort.abort(), 15000);
  let response: Response;
  try {
    response = await fetch(GITHUB_RELEASE, {
      signal: abort.signal,
      headers: { Accept: "application/vnd.github+json" },
    });
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) throw new Error("GitHub не ответил на проверку обновлений (HTTP " + response.status + ")");
  const release: unknown = await response.json();
  if (!release || typeof release !== "object") throw new Error("GitHub вернул некорректные сведения о выпуске");
  const data = release as Record<string, unknown>;
  if (data.draft === true || data.prerelease === true) return null;
  const match = typeof data.tag_name === "string" ? /^v([1-9]\d*)$/.exec(data.tag_name) : null;
  if (!match) throw new Error("Некорректный номер последнего выпуска GitHub");
  const versionCode = Number(match[1]);
  if (!Number.isSafeInteger(versionCode)) throw new Error("Номер версии GitHub вне допустимого диапазона");
  if (versionCode <= Number(Updater.currentVersionCode)) return null;

  const tag = "v" + versionCode;
  const file = "evrasia-hd-" + tag + ".apk";
  const expectedUrl = "https://github.com/lvlaksim1/evrasia-hd/releases/download/" + tag + "/" + file;
  const asset = Array.isArray(data.assets)
    ? data.assets.find((item: unknown) => item && typeof item === "object" && (item as Record<string, unknown>).name === file)
    : null;
  if (!asset || typeof asset !== "object") throw new Error("В последнем выпуске GitHub не найден установочный APK");
  const details = asset as Record<string, unknown>;
  const digest = typeof details.digest === "string" ? /^sha256:([a-f0-9]{64})$/i.exec(details.digest) : null;
  if (!digest) throw new Error("GitHub не предоставил контрольную сумму APK. Обновление остановлено");
  if (details.browser_download_url !== expectedUrl) throw new Error("Адрес APK не соответствует ожидаемому выпуску");
  if (typeof details.size !== "number" || !Number.isSafeInteger(details.size) || details.size < 1024 || details.size > 200 * 1024 * 1024) {
    throw new Error("Некорректный размер установочного файла");
  }
  return { tag, versionCode, url: expectedUrl, sha256: digest[1], size: details.size };
}

export async function installGitHubUpdate(release: AvailableUpdate): Promise<boolean> {
  if (!Updater) throw new Error("Модуль установки APK недоступен");
  return Updater.downloadAndInstall(release.url, release.sha256, release.size, release.versionCode);
}
