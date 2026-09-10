# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v13**
- `versionCode`: **13**
- `versionName`: **v13**
- package: `com.evrasia.hd`
- commit: `1d6bc8a0a7172987823c3c62127d5e6977908142`
- APK: `evrasia-hd-v13.apk`
- SHA-256: `52d816f3c7117447a622e70f224c0b84d83e8686cde6d6908c57a042e962f848`
- Опубликован: `2026-09-10T23:04:59Z`
- Предыдущий релиз: **v12**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v13
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v13/evrasia-hd-v13.apk
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
