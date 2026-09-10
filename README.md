# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v10**
- `versionCode`: **10**
- `versionName`: **v10**
- package: `com.evrasia.hd`
- commit: `d97cb08c079d8277c57a35ec0846967544a3384b`
- APK: `evrasia-hd-v10.apk`
- SHA-256: `31fcdd2848b080b88ddc6dc958a800d01e5630a9f03b6ded0e032863a669ae8a`
- Опубликован: `2026-09-10T21:06:19Z`
- Предыдущий релиз: **v9**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v10
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v10/evrasia-hd-v10.apk
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
