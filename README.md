# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v6**
- `versionCode`: **6**
- `versionName`: **v6**
- package: `com.evrasia.hd`
- commit: `6c1334991c0ebc383c7f314fe2dd23ea0b93e0fe`
- APK: `evrasia-hd-v6.apk`
- SHA-256: `b42eeae23111bddc5cf2de83cd1a1e8ea8a2d371747f826bf7bee5a0c55de97d`
- Опубликован: `2026-09-10T17:54:44Z`
- Предыдущий релиз: **v5**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v6
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v6/evrasia-hd-v6.apk
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
