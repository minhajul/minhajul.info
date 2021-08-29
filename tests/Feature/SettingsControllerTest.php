<?php

namespace Tests\Feature;

use App\Models\Setting;
use App\Models\User;
use Tests\TestCase;

class SettingsControllerTest extends TestCase
{
    public function test_user_can_not_access_without_setting()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get(route('admin.settings.index'));

        $response->assertStatus(302);
    }

    public function test_admin_can_view_setting_page()
    {
        $user = User::factory()
            ->has(Setting::factory())
            ->create([
                'is_admin' => true
            ]);

        $response = $this->actingAs($user)
            ->get(route('admin.settings.index'));

        $response->assertSuccessful();
    }

    public function test_admin_user_can_update_setting()
    {
        $user = User::factory()
            ->has(Setting::factory())
            ->create([
                'is_admin' => true
            ]);

        $response = $this->actingAs($user)
            ->put(route('admin.settings.edit', $user->setting), [
                'income' => 10000,
                'savings' => 20
            ]);

        $response->assertStatus(302);
    }
}
