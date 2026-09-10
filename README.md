# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v2**
- `versionCode`: **2**
- `versionName`: **v2**
- package: `com.evrasia.hd`
- commit: `1f176ad5f5ef40a1a79e584a7fed36a82f7d8adb`
- APK: `evrasia-hd-v2.apk`
- SHA-256: `647ecff88e0d96874bda543afd2244edc667f85bd2a456cd2c834b22ecd95576`
- Опубликован: `2026-09-10T12:41:57Z`
- Предыдущий релиз: **v1**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v2
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v2/evrasia-hd-v2.apk
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
