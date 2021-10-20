<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\SupplierController;
use App\Http\Controllers\API\SalaryController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\ExpenseController;
use App\Http\Controllers\API\AttendanceController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\POSController;

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
    Route::get("employee/view/{id}",[EmployeeController::class,"getEmployee"])->name("employee");
    Route::get("employee/edit/{id}",[EmployeeController::class,"getEmployee"])->name("employee-edit");
    Route::post("employee/update",[EmployeeController::class,"updateEmployee"])->name("employee-update");
    Route::get("employee/delete/{id}",[EmployeeController::class,"deleteEmployee"])->name("employee-delete");

    //Customer
    Route::post("customer/add",[CustomerController::class,"saveCustomer"])->name("add-customer");
    Route::get("customers",[CustomerController::class,"getCustomers"])->name("all-customers");
    Route::get("customer/view/{id}",[CustomerController::class,"getCustomer"])->name("customer");
    Route::get("customer/edit/{id}",[CustomerController::class,"getCustomer"])->name("edit-customer");
    Route::post("customer/update",[CustomerController::class,"updateCustomer"])->name("update-customer");
    Route::get("customer/view/{id}",[CustomerController::class,"showCustomer"])->name("customer");
    Route::get("customer/delete/{id}",[CustomerController::class,"deleteCustomer"])->name("delete-customer");

    //Supplier
    Route::post("supplier/add",[SupplierController::class,"saveSupplier"])->name("add-supplier");
    Route::get("suppliers",[SupplierController::class,"getSuppliers"])->name("all-suppliers");
    Route::get("supplier/view/{id}",[SupplierController::class,"getSupplier"])->name("customer");
    Route::get("supplier/edit/{id}",[SupplierController::class,"getSupplier"])->name("edit-supplier");
    Route::post("supplier/update",[SupplierController::class,"updateSupplier"])->name("update-supplier");
    Route::get("supplier/delete/{id}",[SupplierController::class,"deleteSupplier"])->name("delete-supplier");

    //AdvancedSalary
    Route::post("advanced/salary/add",[SalaryController::class,"saveAdvancedSalary"])->name("addAdvancedSalary");
    Route::get("advanced/salaries",[SalaryController::class,"getAdvancedSalaries"])->name("advanced-salaries");

    //Salary
    Route::get("salary/payable",[SalaryController::class,"getPayableSalary"])->name("payableSalary");
    Route::post("salary/add",[SalaryController::class,"saveSalary"])->name("addSalary");
    Route::get("salaries",[SalaryController::class,"getSalaries"])->name("salaries");

    //Category
    Route::post("category/add",[CategoryController::class,"saveCategory"])->name("addCategory");
    Route::get("categories",[CategoryController::class,"getCategories"])->name("categories");
    Route::get("category/edit/{id}",[CategoryController::class,"editCategory"])->name("editCategory");
    Route::post("category/update",[CategoryController::class,"updateCategory"])->name("updateCategory");
    Route::get("category/delete/{id}",[CategoryController::class,"deleteCategory"])->name("deleteCategory");

    //Brand
    Route::post("brand/add",[BrandController::class,"saveBrand"])->name("addBrand");
    Route::get("brands",[BrandController::class,"getBrands"])->name("brands");
    Route::post("brand/update",[BrandController::class,"updateBrand"])->name("updateBrand");
    Route::get("brand/delete/{id}",[BrandController::class,"deleteBrand"])->name("deleteBrands");


    //Product
    Route::post("product/add",[ProductController::class,"saveProduct"])->name("addProduct");
    Route::get("products",[ProductController::class,"getProducts"])->name("products");
    Route::get("product/edit/{id}",[ProductController::class,"getProduct"])->name("editProduct");
    Route::get("product/view/{id}",[ProductController::class,"getProduct"])->name("viewProduct");
    Route::post("product/update",[ProductController::class,"updateProduct"])->name("updateProduct");
    Route::get("product/delete/{id}",[ProductController::class,"deleteProduct"])->name("deleteProduct");

    //Expense
    Route::post("expense/add",[ExpenseController::class,"saveExpense"])->name("addExpense");
    // Route::get("expenses",[ExpenseController::class,"getExpenses"])->name("Expenses");
    Route::get("expense/edit/{id}",[ExpenseController::class,"getExpense"])->name("Expenses");
    Route::post("expense/update",[ExpenseController::class,"updateExpense"])->name("updateExpense");
    Route::get("expenses/{formDate}/{toDate}",[ExpenseController::class,"getExpenseInRange"])->name("expenseInRange");
    // Route::get("expense/today",[ExpenseController::class,"getTodayExpense"])->name("todayExpense");
    // Route::get("expense/month/{month}",[ExpenseController::class,"getMonthExpense"])->name("monthlyExpense");
    // Route::get("expense/year",[ExpenseController::class,"getYearExpense"])->name("yearlyExpense");

    //Attendance
    Route::post("attendance/add",[AttendanceController::class,"saveAttendance"])->name("addAttendance");
    Route::get("attendances",[AttendanceController::class,"getAttendances"])->name("attendances");
    Route::get("attendance/edit/{date}",[AttendanceController::class,"getAttendance"])->name("getAttendance");
    Route::post("attendance/update",[AttendanceController::class,"updateAttendance"])->name("updateAttendance");

    //Setting - end of the project



    //POS 
    Route::get("products/category/{cat_id}",[POSController::class,"getProductByCategory"])->name("productsByCategory");
    Route::get("products/category/brand/{cat_id}/{brand_id}",[POSController::class,"getProductByCategoryAndBrand"])->name("productsByCategoryAndBrand");
    











    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
