<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 会員登録
Route::post('/register', [\App\Http\Controllers\Auth\RegisterController::class, 'register'])->name('register');
// ログイン
Route::post('/login', [\App\Http\Controllers\Auth\LoginController::class, 'login'])->name('login');
// ログアウト
Route::post('/logout', [\App\Http\Controllers\Auth\LoginController::class, 'logout'])->name('logout');


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
