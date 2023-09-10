<?php

use App\Http\Controllers\Api\ApiAddressController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiCartController;
use App\Http\Controllers\Api\ApiCategoryController;
use App\Http\Controllers\Api\ApiHomeController;
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
    // Зарегистрироваться
    Route::post('register', 'register')->name('auth.register');
    // Залогиниться
    Route::post('login', 'login')->name('auth.login');
    // Получить новый токен (по уже истёкшему)
    Route::post('refresh', 'refresh')->name('auth.refresh');

    Route::middleware(['auth:api'])->group(function () {
        // Выйти
        Route::post('logout', 'logout')->name('auth.logout');
    });
});

Route::prefix('users')->controller(ApiUserController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все данные залогиненного пользователя (для разработки)
        Route::get('me', 'me')->name('users.me');
        // Изменить данные профиля
        Route::put('update', 'update')->name('users.update');
    });
});

Route::prefix('address')->controller(ApiAddressController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получение своих адресов
        Route::get('/', 'index')->name('address.index');
        // Создание нового адреса пользователя
        Route::post('create', 'create')->name('address.create');
        // Изменение своего адреса
        Route::put('update/{address}', 'update')->name('address.update');
        // Удаление своего адреса
        Route::delete('delete/{address}', 'delete')->name('address.delete');
    });
});

Route::prefix('cart')->controller(ApiCartController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все товары в корзине
        Route::get('/', 'index')->name('cart.index');
        // Добавить товар в корзину 
        Route::post('store/{product}', 'store')->name('cart.store');
        // Увеличить кол-во товара на 1
        Route::patch('increase/{product}', 'increase')->name('cart.increase');
        // Уменьшить кол-во товара на 1
        Route::patch('decrease/{product}', 'decrease')->name('cart.decrease');
        // Установить кол-во товара = quantity
        Route::patch('update/{product}', 'update')->name('cart.update');
        // Удалить из корзины
        Route::delete('delete/{product}', 'destroy')->name('cart.destroy');
    });
});


Route::prefix('home')->controller(ApiHomeController::class)->group(function () {
    // Получить продукты с наибольшим кол-вом продаж
    Route::get('/bestsallers', 'bestsallers')->name('home.bestsallers');
    // Получить категории с наибольшим кол-вом продаж и их топ-4 товара
    Route::get('/categories', 'categories')->name('home.categories');
});

Route::prefix('favorites')->controller(ApiUserFavoriteController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все избранные товары
        Route::get('/', 'index')->name('favorites.index');
        // Добавить товар в избранные 
        Route::post('store/{product}', 'store')->name('favorites.store');
        // Удалить из избранных
        Route::delete('remove/{product}', 'destroy')->name('favorites.remove');
    });
});

Route::prefix('category')->controller(ApiCategoryController::class)->group(function () {
    // Получение всех категорий
    Route::get('/', 'index')->name('category.index');
    // Получение всех товаров по slug-у категории
    Route::get('/{slug}', 'getProductsBySlug')->name('category.slug');
    // Получение всех товаров id категории
    Route::get('/id/{id}', 'getProductsByCategoryId')->name('category.id');

    $ADMIN = 4;
    Route::middleware(['auth:api', 'role:' . $ADMIN])->group(function () {
        // Создание категории
        Route::post('create', 'store')->name('category.create');
        // Изменение категории
        Route::put('update/{category}', 'update')->name('category.update');
        // Удаление категории
        Route::delete('delete/{category}', 'destroy')->name('category.delete');
    });
});

Route::prefix('orders')->controller(ApiOrderController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // получить все свои заказы
        Route::get('/', 'index')->name('orders.index');
        // получить конкретный заказ
        Route::get('/id/{order}', 'show')->name('orders.show');
        // Создать заказ
        Route::post('create', 'store')->name('orders.create');

        $MANAGER = 3;
        Route::middleware(['role:' . $MANAGER])->group(function () {
            // Получение всех заказов для админки
            Route::get('/all', 'all')->name('orders.all');
            // Поиск заказов по имени пользователя
            Route::get('/search', 'search')->name('orders.search');
            // Измененить статус заказа
            Route::patch('/update/{order}', 'update');
        });
    });
});

Route::prefix('products')->controller(ApiProductController::class)->group(function () {
    // Получить все продукты
    Route::get('/', 'index')->name('products.index');
    // Поиск по имени товара
    Route::get('/search', 'search')->name('products.search');
    // Получить продукт (по id)
    Route::get('/show/{product}', 'show')->name('products.show');
    // Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
    Route::get('/similar/{product}', 'similar')->name('products.similar');

    $MANAGER = 3;
    Route::middleware(['auth:api', 'role:' . $MANAGER])->group(function () {
        // Создать продукт
        Route::post('create', 'store')->name('products.create');
        // Изменить продукт по id 
        Route::patch('update/{product}', 'update')->name('products.update');
        // Удалить продукт 
        Route::delete('delete/{product}', 'destroy')->name('products.delete');
    });
});

Route::prefix('reviews')->controller(ApiReviewController::class)->group(function () {
    // Получить вообще все отзывы
    Route::get('/', 'index')->name('reviews.index');
    // Получить все отзывы товара (по id товара)
    Route::get('/product/{product}', 'getProductReviews')->name('reviews.product');
    // Получить среднюю оценку товара (по id товара)
    Route::get('/productavg/{product}', 'getAverageRating')->name('reviews.productavg');
    // Получить отзывы товаров (по id категории)
    Route::get('/category/{category}', 'getCategoryReviews')->name('reviews.category');

    Route::middleware(['auth:api'])->group(function () {
        // Получить свои отзывы
        Route::get('/me', 'me')->name('reviews.me');
        // Оставить отзыв
        Route::post('create/{product}', 'store')->name('reviews.create');
        // Отредактировать отзыв
        Route::patch('update/{review}', 'update')->name('reviews.update');
        // Удалить отзыв
        Route::delete('delete/{review}', 'destroy')->name('reviews.delete');
    });
});

Route::prefix('reviews/votes')->controller(ApiReviewVoteController::class)->group(function () {
    Route::middleware(['auth:api'])->group(function () {
        // Получить все свои оценки отзывов
        Route::get('/', 'index')->name('reviews.votes.index');
        // Отзыв помог
        Route::post('like/{review}', 'like')->name('reviews.votes.like');
        // Отзыв не помог
        Route::post('dislike/{review}', 'dislike')->name('reviews.votes.dislike');
        // Удалить оценку отзыва
        Route::delete('remove/{review}', 'destroy')->name('reviews.votes.remove');
    });
});

// 1 - USER
// 2 - SELLER
// 3 - MANAGER
// 4 - ADMIN
// 5 - HEAD_ADMIN

Route::prefix('roles')->controller(ApiUserRoleController::class)->group(function () {
    $USER = 1;
    $SELLER = 2;
    $MANAGER = 3;
    $ADMIN = 4;
    $HEAD_ADMIN = 5;

    // Маршруты, доступные только для мэнэджера 
    // Просмотр ролей и создание/удаление права на торговлю свои товаром 
    Route::middleware(['auth:api', 'role:' . $MANAGER])->group(function () {
        Route::get('get/{user}', 'index')->name('roles.get');
        Route::post('make/seller/{user}', 'makeSaller')->name('roles.make.seller');
        Route::post('remove/seller/{user}', 'removeSeller')->name('roles.remove.seller');
    });

    // Дополнительные команды, доступные только админам
    Route::middleware(['auth:api', 'role:' . $ADMIN])->group(function () {
        Route::post('make/manager/{user}', 'makeManager')->name('roles.make.manager');
        Route::post('remove/manager/{user}', 'removeManager')->name('roles.remove.manager');

        // Полная очистка всех ролей, делает пользователя обычным USER
        // Работает только на пользователей с ROLE < совершающего очистку
        Route::put('clear/{user}', 'destroy')->name('roles.clear');
    });

    Route::middleware(['auth:api', 'role:' . $HEAD_ADMIN])->group(function () {
        Route::post('make/admin/{user}', 'makeAdmin')->name('roles.make.admin');
        Route::post('remove/admin/{user}', 'removeAdmin')->name('roles.remove.admin');
        // TODO 
        // Здесь обязательно будет куча энд-поинтов для админки.
    });
});
