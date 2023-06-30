<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PhotoController;


// 写真ダウンロード
Route::get('/photos/{photo}/download', [PhotoController::class, 'download'])->name('photo.download');

// APIのURL以外のリクエストに対してはindexテンプレートを返す
// 画面遷移はフロントエンドのVueRouterが制御する
Route::get('/{any?}', fn () => view('index'))->where('any', '.+');
