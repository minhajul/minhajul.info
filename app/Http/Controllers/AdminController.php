<?php

namespace App\Http\Controllers;

use App\Classes\Reports;
use App\Models\Expense;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        $user = User::find(auth()->id());

        $expenses = Expense::ofUser($user)->orderByDesc('created_at')->paginate(20);

        list($currentSavings, $expectedSavings) = Reports::getSavings($user);

        return view('admin.home')->with([
            'expenses' => $expenses,
            'setting' => $user->setting,
            'spending' => Reports::getExpense($user),
            'currentSavings' => $currentSavings,
            'expectedSavings' => $expectedSavings,
        ]);
    }

    public function profile()
    {
        return view('admin.profile.index');
    }
}
