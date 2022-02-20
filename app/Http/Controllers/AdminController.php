<?php

namespace App\Http\Controllers;

use App\Classes\ExpenseReports;
use App\Models\Expense;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $expenses = Expense::ofUser($user)->orderByDesc('created_at')->paginate(20);

        list($currentSavings, $expectedSavings) = ExpenseReports::getSavings($user);

        return view('admin.home')->with([
            'expenses' => $expenses,
            'setting' => $user->setting,
            'spending' => ExpenseReports::getExpense($user),
            'currentSavings' => $currentSavings,
            'expectedSavings' => $expectedSavings
        ]);
    }

    public function profile()
    {
        return view('admin.profile.index');
    }
}
