# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v16**
- `versionCode`: **16**
- `versionName`: **v16**
- package: `com.evrasia.hd`
- commit: `f622da47e4b875bcd918ac4d02eefdea47150ec8`
- APK: `evrasia-hd-v16.apk`
- SHA-256: `3a5c09570ad400834de94dcf7647d7e971c5c8d26736ab10adfb85a8bc513c38`
- Опубликован: `2026-10-26T00:38:57Z`
- Предыдущий релиз: **v15**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v16
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v16/evrasia-hd-v16.apk
<!-- AUTO-RELEASE-END -->

Чистый репозиторий приложения «Евразия HD».

## Назначение

Приложение «Евразия HD» построено на Expo SDK 54 / React Native 0.81.5 с TypeScript. Фактическая точка входа — `index.js`, который регистрирует `App.tsx`; в `App.tsx` находятся главный экран, карточки аккаунтов, экраны операций и настройки. Работа с API вынесена в `lib/evrasia-api.ts`, а хранение учётных записей, токенов и настроек — в `lib/evrasia-storage.ts`. Проект не использует Expo Router.

## Android

- package: `com.evrasia.hd`;
- Expo SDK 54 / React Native 0.81;
- Android minimum SDK: 24;
- production APK policy: arm64-only;
- release numbering: numeric GitHub tags `vN`;
- начиная со стандартизированного pipeline, `versionCode=N`, `versionName=vN`.

## Релизы

Каждый push в `main` запускает release workflow. Реальный Release создаётся исключительно для triggering commit, содержащего literal `[release]`.

Рабочие ветки вида `*-work` автоматически проходят тот же APK build/verify/signing path в режиме validation, но не публикуют production GitHub Release.

## Стандартная документация

- `ARCHITECTURE.md` — архитектурные границы и критические инварианты.
- `CHANGELOG.md` — накопительная release history.
- `RELEASE.md` — release contract проекта.
- `.release/latest.json` — каноническое machine-readable состояние последнего опубликованного релиза.
