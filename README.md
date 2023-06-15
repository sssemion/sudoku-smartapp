# sudoku-smartapp
client-server-apps coursework

## [Хостинг фронтенда](https://bba538c5pgem9l3nlphg.containers.yandexcloud.net/)

## Инструкция для локального запуска и тестирования:
### Бэкенд (Микросервис генерации поля):
  __Можно не запускать__


### Фронтенд
1. Создайте смартапп canvas app и сode.
1. Убедитесь, что установлен nodejs или установите
2. Перейдите в директорию `sudoku-app` (все дальнейшие шаги выполнять там же)
3. Установите зависимости:
  ```
  npm i
  ```
4. Установите пременные окружения или запишите их в файл `.env`
```
VITE_TOKEN='токен из studio https://developers.sber.ru/studio/settings/emulator'
VITE_SMARTAPP='имя смартаппа'
```
5. Откройте редактор code в studio и сделайте импорт сценариев (архив `scenarios.zip`). Опубликуйте сценарий и 
6. Запустите приложение
```
npm run dev
```
