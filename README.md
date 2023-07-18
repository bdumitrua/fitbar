<p align="center"><a href="https://github.com/bdumitrua/fitbar" target="_blank"><img src="https://github.com/bdumitrua/fitbar/blob/main/public/logo.svg" width="200" alt="Fitbar Logo"></a></p>

# Fitbar

Fitbar - это веб-приложение, в настоящее время предоставляющее REST API интернет-магазина. Будущие версии будут включать пользовательский интерфейс, созданный с использованием React.

## Стек технологии:
Back-End: Laravel <br>
Database: MySQL <br>
Tests: PHPUnit <br>
Front-End (coming soon): React <br>

## Требования

Чтобы запустить проект, вам понадобятся следующие компоненты:

- PHP 8.1 или выше
- Composer
- NPM
- MySQL

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
php artisan migrate:fresh —seed   # создать таблицы в базе данных и заполнить их данными
```
```bash
php artisan jwt:secret    # создать jwt secret ключ в .env для работы JWT авторизации
```


Запустите приложение:
```bash
php artisan serve    # запустить приложение на http://127.0.0.1:8000
```

## Импорт в Postman или Insomnia

Проект предоставляет готовые файлы для удобного импорта и проверки запросов в Postman или Insomnia. Вы можете скачать эти файлы [здесь (Postman)](https://github.com/bdumitrua/fitbar/raw/main/fitbarInsomnia) и [здесь (Insomnia)](https://github.com/bdumitrua/fitbar/raw/main/Fitbar.postman_collection.json).
