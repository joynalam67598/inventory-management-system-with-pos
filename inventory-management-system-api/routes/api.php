<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\SupplierController;
use App\Http\Controllers\API\SalaryController;

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
    Route::get("customers",[CustomerController::class,"getCustomers"])->name("all-customers");
    Route::get("customer/view/{id}",[CustomerController::class,"showCustomer"])->name("customer");
    Route::get("customer/edit/{id}",[CustomerController::class,"editCustomer"])->name("edit-customer");
    Route::post("customer/update",[CustomerController::class,"updateCustomer"])->name("update-customer");
    Route::get("customer/view/{id}",[CustomerController::class,"showCustomer"])->name("customer");
    Route::get("customer/delete/{id}",[CustomerController::class,"deleteCustomer"])->name("delete-customer");

    //Supply
    Route::post("supplier/add",[SupplierController::class,"saveSupplier"])->name("add-supplier");
    Route::get("suppliers",[SupplierController::class,"getSupplier"])->name("all-suppliers");
    Route::get("supplier/view/{id}",[SupplierController::class,"showSupplier"])->name("customer");
    Route::get("supplier/edit/{id}",[SupplierController::class,"editSupplier"])->name("edit-supplier");
    Route::post("supplier/update",[SupplierController::class,"updateSupplier"])->name("update-supplier");
    Route::get("supplier/view/{id}",[SupplierController::class,"showSupplier"])->name("supplier");
    Route::get("supplier/delete/{id}",[SupplierController::class,"deleteSupplier"])->name("delete-supplier");

    //AdvancedSalary
    Route::post("advanced-salary/add",[SalaryController::class,"saveAdvancedSalary"])->name("addAdvancedSalary");
    Route::get("advanced-salaries",[SalaryController::class,"getAdvancedSalaries"])->name("advanced-salaries");

    //Salary
    Route::get("salary/payable",[SalaryController::class,"getPayableSalary"])->name("payableSalary");
    Route::post("salary/add",[SalaryController::class,"saveSalary"])->name("addSalary");
    Route::get("salaries",[SalaryController::class,"getSalaries"])->name("salaries");




    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
