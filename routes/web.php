<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [AppController::class, 'getApp'])->middleware('auth');
Route::get('/login', [AppController::class, 'login'])->name('login')->middleware('guest');
Route::get('/login/{social}', [AppController::class, 'getSocialRedirect'])->middleware('guest');
Route::get('/login/{social}/callback',  [AppController::class, 'getSocialCallback'])->middleware('guest');
Route::get('/logout', function () {
  Auth::logout();
})->middleware('auth');
