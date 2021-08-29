<?php

namespace App\Http\Controllers;

use App\Models\Expense;

class AdminController extends Controller
{
    public function index()
    {
        $expenses = Expense::orderByDesc('created_at')->paginate(20);

        return view('admin.home', compact('expenses'));
    }

    public function profile()
    {
        return view('admin.profile.index');
    }
}
