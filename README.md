# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v1**
- `versionCode`: **100004**
- `versionName`: **1**
- package: `com.evrasia.hd`
- commit: `2b27b70d7b337254ea7d2e93fe2647a5a2184407`
- APK: `evrasia-hd-v1-arm64.apk`
- SHA-256: `efa17550ad737ac10f9b77042994985e941736f80e4f3c51a7bf443f6ad0fa6b`
- Опубликован: `2026-09-09T17:52:10Z`
- Предыдущий релиз: **—**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v1
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v1/evrasia-hd-v1-arm64.apk
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
