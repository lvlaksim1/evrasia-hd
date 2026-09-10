# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v7**
- `versionCode`: **7**
- `versionName`: **v7**
- package: `com.evrasia.hd`
- commit: `039a889ccb17b240a6c51e4c01db2d442db1eb8f`
- APK: `evrasia-hd-v7.apk`
- SHA-256: `5c9e03812a6764db8447c38a4c641dcf9820d02638fe46f25bd22d0c159be1f2`
- Опубликован: `2026-09-10T18:18:50Z`
- Предыдущий релиз: **v6**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v7
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v7/evrasia-hd-v7.apk
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
