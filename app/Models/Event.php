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
        'start_date_time',
        'end_date_time',
        'price',
        'available_slots',
        'thumbnail',
        'status',
    ];

    public function organizer()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Alias for organizer relationship to match standard conventions.
     */
    public function user()
    {
        return $this->organizer();
    }

    public function attendees()
    {
        return $this->hasManyThrough(User::class, Booking::class, 'event_id', 'id', 'id', 'user_id');
    }

}
