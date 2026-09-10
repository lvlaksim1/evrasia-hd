# Евразия HD

<!-- AUTO-RELEASE-START -->
## Текущий релиз

- Версия: **v9**
- `versionCode`: **9**
- `versionName`: **v9**
- package: `com.evrasia.hd`
- commit: `aa013648d8a1115fe4917a2a0e41b559654e4acf`
- APK: `evrasia-hd-v9.apk`
- SHA-256: `1c7d5b701cdf3c8ec230f910dc6d48f56f3bb1f13397f6b6dafead06d0e159df`
- Опубликован: `2026-09-10T20:12:12Z`
- Предыдущий релиз: **v8**
- Release: https://github.com/lvlaksim1/evrasia-hd/releases/tag/v9
- APK: https://github.com/lvlaksim1/evrasia-hd/releases/download/v9/evrasia-hd-v9.apk
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
