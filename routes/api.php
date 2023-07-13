<?php

use App\Http\Controllers\Api\ApiAddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiCartController;
use App\Http\Controllers\Api\ApiCategoryController;
use App\Http\Controllers\Api\ApiOrderController;
use App\Http\Controllers\Api\ApiProductController;
use App\Http\Controllers\Api\ApiReviewController;
use App\Http\Controllers\Api\ApiRoleController;
use App\Http\Controllers\Api\ApiUserController;

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

Route::controller(ApiAuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::prefix('users')->group(function () {
    Route::controller(ApiUserController::class)->group(function () {
        Route::get('getme', 'getme');
        Route::put('update', 'update');
        // Добавить избранные товары (favorites)
    });
});

Route::prefix('address')->group(function () {
    Route::controller(ApiAddressController::class)->group(function () {
        Route::post('create', 'create');
        Route::post('update/{id}', 'update');
        Route::post('delete/{id}', 'delete');
    });
});
Route::prefix('cart')->group(function () {
    Route::controller(ApiCartController::class)->group(function () {
        Route::get('/', 'index');

        // Добавить товар в корзину 
        Route::post('store', 'store');
        // Увеличить кол-во товара на 1
        Route::patch('increase/{id}', 'increase');
        // Уменьшить кол-во товара на 1
        Route::patch('decrease/{id}', 'decrease');
        // Установить кол-во на quantity
        Route::patch('update', 'update');
        // Удалить из корзины
        Route::delete('delete/{id}', 'destroy');
    });
});
Route::prefix('categories')->group(function () {
    Route::controller(ApiCategoryController::class)->group(function () {
        Route::post('create', 'create');
        // Добавить категорию 
        // Изменить категорию
        // Удалить категорию

        // Получить все товары по id категории
        // Получить все товары по слаг-у 
    });
});
Route::prefix('orders')->group(function () {
    Route::controller(ApiOrderController::class)->group(function () {
        Route::post('create', 'create');
        // Создать заказ
        // получить все свои заказы
        // получить конкретный заказ
    });
});
Route::prefix('products')->group(function () {
    Route::controller(ApiProductController::class)->group(function () {
        Route::post('create', 'create');
        // Создать продукт
        // Изменить продукт по id 
        // Удалить продукт 

        // Получить все продукты
        // Получить продукт (по id)
        // Получить похожие продукты
        // Получить продукт по слаг-у?
    });
});
Route::prefix('reviews')->group(function () {
    Route::controller(ApiReviewController::class)->group(function () {
        Route::post('create', 'create');
        // Оставить отзыв
        // Отредактировать отзыв
        // Удалить отзыв

        // Получить вообще все отзывы
        // Получить все отзывы товара (по id)
        // Получить среднюю оценку товара (по id)
        // Получить отзывы товаров (по категории)
    });
});
Route::prefix('roles')->group(function () {
    Route::controller(ApiRoleController::class)->group(function () {
        Route::post('create', 'create');
        // Выдать кому-то роль (по id)
        // Убрать чью-то роль (т.е. сделать обычным пользователем)
        // Изменить чью-то роль (пр: с 3 на 4 или наоборот)
    });
});
