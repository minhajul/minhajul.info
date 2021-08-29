<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class AdminControllerTest extends TestCase
{
    public function test_user_can_not_access_admin_panel()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('admin.home'));

        $response->assertStatus(302);
    }

    public function test_admin_can_visit_admin_panel()
    {
        $user = User::factory()->create([
            'is_admin' => true
        ]);

        $response = $this->actingAs($user)->get(route('home'));
        $response->assertSuccessful();
    }
}
