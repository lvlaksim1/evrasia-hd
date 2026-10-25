# Процедурная память

- Перед изменением приложения проверять head `main`, затронутые исходные файлы, требования и воспроизводимые критерии проверки; source: `ARCHITECTURE.md`, `RELEASE.md`, контракт менеджера; authority: verified-repository.
- Использовать маркер `[release]` только для отдельно разрешённого выпуска и соблюдать трёхуровневую схему; source: `RELEASE.md`, `.github/workflows/android-apk.yml`; authority: verified-repository.
- При изменении долговременного состояния пересчитывать `git-blob-sha1` восьми связанных файлов и публиковать новые значения одним согласованным поколением; source: закреплённый контракт `context-capsule-project-manager`; authority: verified-repository.
