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

        Category::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('admin.expense.store'), [
                'title' => $this->faker->title,
                'amount' => $this->faker->numberBetween(100, 30000),
                'category_id' => Category::first()->id
            ]);

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHasNoErrors();
    }

    public function test_admin_can_view_expense_update_view()
    {
        $user = $this->getUser();

        Category::factory()->create();

        $expense = Expense::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)
            ->get(route('admin.expense.show', $expense));

        $response->assertSuccessful();
    }

    public function test_admin_user_can_update_expense()
    {
        $user = $this->getUser();

        Category::factory()->create();

        $expense = Expense::factory()->create([
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)
            ->put(route('admin.expense.edit', $expense), [
                'title' => $this->faker->title,
                'amount' => $this->faker->numberBetween(100, 30000),
                'category_id' => Category::first()->id
            ]);

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHasNoErrors();
    }

    public function test_admin_can_delete_expense()
    {
        $user = $this->getUser();

        Category::factory()->create();

        $expenses = Expense::factory()->count(10)->create([
            'user_id' => $user->id
        ]);

        $expense = $expenses->first();

        $response = $this->delete(route('admin.expense.delete', $expense));

        $this->assertEquals(302, $response->getStatusCode());
        $response->assertSessionHasNoErrors();
    }

    private function getUser()
    {
        return User::factory()->create([
            'is_admin' => true
        ]);
    }
}
