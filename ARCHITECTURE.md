# Architecture

Документ описывает текущую структуру приложения «Евразия HD» и проектные границы, которые должны сохраняться при release-сборке.

<!-- AUTO-RELEASE-START -->
## Контрольная точка документа

- Актуально для релиза: **v15**
- Релизный commit: `4c11bc035e86e9274f13057824a4dd5786c09926`
- Опубликован: `2026-10-26T00:09:49Z`
<!-- AUTO-RELEASE-END -->

## Проектные компоненты

- `index.js` — точка входа Expo: регистрирует главный компонент приложения.
- `App.tsx` — пользовательский интерфейс, многоаккаунтная работа, профили, бонусные карты, история, рестораны и сортировка карточек через React Native PanResponder.
- `lib/evrasia-api.ts` — запросы к серверу Евразии, вход и обновление токенов, профиль и бонусные операции.
- `lib/evrasia-storage.ts` — состояние через AsyncStorage и секреты через Expo SecureStore.
- `data/evrasia-seed.ts` — исходный список ресторанов.
- `app.config.ts` — Expo-конфигурация Android, параметры архитектуры и APK.
- `plugins/with-sms-code.js` — собственная интеграция Android для SMS и настройки медиа.
- `.github/actions/build-apk/action.yml` — проектная подготовка, контроль исходников, Expo prebuild и выпуск неподписанного APK.

Начиная с релиза v7 приложение использует `index.js` → `App.tsx` вместо Expo Router. Исторические пути `app/(tabs)/` и патч зависимости `scripts/patch-draggable-autoscroll.mjs` отсутствуют в текущем дереве и не являются требованиями актуальной сборки.

## Release boundary

```text
L3 Evrasia HD build adapter
        ↓
L2 Universal APK Release
        ↓
L1 Universal Release Core
```

L3 выполняет pnpm/TypeScript/Expo preprocessing, проверяет generated Android project и возвращает unsigned APK candidate. L2 независимо проверяет APK, подписывает production key и передаёт проверенный artifact в L1. L1 отвечает за release gate, numbering, transactional publication, recovery, rollback и remote SHA verification.

## Критические инварианты

- исходный `App.tsx` не должен изменяться во время Expo prebuild; контроль SHA-256 выполняется до и после генерации Android-проекта;
- generated Android project обязан иметь `newArchEnabled=true`, `reactNativeArchitectures=arm64-v8a` и `adjustResize`;
- перед сборкой восстанавливается `assets/icon.png` из `assets/icon.png.b64`, проверяется наличие медиа и контрольные суммы текущего логотипа и видео;
- после Expo prebuild повторно выполняется проверка TypeScript;
- из generated Android release-конфигурации удаляется отладочная подпись до создания неподписанного APK;
- L3 возвращает только unsigned APK;
- production signing выполняется только L2;
- project-specific проверки не переносятся в universal L1/L2.
