<?php

namespace App\Services\Organizer;

use App\Models\Event;
use Illuminate\Support\Facades\Storage;

class EventService
{
    /**
     * Store a new event in the database.
     */
    public function store(array $validatedData, int $userId): Event
    {
        $eventData = $validatedData;
        $eventData['user_id'] = $userId;
        $eventData['status'] = 'pending'; // Set a default status

        if (isset($validatedData['thumbnail'])) {
            $eventData['thumbnail'] = $validatedData['thumbnail']->store('thumbnails', 'public');
        }

        return Event::create($eventData);
    }
}
