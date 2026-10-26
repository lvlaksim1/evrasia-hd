# Рефакторинг evrasia-hd

<!-- AUTO-RELEASE-START -->
## Контрольная точка рефакторинга

- Актуально для релиза: **v18**
- Релизный commit: `db7b1d1e52899f38dbe8e7a4e0b4eb863f3ff776`
- Опубликован: `2026-10-26T02:00:08Z`

### Изменения между релизами

- Persist verified v17 browser login and PIN features with pending device acceptance
- Add on-demand Bitrix PHP session recovery with per-account cookies
- Avoid leaking Bitrix session material through recovery error messages
- Remove temporary Bitrix renewal APK validation workflow after successful build
- v18: восстановление браузерной PHP-сессии Bitrix без повторного 2FA [release]

### Изменённые файлы

- `.context/current/blockers.md`
- `.context/current/next.md`
- `.context/current/state.md`
- `.context/handoffs/latest.md`
- `.context/manager/beliefs.md`
- `.context/manager/plans.md`
- `.context/manager/state-integrity.json`
- `.context/memory/procedural.md`
- `.context/memory/semantic.md`
- `docs/browser-otp-login.md`
- `lib/evrasia-api.ts`
- `plugins/with-sms-code.js`
<!-- AUTO-RELEASE-END -->

Автоматическая контрольная точка текущего состояния рефакторинга. Детальные архитектурные инварианты описаны в `ARCHITECTURE.md`.
