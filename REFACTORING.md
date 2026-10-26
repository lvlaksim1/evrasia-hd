# Рефакторинг evrasia-hd

<!-- AUTO-RELEASE-START -->
## Контрольная точка рефакторинга

- Актуально для релиза: **v15**
- Релизный commit: `4c11bc035e86e9274f13057824a4dd5786c09926`
- Опубликован: `2026-10-26T00:09:49Z`

### Изменения между релизами

- ci: add APK size audit and Telegram report
- ci: synchronize release documentation standard
- ci: harden release numbering and work-branch validation
- ci: add automatic work branch cleanup
- ci: send release changes in Telegram
- ci: fix Telegram changelog workflow syntax
- ci: требовать русское описание релиза для Telegram
- Add repository storage guard
- Add repository storage hygiene
- Ignore heavyweight build outputs
- Make storage cleanup race-safe
- Install independent Project Manager capsule for Evrasia HD
- Align Evrasia HD docs with App.tsx and add Project Manager lifecycle checks
- Record verified capsule recovery and completed maintenance checks
- Run one-time cleanup of 12 owner-approved obsolete branches
- Remove one-off branch cleanup workflow and seal final manager state
- Disable scheduled Dependabot GitHub Actions update pull requests
- Record owner decision to disable scheduled Dependabot updates
- Implement GitHub release updater with verified Android APK installation
- Allow reusable APK validation workflow its required permissions
- Fix Android SDK setup after removal of deprecated tools package
- Re-run Android updater validation when APK tooling changes
- Fix Expo config plugin XML literal to unblock Android prebuild
- Register update installer directly in Android native package
- Document Android updater and remove one-time APK validation workflow
- v15: обновление приложения из GitHub Releases [release]

### Изменённые файлы

- `.context/ENTRYPOINT.md`
- `.context/capsule.json`
- `.context/current/blockers.md`
- `.context/current/next.md`
- `.context/current/state.md`
- `.context/decisions/README.md`
- `.context/dialogues/README.md`
- `.context/handoffs/latest.md`
- `.context/history/README.md`
- `.context/manager/CONTRACT.md`
- `.context/manager/PROTOCOL.md`
- `.context/manager/beliefs.md`
- `.context/manager/goals.md`
- `.context/manager/identity.json`
- `.context/manager/intentions.md`
- `.context/manager/mandate.md`
- `.context/manager/plans.md`
- `.context/manager/state-integrity.json`
- `.context/manifest.json`
- `.context/memory/episodes/README.md`
- `.context/memory/index.md`
- `.context/memory/procedural.md`
- `.context/memory/semantic.md`
- `.context/project/architecture.md`
- `.context/project/constraints.md`
- `.context/project/goals.md`
- `.context/project/identity.md`
- `.context/protocol.md`
- `.context/rules/project-rules.md`
- `.github/dependabot.yml`
- `.github/scripts/update-release-docs.py`
- `.github/workflows/_release-apk.yml`
- `.github/workflows/_release-core.yml`
- `.github/workflows/android-apk.yml`
- `.github/workflows/cleanup-work-branches.yml`
- `.github/workflows/repository-storage.yml`
- `.github/workflows/validate-project-manager.yml`
- `.github/workflows/validate-work-branches.yml`
- `.gitignore`
- `AGENTS.md`
- `AI_CONTEXT.md`
- `App.tsx`
- `app.config.ts`
- `docs/updates.md`
- `lib/evrasia-update.ts`
- `plugins/with-sms-code.js`
- `plugins/with-update-installer.js`
- `scripts/check_repository_storage.py`
<!-- AUTO-RELEASE-END -->

Автоматическая контрольная точка текущего состояния рефакторинга. Детальные архитектурные инварианты описаны в `ARCHITECTURE.md`.
