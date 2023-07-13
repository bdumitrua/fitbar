<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['guest'])->group(function () {
    // Route::get('/register', [RegisterController::class, 'create'])->name('register');
    // Route::post('/register', [RegisterController::class, 'store']);

    // Route::get('/login', [LoginController::class, 'create'])->name('login');
    // Route::post('/login', [LoginController::class, 'store']);
});


Route::middleware('auth:api')->group(function () {
    // Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
});
