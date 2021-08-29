<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class ExpensePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, Expense $expense): Response
    {
        return $this->hasPermission($user, $expense);
    }

    public function update(User $user, Expense $expense): Response
    {
        return $this->hasPermission($user, $expense);
    }

    public function delete(User $user, Expense $expense): Response
    {
        return $this->hasPermission($user, $expense);
    }

    private function hasPermission(User $user, Expense $expense): Response
    {
        return $user->id == $expense->user_id
            ? Response::allow()
            : Response::deny('You do not have right permission to perform this action.');
    }
}
