<?php

use App\Http\Controllers\Api\ApiAddressController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiCartController;
use App\Http\Controllers\Api\ApiCategoryController;
use App\Http\Controllers\Api\ApiOrderController;
use App\Http\Controllers\Api\ApiProductController;
use App\Http\Controllers\Api\ApiReviewController;
use App\Http\Controllers\Api\ApiReviewVoteController;
use App\Http\Controllers\Api\ApiUserRoleController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\ApiUserFavoriteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->controller(ApiAuthController::class)->group(function () {
    // Залогиниться
    Route::post('login', 'login');
    // Зарегистрироваться
    Route::post('register', 'register');

    Route::middleware(['auth:api'])->group(function () {
        // Выйти
        Route::post('logout', 'logout');
        // Получить новый токен
        Route::post('refresh', 'refresh');
    });
});

Route::prefix('users')->controller(ApiUserController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все данные залогиненного пользователя (для разработки)
        Route::get('me', 'me');

        // Изменить данные профиля
        Route::put('update', 'update');
    });
});

Route::prefix('address')->controller(ApiAddressController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // TODO
        // Получение своих адрессов

        // Создание адресса в списке адрессов пользоваля
        Route::post('create', 'create');
        // Изменение адресса
        Route::put('update/{address}', 'update');
        // Удаление адресса
        Route::delete('delete/{address}', 'delete');
    });
});

Route::prefix('cart')->controller(ApiCartController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все товары в корзине
        Route::get('/', 'index');
        // Добавить товар в корзину 
        Route::post('store/{product}', 'store');
        // Увеличить кол-во товара на 1
        Route::patch('increase/{product}', 'increase');
        // Уменьшить кол-во товара на 1
        Route::patch('decrease/{product}', 'decrease');
        // Установить кол-во товара = quantity
        Route::patch('update/{product}', 'update');
        // Удалить из корзины
        Route::delete('delete/{product}', 'destroy');
    });
});

Route::prefix('favorites')->controller(ApiUserFavoriteController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все товары в корзине
        Route::get('/', 'index');
        // Добавить товар в корзину 
        Route::post('store/{product}', 'store');
        // Удалить из корзины
        Route::delete('remove/{product}', 'destroy');
    });
});

Route::prefix('category')->controller(ApiCategoryController::class)->group(function () {
    // Получение всех категорий
    Route::get('/', 'index');
    // Получение всех товаров по slug-у категории
    Route::get('/{slug}', 'getProductsBySlug');
    // Получение всех товаров id категории
    Route::get('/id/{id}', 'getProductsByCategoryId');

    Route::middleware(['auth:api', 'role:4'])->group(function () {
        // Создание категории
        Route::post('create', 'store');
        // Изменение категории
        Route::put('update/{category}', 'update');
        // Удаление категории
        Route::delete('delete/{category}', 'destroy');
    });
});

Route::prefix('orders')->controller(ApiOrderController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // получить все свои заказы
        Route::get('/', 'index');
        // получить конкретный заказ
        Route::get('/id/{order}', 'show');
        // Создать заказ
        Route::post('create', 'store');
    });
});

Route::prefix('products')->controller(ApiProductController::class)->group(function () {
    // Получить все продукты
    Route::get('/', 'index');
    // Получить продукт (по id)
    Route::get('/show/{product}', 'show');
    // Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
    Route::get('/similar/{product}', 'similar');

    Route::middleware(['auth:api', 'role:3'])->group(function () {
        // Создать продукт
        Route::post('create', 'store');
        // Изменить продукт по id 
        Route::patch('update/{product}', 'update');
        // Удалить продукт 
        Route::delete('delete/{product}', 'destroy');
    });
});

Route::prefix('reviews')->controller(ApiReviewController::class)->group(function () {
    // Получить вообще все отзывы
    Route::get('/', 'index');
    // Получить все отзывы товара (по id товара)
    Route::get('/product/{product}', 'getProductReviews');
    // Получить среднюю оценку товара (по id товара)
    Route::get('/productavg/{product}', 'getAverageRating');
    // Получить отзывы товаров (по id категории)
    Route::get('/category/{category}', 'getCategoryReviews');

    Route::middleware(['auth:api'])->group(function () {
        // Оставить отзыв
        Route::post('create/{product}', 'store');
        // Отредактировать отзыв
        Route::patch('update/{review}', 'update');
        // Удалить отзыв
        Route::delete('delete/{review}', 'destroy');
    });
});

Route::prefix('reviews/votes')->controller(ApiReviewVoteController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все свои оценки отзывов
        Route::get('/', 'index');
        // Отзыв помог
        Route::post('like/{review}', 'like');
        // Отзыв не помог
        Route::post('dislike/{review}', 'dislike');
        // Удалить оценку отзыва
        Route::delete('remove/{review}', 'destroy');
    });
});


// 1 - USER
// 2 - SELLER
// 3 - MANAGER
// 4 - ADMIN
// 5 - HEAD_ADMIN

Route::prefix('roles')->controller(ApiUserRoleController::class)->group(function () {
    // Маршруты, доступные только для мэнэджера 
    // Просмотр ролей и создание/удаление права на торговлю свои товаром 
    Route::middleware(['auth:api', 'role:3'])->group(function () {
        Route::get('get/{user}', 'index');
        Route::post('make/seller/{user}', 'makeSaller');
        Route::post('remove/seller/{user}', 'removeSeller');
    });

    // Дополнительные команды, доступные только админам
    Route::middleware(['auth:api', 'role:4'])->group(function () {
        Route::post('make/manager/{user}', 'makeManager');
        Route::post('remove/manager/{user}', 'removeManager');

        // Полная очистка всех ролей, делает пользователя обычным USER
        // Работает только на пользователей с ROLE < совершающего очистку
        Route::put('clear/{user}', 'destroy');
    });

    Route::middleware(['auth:api', 'role:5'])->group(function () {
        Route::post('make/admin/{user}', 'makeAdmin');
        Route::post('remove/admin/{user}', 'removeAdmin');
    });
});
