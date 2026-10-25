# Текущий план

1. **completed**: исправлена устаревшая документация `README.md` и `ARCHITECTURE.md` без изменения кода приложения.
2. **completed**: штатные `pmctl validate`, `ready`, `recover` выполнены успешно (https://github.com/lvlaksim1/evrasia-hd/actions/runs/40237734117).
3. **completed**: по прямому решению владельца удалены все 14 побочных веток, включая исследования APK и Dependabot; сохранена только `main` (source: https://github.com/lvlaksim1/evrasia-hd/actions/runs/40241463380, GitHub branches API; authority: owner-directive + verified-ci). Запрос PR № 5 закрыт без объединения.
4. **completed**: отключены плановые запросы Dependabot удалением `.github/dependabot.yml` по решению владельца 26.10.2026; source: GitHub commit 4dc44c3 и распоряжение владельца; authority: owner-directive + verified-repository.
5. **active**: поддерживать работоспособность подтверждённой на телефоне версии v14, выполнять новые конкретные задания и выпускать новую версию только по указанию владельца.
6. **active**: вести постоянное состояние менеджера, проверять публикацию и целостность состояния после значимых изменений.
