# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v5**
- `versionCode`: **5**
- `versionName`: **v5**
- package: `com.evrasia.hd`
- commit: `2a61e76c3e14b85ef42b9047e28ea0fddb2d22dd`
- APK: `evrasia-hd-v5.apk`
- SHA-256: `e9d80bcfa3cb328187e22eb6ddf706d16c92ec28749bde2e2394b11a936d853f`
- Опубликован: `2026-09-10T17:43:45Z`
- Предыдущий релиз: **v4**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v5
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v5/evrasia-hd-v5.apk
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
