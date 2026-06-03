<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'type', 'seating_type', 'description'];

    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
