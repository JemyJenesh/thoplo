<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 'middleware' => 'auth:api'], function () {
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
});
Route::get('/logout', function (Request $request) {
  Auth::logout();
});
