<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\User;
use App\Models\Booking;
use App\Models\OrganizerProfile;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $data = [];

        // Logic for ADMIN
        if ($user->role === 'admin') {
            $data = [
                'stats' => [
                    'total_users' => User::count(),
                    'pending_organizers' => OrganizerProfile::where('approval_status', 'pending')->count(),
                    'total_events' => Event::count(),
                    'pending_events' => Event::where('status', 'pending')->count(),
                ],
            ];
        }

        // Logic for ORGANIZER
        if ($user->role === 'organizer') {
            $data = [
                'stats' => [
                    'my_events_count' => Event::where('user_id', $user->id)->count(),
                    'tickets_sold' => 0,
                ],
                'recent_events' => Event::where('user_id', $user->id)->latest()->take(5)->get() ?? [],
            ];
        }

        // Inside the User (Attendee) logic block:
        if ($user->role === 'user') {
            $data = [
                'upcoming_events' => Event::where('status', 'published')
                    ->where('start_date_time', '>', now())
                    ->where('available_slots', '>', 0)
                    ->latest()->take(3)->get(),
                'recent_bookings' => Booking::where('user_id', $user->id)
                    ->with('event')
                    ->latest()->take(4)->get(),
                'stats' => [
                    'total_tickets' => Booking::where('user_id', $user->id)->where('status', 'confirmed')->count(),
                ]
            ];
        }

        return Inertia::render('Dashboard', $data);
    }
}
