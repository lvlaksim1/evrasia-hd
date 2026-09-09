import type { ExpoConfig } from "expo/config";

const buildNumber = Number(process.env.GITHUB_RUN_NUMBER || "1000");
const releaseVersion = process.env.EVRASIA_HD_VERSION || "1";
const config: ExpoConfig = {
  name: "Евразия hd",
  slug: "evrasia-hd",
  version: releaseVersion,
  orientation: "portrait",
  scheme: "evrasiahd",
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  icon: "./assets/icon.png",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.evrasia.hd",
    icon: "./assets/icon.png",
    infoPlist: { ITSAppUsesNonExemptEncryption: false },
  },
  android: {
    edgeToEdgeEnabled: true,
    softwareKeyboardLayoutMode: "resize",
    predictiveBackGestureEnabled: false,
    package: "com.evrasia.hd",
    versionCode: Number(releaseVersion) * 100000 + buildNumber,
    icon: "./assets/icon.png",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#081310",
    },
    permissions: [],
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "@config-plugins/react-native-blob-util",
    "./plugins/with-sms-code",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#081310",
        image: "./assets/icon.png",
        imageWidth: 180,
        resizeMode: "contain",
      },
    ],
    ["expo-build-properties", { android: { buildArchs: ["arm64-v8a"], minSdkVersion: 24 } }],
  ],
  experiments: { typedRoutes: true, reactCompiler: true },
};

export default config;
