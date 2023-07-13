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
        Route::post('create', 'store');
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
Route::prefix('category')->group(function () {
    Route::controller(ApiCategoryController::class)->group(function () {
        Route::get('/', 'getAll');
        Route::get('/byid/{id}', 'getProductsByCategoryId');
        Route::get('{slug}', 'getProductsBySlug');

        Route::post('create', 'store');
        Route::put('update/{id}', 'update');
        Route::delete('delete/{id}', 'destroy');
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
        // Оставить отзыв
        Route::post('create', 'store');
        // Отредактировать отзыв
        Route::patch('update/{id}', 'update');
        // Удалить отзыв
        Route::delete('delete/{id}', 'destroy');
        // TODO
        // Добавить полезен/нет

        // Получить вообще все отзывы
        Route::get('/', 'index');
        // Получить все отзывы товара (по id)
        Route::get('/product/{id}', 'getProductReviews');
        // Получить среднюю оценку товара (по id)
        Route::get('/productavg/{id}', 'getAverageRating');
        // Получить отзывы товаров (по категории)
        Route::get('/category/{id}', 'getCategoryReviews');
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
