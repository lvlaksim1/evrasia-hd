# Процедурная память

- Перед изменением приложения проверять head `main`, затронутые исходные файлы, требования и воспроизводимые критерии проверки; source: `ARCHITECTURE.md`, `RELEASE.md`, контракт менеджера; authority: verified-repository.
- Использовать маркер `[release]` только для отдельно разрешённого выпуска и соблюдать трёхуровневую схему; source: `RELEASE.md`, `.github/workflows/android-apk.yml`; authority: verified-repository.
- При изменении долговременного состояния пересчитывать `git-blob-sha1` восьми связанных файлов и публиковать новые значения одним согласованным поколением; source: закреплённый контракт `context-capsule-project-manager`; authority: verified-repository.
- Штатно проверять `pmctl validate`, `ready`, `recover` в GitHub Actions `.github/workflows/validate-project-manager.yml`; сценарий получает Project Manager из точного commit, указанного в `.context/capsule.json`, и проверяет authoritative `main`; source: https://github.com/lvlaksim1/evrasia-hd/actions/runs/40237537909 и исходный сценарий; authority: verified-ci.
- В сценариях второго фактора сохранять единую cookie-сессию Bitrix и CSRF, не журналировать одноразовые коды, не признавать вход успешным до проверки `/account/`, не смешивать TOTP с основным токеновым API; source: `docs/browser-otp-login.md`, архив браузерного исследования владельца от 26.10.2026; authority: verified-protocol.
