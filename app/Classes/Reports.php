<?php

namespace App\Classes;

use App\Models\Expense;

class Reports
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
}
