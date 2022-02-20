<?php

namespace App\Classes;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Collection;

class ExpenseReports
{
    public static function getSavings($user): array
    {
        $setting = $user->setting;

        $expectedSavings = ($setting->income * $setting->savings) / 100;

        $expense = self::getExpense($user) ?? 0;

        return [
            $setting->income - $expense,
            $expectedSavings,
        ];
    }

    public static function getExpense($user): int
    {
        $expense = Expense::query()
            ->ofUser($user)
            ->whereBetween('created_at', [now()->startOfMonth(), now()])
            ->sum('amount');

        return $expense ?? 0;
    }

    public static function byMonth($user)
    {
        return Expense::query()
            ->selectRaw("MONTHNAME(expenses.created_at) as month_name, sum(expenses.amount) AS total")
            ->ofUser($user)
            ->groupByRaw("MONTH(expenses.created_at)")
            ->get();
    }
}
