# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v8**
- `versionCode`: **8**
- `versionName`: **v8**
- package: `com.evrasia.hd`
- commit: `2d2c91685461996ef0a5e65ed42ef1409f1b4a34`
- APK: `evrasia-hd-v8.apk`
- SHA-256: `c5f20c535c8e3a5eba0a63c4fb31cfab1e0171de083d80f9fd13e82fb9f48aa0`
- Опубликован: `2026-09-10T19:30:46Z`
- Предыдущий релиз: **v7**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v8
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v8/evrasia-hd-v8.apk
<!-- AUTO-RELEASE-END -->

Чистый репозиторий приложения «Евразия HD».

## Назначение

Приложение «Евразия HD» построено на Expo / React Native. Основной пользовательский экран находится в `app/(tabs)/index.tsx`; работа с API и локальным состоянием вынесена в `lib/`.

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
