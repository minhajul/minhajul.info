<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'is_admin',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean'
    ];

    // Mutator
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }

    // Methods
    public function isAdmin(): bool
    {
        return $this->is_admin;
    }

    public function isUser(): bool
    {
        return !$this->is_admin;
    }

    public function avatarUrl(): string
    {
//        if (!empty($this->avatar_path)) {
//            return Storage::url($this->avatar_path);
//        }

        return 'https://via.placeholder.com/150x150';
    }

    // Relationships
    public function expenses(): HasMany
    {
        return $this->hasMany(Expense::class);
    }

    public function setting(): HasOne
    {
        return $this->hasOne(Setting::class);
    }
}
