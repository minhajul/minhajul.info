<?php

namespace App\Http\Livewire\Expense;

use App\Classes\ExpenseReports;
use Livewire\Component;

class Month extends Component
{
    public $filter;

    public function render()
    {
        $expensesByMonth = ExpenseReports::byMonth(auth()->user());

        return view('livewire.expense.month')->with([
            'expensesByMonth' => $expensesByMonth
        ]);
    }
}
