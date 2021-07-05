<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;

Route::group(['prefix' => 'v1'], function () {
  Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/user', function (Request $request) {
      return $request->user();
    });
    Route::post('/posts', [PostController::class, 'store']);

    Route::post('/posts/{post}/likes', [LikeController::class, 'store']);
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);

    Route::get('/users/{user:username}', [UserController::class, 'show']);
  });
  Route::get('/posts', [PostController::class, 'index']);
});
