# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v18**
- `versionCode`: **18**
- `versionName`: **v18**
- package: `com.evrasia.hd`
- commit: `db7b1d1e52899f38dbe8e7a4e0b4eb863f3ff776`
- APK: `evrasia-hd-v18.apk`
- SHA-256: `dc8819ce79472112038818206119683b2b8755197bff8f1f20d865cc4b9d52dd`
- Опубликован: `2026-10-26T02:00:08Z`
- Предыдущий релиз: **v17**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v18
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v18/evrasia-hd-v18.apk
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
