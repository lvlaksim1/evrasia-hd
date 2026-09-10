# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v4**
- `versionCode`: **4**
- `versionName`: **v4**
- package: `com.evrasia.hd`
- commit: `7ff14b21b53f80bba8608d962ccc6c16ffba039f`
- APK: `evrasia-hd-v4.apk`
- SHA-256: `415213992b643e8f0687f8970d11084e6801e0f4b6ca5786d1552f01d1ecd446`
- Опубликован: `2026-09-10T15:47:44Z`
- Предыдущий релиз: **v3**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v4
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v4/evrasia-hd-v4.apk
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
