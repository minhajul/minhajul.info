<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'amount',
        'is_recurring',
        'recurring_period',
        'next_payment_date',
        'category_id'
    ];

    // Scopes
    public function scopeOfUser(Builder $builder, User $user): Builder
    {
        return $builder->where('user_id', $user->id);
    }

    // Relationships
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
