# Release

Документ фиксирует release contract проекта «Евразия HD».

<!-- AUTO-RELEASE-START -->
## Последний проверенный релиз

- Релиз: **v6**
- Релизный commit: `6c1334991c0ebc383c7f314fe2dd23ea0b93e0fe`
- Артефакт: `evrasia-hd-v6.apk`
- SHA-256: `b42eeae23111bddc5cf2de83cd1a1e8ea8a2d371747f826bf7bee5a0c55de97d`
- Опубликован: `2026-09-10T17:54:44Z`
<!-- AUTO-RELEASE-END -->

## L1 — Universal Release Core

`.github/workflows/_release-core.yml` отвечает за `[release]` gate, numeric `vN` numbering, transactional GitHub Release, draft recovery, rollback, idempotency, exact target commit, SHA-256 и download-back verification.

## L2 — Universal APK Release

`.github/workflows/_release-apk.yml` отвечает за APK package/version/ABI validation, unsigned candidate boundary, production signing, signing certificate verification, post-sign verification, APK retention, Telegram и Step Summary.

## L3 — Evrasia HD

`.github/actions/build-apk/action.yml` выполняет project-specific pipeline: pnpm, TypeScript, Expo prebuild, generated-project checks, отключение generated debug signing и сборку unsigned release APK.

Generated Gradle Wrapper создаётся Expo prebuild и используется командой `./gradlew :app:assembleRelease` внутри каталога `android`; глобальный системный Gradle для production build не используется.

## Trigger и version contract

Production Release создаётся только при `push` в `main`, когда сообщение triggering commit содержит literal `[release]`. Следующая версия равна `max(vN)+1`.

Для новых стандартизированных релизов: GitHub Release = `vN`, `versionCode=N`, `versionName=vN`.

Релиз v1 является legacy-релизом, созданным до внедрения этого contract; его фактические version metadata сохраняются в документации как историческое состояние.

## Signing

Production signing material хранится только в GitHub Secret `ANDROID_KEYSTORE`. Ожидаемый SHA-256 сертификата является project-owned configuration. Candidate проверяется до доступа к secret, после чего L2 проверяет certificate fingerprint, подписывает APK официальным `apksigner` и выполняет post-sign verification.

## Publication, recovery и retention

Release публикуется как draft transaction: local SHA-256 → draft → asset upload → publish → download-back → SHA-256 verification. Конфликтующая история не переписывается. После успешного релиза сохраняются текущий APK и ближайший предыдущий реально существующий APK; release/tag history сохраняется.

## Documentation

После успешного production Release отдельный job обновляет только `README.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, `RELEASE.md` и `.release/latest.json`, затем делает отдельный docs commit без `[release]`.
