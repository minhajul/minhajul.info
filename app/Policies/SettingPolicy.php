<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SettingPolicy
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

    public function view(User $user, Setting $setting): Response
    {
        return $this->hasPermission($user, $setting);
    }

    public function update(User $user, Setting $setting): Response
    {
        return $this->hasPermission($user, $setting);
    }

    public function delete(User $user, Setting $setting): Response
    {
        return $this->hasPermission($user, $setting);
    }

    private function hasPermission(User $user, Setting $setting): Response
    {
        return $user->id == $setting->user_id
            ? Response::allow()
            : Response::deny('You do not have right permission to perform this action.');
    }
}
