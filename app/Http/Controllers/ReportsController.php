<?php

namespace App\Http\Controllers;

use App\Classes\ExpenseReports;
use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $reports = $this->getDoughnutChartData(auth()->user());

        return view('admin.report.index')->with([
            'reports' => $reports,
            'categories' => $reports->pluck('category_name'),
            'amounts' => $reports->pluck('total_amount'),
        ]);
    }

    public function getDoughnutChartData($user): Collection
    {
        return DB::table((new Expense())->getTable())
            ->selectRaw("categories.name AS category_name, sum(expenses.amount) AS total_amount")
            ->where('user_id', $user->id)
            ->join((new Category())->getTable(), 'categories.id', '=', 'expenses.category_id')
            ->groupByRaw('categories.name')
            ->get();
    }
}
