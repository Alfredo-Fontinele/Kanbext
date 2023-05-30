<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardsController;
use App\Http\Middleware\VerifyTokenMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->withoutMiddleware([VerifyTokenMiddleware::class]);

Route::group([VerifyTokenMiddleware::class], function () {
    Route::get('/cards', [CardsController::class, 'findAll']);
    Route::post('/cards', [CardsController::class, 'create']);
    Route::get('/cards/{card_id}', [CardsController::class, 'findOne']);
    Route::put('/cards/{card_id}', [CardsController::class, 'update']);
    Route::delete('/cards/{card_id}', [CardsController::class, 'delete']);
});
