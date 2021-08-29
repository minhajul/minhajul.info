<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expense;
use App\Http\Requests\ExpenseRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;

class ExpenseController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $expenses = Expense::ofUser($user)->orderByDesc('created_at')->paginate(20);

        return view('admin.expense.index', compact('expenses'));
    }

    public function create()
    {
        $categories = Category::all();

        return view('admin.expense.create', compact('categories'));
    }

    public function store(ExpenseRequest $request): RedirectResponse
    {
        $user = auth()->user();

        $user->expenses()->create(
            $request->only('title', 'amount', 'category_id')
        );

        session()->flash('success', 'The expense has been created');
        return redirect()->route('admin.expense.index');
    }

    public function show(Expense $expense)
    {
        $response = Gate::inspect('view', $expense);

        if (!$response->allowed()) {
            session()->flash('error', $response->message());
            return back();
        }

        $categories = Category::all();

        return view('admin.expense.show', compact('categories', 'expense'));
    }

    public function update(ExpenseRequest $request, Expense $expense): RedirectResponse
    {
        $response = Gate::inspect('update', $expense);

        if (!$response->allowed()) {
            session()->flash('error', $response->message());
            return back();
        }

        $expense->update(
            $request->only('title', 'amount', 'category_id')
        );

        session()->flash('success', 'The expense has been updated');
        return redirect()->route('admin.expense.index');
    }

    public function destroy(Expense $expense): RedirectResponse
    {
        $response = Gate::inspect('delete', $expense);

        if (!$response->allowed()) {
            session()->flash('error', $response->message());
            return back();
        }

        $expense->delete();

        session()->flash('success', 'The expense has been deleted');
        return redirect()->back();
    }
}
