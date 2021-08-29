<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Expense::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $categoryIds = Category::all()->pluck('id')->toArray();

        return [
            'user_id' => User::first(),
            'title' => $this->faker->name('male'),
            'amount' => $this->faker->numberBetween(100, 30000),
            'is_recurring' => $this->faker->boolean,
            'recurring_period' => $this->faker->randomElement(config('enums.recurring_period')),
            'next_payment_date' => now()->addMonth()->format('d'),
            'category_id' => $this->faker->randomElement($categoryIds)
        ];
    }
}
