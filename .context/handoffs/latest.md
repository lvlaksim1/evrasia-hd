# Передача состояния следующему сеансу

Постоянный менеджер `evrasia-hd-main-project-manager` для `lvlaksim1/evrasia-hd@main`. На 26.10.2026 опубликован **v17** (https://github.com/lvlaksim1/evrasia-hd/releases/tag/v17); файл `evrasia-hd-v17.apk`, SHA-256 `d2c5d2ad44fa4a858e81b955bde67646cf5a7953fadeeaf62c8da4ed0a531210`, размер 8440197 байт, `[release]` коммит `46a91d10fe6720eb72af960a67bb54e2e0fe5332`. Полный выпуск https://github.com/lvlaksim1/evrasia-hd/actions/runs/40252753402 успешно завершён; проверочная сборка https://github.com/lvlaksim1/evrasia-hd/actions/runs/40252287395 успешна.

Решением владельца v17 переносит TOTP на добавление/повторный вход аккаунта и запрещает истории самостоятельную браузерную авторизацию. Нативный `BrowserSessionModule` выполняет запросы с изолированными по аккаунтам cookies; cookies хранятся в SecureStore (v2). Старый маркер `browser-cookie-session` v16 считается устаревшим. При отсутствии/истечении сессии нужно вручную повторно войти в аккаунт.

В настройках общий переключатель получения PIN списания: `mobile` (по умолчанию, старый SMS) и `browser` (POST `evrasia.rest/local/php_interface/pincode.php`, `sessid`, прямой четырёхзначный `pincode`; отображение и копирование). Подробности `docs/browser-otp-login.md`, код `App.tsx`, `lib/evrasia-api.ts`, `plugins/with-sms-code.js`. Пользовательские сетевые архивы не публиковались.

**Приёмка v17 на устройстве не подтверждена.** Следующий контакт — запросить результаты обновления, сохранения сессий, TOTP при входе и обоих способов получения PIN. При новой проблеме работать с конкретной ошибкой. Новых выпусков без задачи не создавать.
