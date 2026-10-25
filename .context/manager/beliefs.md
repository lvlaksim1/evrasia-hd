# Проверенные представления менеджера

- Основной проект расположен в `lvlaksim1/evrasia-hd`, ветка `main`; начальная точка — `d677181d4c8188556ff5a5c40efb39758644d3b0`; source: GitHub metadata и Git tree; authority: verified-repository.
- Приложение Android имеет package `com.evrasia.hd`, использует Expo SDK 54, React Native 0.81 и TypeScript; source: `README.md`, `package.json`, `app.config.ts`; authority: verified-repository.
- Фактическая точка входа приложения — `index.js` → `App.tsx`; source: `index.js`, `App.tsx`, Git tree; authority: verified-repository.
- Сетевой интерфейс сервиса реализован в `lib/evrasia-api.ts`, хранение аккаунтов и секретов — в `lib/evrasia-storage.ts`; source: соответствующие файлы; authority: verified-repository.
- Последний опубликованный выпуск при создании капсулы — `v14`, файл `evrasia-hd-v14.apk`, релизный commit `92f6ba606bf1069c5128d91739df4b075fd413cf`; source: GitHub Releases, `README.md`, `CHANGELOG.md`; authority: verified-repository.
- Выпуск реализован в три уровня L3→L2→L1, подписывание выполняет L2; публикация зависит от маркера `[release]`; source: `ARCHITECTURE.md`, `RELEASE.md`, файлы сборки в `.github/`; authority: verified-repository.
- В `README.md` и `ARCHITECTURE.md` остались ссылки на отсутствующий `app/(tabs)/index.tsx` после перехода на `App.tsx`; source: Git tree, `index.js`, `README.md`, `ARCHITECTURE.md`; authority: verified-repository.
- Приложение реализует учётные записи, карты, бонусные сведения, историю, рестораны и настройки отображения; source: `App.tsx`, `lib/evrasia-api.ts`, `lib/evrasia-storage.ts`; authority: verified-repository.
