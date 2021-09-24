<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\CustomerController;

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

    // Employee
    Route::post("employee/add",[EmployeeController::class,"saveEmployee"])->name("employee-save");
    Route::get("employees",[EmployeeController::class,"getEmployees"])->name("employees");
    Route::get("employee/view/{id}",[EmployeeController::class,"showEmployee"])->name("employee");
    Route::get("employee/edit/{id}",[EmployeeController::class,"editEmployee"])->name("employee-edit");
    Route::post("employee/update",[EmployeeController::class,"updateEmployee"])->name("employee-update");
    Route::get("employee/delete/{id}",[EmployeeController::class,"deleteEmployee"])->name("employee-delete");

    //Customer
    Route::post("customer/add",[CustomerController::class,"saveCustomer"])->name("add-customer");




    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
