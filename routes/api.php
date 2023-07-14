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

Route::prefix('auth')->group(function () {
    Route::controller(ApiAuthController::class)->group(function () {
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
});

Route::prefix('users')->group(function () {
    Route::controller(ApiUserController::class)->group(function () {
        Route::middleware(['auth:api'])->group(function () {
            // Получить все данные залогиненного пользователя (для разработки)
            Route::get('getme', 'getme');

            // Изменить данные профиля
            Route::put('update', 'update');
        });
    });
});

Route::prefix('address')->group(function () {
    Route::controller(ApiAddressController::class)->group(function () {
        Route::middleware(['auth:api'])->group(function () {
            // Создание адресса в списке адрессов пользоваля
            Route::post('create', 'create');
            // Изменение адресса
            Route::post('update/{id}', 'update');
            // Удаление адресса
            Route::post('delete/{id}', 'delete');
        });
    });
});

Route::prefix('cart')->group(function () {
    Route::controller(ApiCartController::class)->group(function () {
        Route::middleware(['auth:api'])->group(function () {
            // Получить все товары в корзине
            Route::get('/', 'index');
            // Добавить товар в корзину 
            Route::post('create/{id}', 'store');
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
});

Route::prefix('favorites')->group(function () {
    Route::controller(ApiUserFavoriteController::class)->group(function () {
        Route::middleware(['auth:api'])->group(function () {
            // Получить все товары в корзине
            Route::get('/', 'index');
            // Добавить товар в корзину 
            Route::post('store/{id}', 'store');
            // Удалить из корзины
            Route::delete('remove/{id}', 'destroy');
        });
    });
});

Route::prefix('category')->group(function () {
    Route::controller(ApiCategoryController::class)->group(function () {
        // Получение всех категорий
        Route::get('/', 'index');
        // Получение всех товаров id категории
        Route::get('/byid/{id}', 'getProductsByCategoryId');
        // Получение всех товаров по slug-у категории
        Route::get('{slug}', 'getProductsBySlug');

        Route::middleware(['auth:api', 'role:4'])->group(function () {
            // Создание категории
            Route::post('create', 'store');
            // Изменение категории
            Route::put('update/{id}', 'update');
            // Удаление категории
            Route::delete('delete/{id}', 'destroy');
        });
    });
});
Route::prefix('orders')->group(function () {
    Route::controller(ApiOrderController::class)->group(function () {
        Route::middleware(['auth:api'])->group(function () {
            // получить все свои заказы
            Route::get('/', 'index');

            // получить конкретный заказ
            Route::get('/{id}', 'show');

            // Создать заказ
            Route::post('create', 'store');
        });
    });
});
Route::prefix('products')->group(function () {
    Route::controller(ApiProductController::class)->group(function () {
        // Получить продукт (по id)
        Route::get('/{id}', 'show');
        // Получить все продукты
        Route::get('/getall', 'index');
        // Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
        Route::get('/similar/{id}', 'similar');

        Route::middleware(['auth:api', 'role:3'])->group(function () {
            // Создать продукт
            Route::post('create', 'store');
            // Изменить продукт по id 
            Route::patch('update/{id}', 'update');
            // Удалить продукт 
            Route::delete('delete/{id}', 'destroy');
        });
    });
});
Route::prefix('reviews')->group(function () {
    Route::controller(ApiReviewController::class)->group(function () {
        // Получить вообще все отзывы
        Route::get('/', 'index');
        // Получить все отзывы товара (по id)
        Route::get('/product/{id}', 'getProductReviews');
        // Получить среднюю оценку товара (по id)
        Route::get('/productavg/{id}', 'getAverageRating');
        // Получить отзывы товаров (по категории)
        Route::get('/category/{id}', 'getCategoryReviews');

        Route::middleware(['auth:api'])->group(function () {
            // Оставить отзыв
            Route::post('create', 'store');
            // Отредактировать отзыв
            Route::patch('update/{id}', 'update');
            // Удалить отзыв
            Route::delete('delete/{id}', 'destroy');
        });
    });

    Route::prefix('votes')->group(function () {
        Route::controller(ApiReviewVoteController::class)->group(function () {
            Route::middleware(['auth:api'])->group(function () {
                Route::get('/', 'index');
                Route::post('like/{id}', 'like');
                Route::post('dislike/{id}', 'dislike');
                Route::delete('remove/{id}', 'destroy');
            });
        });
    });
});


// 1 - USER
// 2 - SELLER
// 3 - MANAGER
// 4 - ADMIN
// 5 - HEAD_ADMIN

Route::prefix('roles')->group(function () {
    Route::controller(ApiUserRoleController::class)->group(function () {
        // Маршруты, доступные только для мэнэджера 
        // Просмотр ролей и создание/удаление права на торговлю свои товаром 
        Route::middleware(['auth:api', 'role:3'])->group(function () {
            Route::get('get/{user_id}', 'index');
            Route::post('make/seller/{user_id}', 'makeSaller');
            Route::post('remove/seller/{user_id}', 'removeSeller');
        });

        // Дополнительные команды, доступные только админам
        Route::middleware(['auth:api', 'role:4'])->group(function () {
            Route::post('make/manager/{user_id}', 'makeManager');
            Route::post('remove/manager/{user_id}', 'removeManager');

            // Полная очистка всех ролей, делает пользователя обычным USER
            // Работает только на пользователей с ROLE < совершающего очистку
            Route::put('clear/{user_id}', 'destroy');
        });

        Route::middleware(['auth:api', 'role:5'])->group(function () {
            Route::post('make/admin/{user_id}', 'makeAdmin');
            Route::post('remove/admin/{user_id}', 'removeAdmin');
        });
    });
});
