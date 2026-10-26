# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v15**
- `versionCode`: **15**
- `versionName`: **v15**
- package: `com.evrasia.hd`
- commit: `4c11bc035e86e9274f13057824a4dd5786c09926`
- APK: `evrasia-hd-v15.apk`
- SHA-256: `7d9694ab392e414fbfde997e075f48824136317305b66476f303c54d30bb88ae`
- Опубликован: `2026-10-26T00:09:49Z`
- Предыдущий релиз: **v14**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v15
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v15/evrasia-hd-v15.apk
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
