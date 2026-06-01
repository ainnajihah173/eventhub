<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Event;
use App\Models\User;
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

        // Logic for ATTENDEE (User)
        if ($user->role === 'user') {
            $data = [
                'upcoming_events' => Event::where('status', 'published')->latest()->take(6)->get() ?? [],
                'my_bookings_count' => 0,
            ];
        }

        return Inertia::render('Dashboard', $data);
    }
}
