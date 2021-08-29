<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ConsoleCommandTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_admin_user_can_not_be_created_with_wrong_password()
    {
        $this->artisan('admin:create-user')
            ->expectsQuestion('Input Your Name:', 'Admin User')
            ->expectsQuestion('Input Your Email:', 'admin@gmail.com')
            ->expectsQuestion('Set Password:', 'password')
            ->expectsQuestion('Write your password again:', 'another_password')
            ->expectsOutput('Password mismatch')
            ->assertExitCode(1);
    }

    public function test_admin_user_can_be_created()
    {
        $this->artisan('admin:create-user')
            ->expectsQuestion('Input Your Name:', 'Admin User')
            ->expectsQuestion('Input Your Email:', 'admin@gmail.com')
            ->expectsQuestion('Set Password:', 'password')
            ->expectsQuestion('Write your password again:', 'password')
            ->expectsOutput('User has been created. Login using the given credentials.')
            ->assertExitCode(0);
    }
}
