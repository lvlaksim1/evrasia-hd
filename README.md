# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v3**
- `versionCode`: **3**
- `versionName`: **v3**
- package: `com.evrasia.hd`
- commit: `b9cd62d1fe8d2928e8b1111930d29dc0c9a41b07`
- APK: `evrasia-hd-v3.apk`
- SHA-256: `5c44fce5682242e7ca41f01c3627f331be7ff0eaa9d644460f157b1f4c7c75b5`
- Опубликован: `2026-09-10T15:32:37Z`
- Предыдущий релиз: **v2**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v3
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v3/evrasia-hd-v3.apk
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
