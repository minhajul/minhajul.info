<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');


Route::group(['middleware' => 'admin', 'prefix' => 'admin'], function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.home');
    Route::get('/profile', [AdminController::class, 'profile'])->name('admin.profile');

    // Expenses
    Route::get('expense', [ExpenseController::class, 'index'])->name('admin.expense.index');
    Route::get('expense/create', [ExpenseController::class, 'create'])->name('admin.expense.create');
    Route::post('expense/create', [ExpenseController::class, 'store'])->name('admin.expense.store');
    Route::get('expense/{expense}', [ExpenseController::class, 'show'])->name('admin.expense.show');
    Route::put('expense/{expense}', [ExpenseController::class, 'update'])->name('admin.expense.edit');
    Route::delete('expense/{expense}', [ExpenseController::class, 'destroy'])->name('admin.expense.delete');

    // Settings
    Route::get('settings/', [SettingsController::class, 'index'])->name('admin.settings.index');
    Route::put('settings/{setting}', [SettingsController::class, 'update'])->name('admin.settings.edit');

    // Reports
    Route::get('reports', [ReportsController::class, 'index'])->name('admin.report.index');
});


