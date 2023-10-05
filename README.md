<p align="center"><a href="https://github.com/bdumitrua/fitbar" target="_blank"><img src="https://github.com/bdumitrua/fitbar/blob/main/public/logo.svg" width="200" alt="Fitbar Logo"></a></p>

# Fitbar

Fitbar - это веб-приложение, в настоящее время предоставляющее REST API интернет-магазина. Будущие версии будут включать пользовательский интерфейс, созданный с использованием React.

## Стек технологии:

-   Back-End: Laravel
-   Database: MySQL
-   Tests: PHPUnit
-   Front-End (coming soon): React

## Требования

Чтобы запустить проект, вам понадобятся следующие компоненты:

-   PHP 8.1 или выше
-   Composer
-   NPM
-   MySQL

## Начало работы

Первоначальная настройка и запуск проекта осуществляется с помощью следующих команд:

Установите пакеты:

```bash
npm install
```

```bash
composer install
```

Настройте окружение:

```bash
php artisan env:create    # создать .env файл копию из .env.example
```

```bash
php artisan db:create     # создать mysql базу данных с названием из .env
```

```bash
php artisan migrate:fresh   # создать таблицы в базе данных
```

```bash
php artisan db:seed   # заполнить таблицы данными
```

```bash
php artisan jwt:secret    # создать jwt secret ключ в .env для работы JWT авторизации
```

Запустите приложение:

```bash
php artisan serve    # запустить приложение на http://127.0.0.1:8000
```

Установите зависимости:

```bash
npm i
```

Запустите сборку:

```bash
npm run dev
```

Для создания админа введите

```bash
php artisan create:admin
```

## Тестирование

Настройте окружение:

```bash
php artisan db:create-test     # создать отдельную mysql базу данных для тестирования
```

Запустите тесты:

```bash
php artisan test
```

## Импорт в Postman или Insomnia

Проект предоставляет готовые файлы для удобного импорта и проверки запросов в Postman или Insomnia. <br>
Вы можете скачать эти файлы [здесь (Postman)](https://github.com/bdumitrua/fitbar/blob/main/Fitbar.postman_collection.json) и [здесь (Insomnia)](https://github.com/bdumitrua/fitbar/blob/main/fitbarInsomnia).
<br>
<br>
<br>
