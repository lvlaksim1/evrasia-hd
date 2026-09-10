# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v12**
- `versionCode`: **12**
- `versionName`: **v12**
- package: `com.evrasia.hd`
- commit: `3c8991be7d9ad02126c76a7b66363b0eea88f64e`
- APK: `evrasia-hd-v12.apk`
- SHA-256: `fd91f57b163d0b85f266972d3805236a1251e4d78e503a961b4f1510cccaed88`
- Опубликован: `2026-09-10T22:23:02Z`
- Предыдущий релиз: **v11**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v12
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v12/evrasia-hd-v12.apk
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
