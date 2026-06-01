<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'location',
        'date_time',
        'price',
        'available_slots',
        'thumbnail',
        'status',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
