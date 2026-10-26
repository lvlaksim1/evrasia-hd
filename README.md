# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v17**
- `versionCode`: **17**
- `versionName`: **v17**
- package: `com.evrasia.hd`
- commit: `46a91d10fe6720eb72af960a67bb54e2e0fe5332`
- APK: `evrasia-hd-v17.apk`
- SHA-256: `d2c5d2ad44fa4a858e81b955bde67646cf5a7953fadeeaf62c8da4ed0a531210`
- Опубликован: `2026-10-26T01:14:19Z`
- Предыдущий релиз: **v16**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v17
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v17/evrasia-hd-v17.apk
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
