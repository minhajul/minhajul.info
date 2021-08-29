<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)
            ->has(Expense::factory()->count(10))
            ->has(Setting::factory()->count(1))
            ->create([
                'email' => 'user@gmail.com'
            ]);

        User::factory(1)
            ->has(Expense::factory()->count(10))
            ->has(Setting::factory()->count(1))
            ->create([
                'email' => 'admin@gmail.com',
                'is_admin' => true
            ]);
    }
}
