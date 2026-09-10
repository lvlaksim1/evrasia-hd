# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v11**
- `versionCode`: **11**
- `versionName`: **v11**
- package: `com.evrasia.hd`
- commit: `e6414a671725d7843bc0d8ffc75539df86209414`
- APK: `evrasia-hd-v11.apk`
- SHA-256: `2b36b3681093f59cb368b39af2c6e0140bdb361398802db06e4dacae2ec40d01`
- Опубликован: `2026-09-10T21:57:48Z`
- Предыдущий релиз: **v10**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v11
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v11/evrasia-hd-v11.apk
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
