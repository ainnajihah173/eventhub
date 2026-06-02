<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Event;
use Inertia\Inertia;

class EventDiscoveryController extends Controller
{

    public function index(Request $request)
    {
        $query = Event::with('user')
            ->where('status', 'published')
            ->where('start_date_time', '>', Carbon::now())
            ->where('available_slots', '>', 0);

        //Search functionality
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('description', 'like', "%{$request->search}%")
                    ->orWhere('location', 'like', "%{$request->search}%");
            });
        }

        return Inertia::render('Attendee/Explore', [
            'events' => $query->latest()->paginate(9)->withQueryString(),
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //Ensure the event is viewable
        if($event->status !== 'published' || $event->available_slots <= 0) {
            return redirect()->route('dashboard')->with('error', 'Event no longer available.');
        }

        return Inertia::render('Attendee/EventDetails', [
            'event' => $event->load('user')
        ]);
    }

}
