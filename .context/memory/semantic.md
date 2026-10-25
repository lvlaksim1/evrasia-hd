# Семантическая память

- Продукт — Android-приложение Expo/React Native `com.evrasia.hd`; source: `app.config.ts`, `package.json`, `README.md`; authority: verified-repository.
- После отказа от Expo Router фактическая точка входа — `index.js` → `App.tsx`, а часть старой документации не обновлена; source: `CHANGELOG.md`, `index.js`, `App.tsx`, `ARCHITECTURE.md`; authority: verified-repository.
- Последний опубликованный выпуск при установке менеджера — v14; исправление мерцания интерфейса при перемещении карточек; source: GitHub Release v14 и `CHANGELOG.md`; authority: verified-repository.
- Производственный процесс: L3 — сборка неподписанного APK, L2 — проверка/подпись, L1 — публикация и контроль; source: `RELEASE.md`, `ARCHITECTURE.md`; authority: verified-repository.
- Владелец подтвердил корректную работу v14 на телефоне, без перечисления отдельных проверенных сценариев; source: сообщение владельца от 26.10.2026; authority: owner-directive.
- Актуальный исходный проект использует `index.js`/`App.tsx` и собственный `PanResponder`, а устаревшие Expo Router layout и патч автопрокрутки отсутствуют; `README.md` и `ARCHITECTURE.md` актуализированы; source: Git tree, `App.tsx`, `.github/actions/build-apk/action.yml`, документация после правки; authority: verified-repository.
