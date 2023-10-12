# Parser (light) - v 0.0.1

![Parser-light](/public/images/parsing.png)

Parser light - это простое веб-приложение для автоматизации сбора данных в интернете. Планируютс к реализации следующие функции - 

+ downdetector - сервис определения работоспособности сайта / ресурса
+ seo-parser - сервис сбора страниц и семантики того или иного сайта
+ ecom-parser - сбор списка товааров и мониторинг цен интернет-магазинов

## Установка и запуск приложения:

1. Клонируем исходный код приложения:

git clone https://github.com/SergeiAmpilov/parser-light.git

2. Перейдите в директорию с установленным приложением:

cd ./parser-light

3. Установите npm-пакеты и зависимости:

npm i

4. Запустите миграции базы данных

npx prisma migrate dev --name init


5. Соберите приложение:

front-end:

npm run build:front

backend:

npm run build

6. Запускайте:

npm run start

7. Поздравляю! Вы великолепны и можете парсить!

Profit!


## Стек технологий:
+ TypeScript
+ Node.js
+ Express.js
+ Prisma - ORM
+ axios - для запросов
+ puppeteer - для парсинга
