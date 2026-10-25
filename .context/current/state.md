# Текущее состояние

Канонический проект: `lvlaksim1/evrasia-hd@main`. Основной выпуск — **v14**, `evrasia-hd-v14.apk`, пакет `com.evrasia.hd`. Владелец 26.10.2026 сообщил, что установленная v14 корректно работает на телефоне (source: owner-report; authority: owner-directive).

Документация `README.md` и `ARCHITECTURE.md` приведена к `index.js` → `App.tsx` и текущему процессу сборки. Код приложения и APK не изменены.

Создана отдельная GitHub Actions проверка восстановления менеджера. Её первый запуск для коммита `a6e0cac904d9fe7ad44a0f498cdeb5aefed92f01` завершился успешно: `pmctl validate`, `pmctl ready`, `pmctl recover` выполнены в authoritative checkout с закреплённым исходным компонентом; source: https://github.com/lvlaksim1/evrasia-hd/actions/runs/40237537909; authority: verified-ci. Менеджер продолжает работу исключительно с основным репозиторием.
