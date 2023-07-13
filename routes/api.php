<?php

use App\Http\Controllers\Api\ApiAddressController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;

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

Route::prefix('address')->group(function () {
    Route::controller(ApiAddressController::class)->group(function () {
        Route::post('create', 'create');
        Route::post('update/{id}', 'update');
        Route::post('delete/{id}', 'delete');
    });
});
