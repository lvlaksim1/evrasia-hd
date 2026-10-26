# Рефакторинг evrasia-hd

<!-- AUTO-RELEASE-START -->
## Контрольная точка рефакторинга

- Актуально для релиза: **v17**
- Релизный commit: `46a91d10fe6720eb72af960a67bb54e2e0fe5332`
- Опубликован: `2026-10-26T01:14:19Z`

### Изменения между релизами

- Record v16 browser OTP release and pending device acceptance
- Move browser TOTP to account login; persist isolated sessions; selectable browser PIN
- Remove temporary v17 Android validation workflow after successful build
- v17: браузерная сессия при входе и выбор способа получения PIN [release]

### Изменённые файлы

- `App.tsx`
- `docs/browser-otp-login.md`
- `lib/evrasia-api.ts`
- `plugins/with-sms-code.js`
<!-- AUTO-RELEASE-END -->

Автоматическая контрольная точка текущего состояния рефакторинга. Детальные архитектурные инварианты описаны в `ARCHITECTURE.md`.
