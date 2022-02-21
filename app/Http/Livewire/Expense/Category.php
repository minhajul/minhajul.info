<?php

namespace App\Http\Livewire\Expense;

use App\Classes\ExpenseReports;
use App\Models\Expense;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Livewire\Component;

class Category extends Component
{
    public function render()
    {
        $reports = $this->getDoughnutChartData(auth()->user());

        return view('livewire.expense.category', compact('reports'));
    }

    public function getDoughnutChartData($user): Collection
    {
        return DB::table((new Expense())->getTable())
            ->selectRaw("categories.name AS category_name, sum(expenses.amount) AS total_amount")
            ->where('user_id', $user->id)
            ->join((new \App\Models\Category())->getTable(), 'categories.id', '=', 'expenses.category_id')
            ->groupByRaw('categories.name')
            ->get();
    }
}
