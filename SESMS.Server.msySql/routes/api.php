<?php

use App\Http\Controllers\Api\AthleteController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SportEventController;
use App\Http\Controllers\Api\VenueController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('athletes', AthleteController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('venues', VenueController::class);
Route::apiResource('sport-events', SportEventController::class);

Route::post('/login', [AuthController::class, 'login']);
