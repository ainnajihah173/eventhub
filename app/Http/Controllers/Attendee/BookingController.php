<?php

namespace App\Http\Controllers\Attendee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    public function store(Event $event)
    {
        return DB::transaction(function () use ($event) {

            // 1. Re-check availability (Lock the row for update)
            $event = Event::where('id', $event->id)->lockForUpdate()->first();

            if ($event->available_slots <= 0) {
                return back()->with('error', 'Sorry, this event just sold out!');
            }

            // 2. Create the Booking
            $booking = Booking::create([
                'user_id' => auth()->id(),
                'event_id' => $event->id,
                'booking_reference' => 'EHP-' . strtoupper(Str::random(10)),
                'amount_paid' => $event->price,
                'status' => 'pending',
            ]);

            // 3. Decrement Capacity
            $event->decrement('available_slots');

            // 4. Redirect to Payment (Phase 6)
            return redirect()->route('payments.checkout', $booking->id);
        });
    }
}
