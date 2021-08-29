<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Tests\TestCase;

class ExpenseControllerTest extends TestCase
{
    public function test_admin_user_can_view_own_expense()
    {
        Category::factory()->create();

        $user = User::factory()
            ->has(Expense::factory()->count(10))
            ->create([
                'is_admin' => true
            ]);

        $response = $this->actingAs($user)
            ->get(route('admin.expense.index'));

        $response->assertSuccessful();
    }

    public function test_admin_user_can_view_expense_create_view()
    {
        Category::factory()->create();

        $user = User::factory()
            ->has(Expense::factory()->count(10))
            ->create([
                'is_admin' => true
            ]);

        $response = $this->actingAs($user)
            ->get(route('admin.expense.create'));

        $response->assertSuccessful();
    }

    public function test_admin_user_can_create_expense()
    {
        $user = $this->getUser();

        $response = $this->actingAs($user)
            ->get(route('admin.expense.create'), [
                'title' => $this->faker->title,
                'amount' => $this->faker->numberBetween(100, 30000),
                'category_id' => Category::factory()
            ]);

        $response->assertSessionHasNoErrors();
    }

    public function test_admin_can_view_expense_update_view()
    {
        $user = $this->getUser();

        $expense = Expense::factory()->create([
            'category_id' => Category::factory(),
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)
            ->get(route('admin.expense.show', $expense));

        $response->assertSuccessful();
    }

    public function test_admin_user_can_update_expense()
    {
        $user = $this->getUser();

        $expense = Expense::factory()->create([
            'category_id' => Category::factory(),
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)
            ->put(route('admin.expense.edit', $expense), [
                'title' => $this->faker->title,
                'amount' => $this->faker->numberBetween(100, 30000),
                'category_id' => Category::factory()
            ]);

        $response->assertSessionHasNoErrors();
    }

    public function test_admin_can_delete_expense()
    {
        $user = $this->getUser();

        $expenses = Expense::factory()->count(10)->create([
            'category_id' => Category::factory(),
            'user_id' => $user->id
        ]);

        $response = $this->delete(route('admin.expense.delete', $expenses->first()));

        $response->assertSessionHasNoErrors();
    }

    private function getUser()
    {
        return User::factory()->create([
            'is_admin' => true
        ]);
    }
}
