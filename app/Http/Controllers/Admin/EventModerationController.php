<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventModerationController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::with(['user.organizerProfile'])->has('organizer');

        // 1. Searching
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                    $q->where('title', 'like', "%{$request->search}%")
                    ->orWhereHas('user', function ($inner) use ($request) {
                        $inner->where('name', 'like', "%{$request->search}%");
                    });
                });
        }

        // 2. Sorting
        $sortField = $request->input('sort', 'created_at');
        $sortOrder = $request->input('order', 'desc');
        $query->orderBy($sortField, $sortOrder);

        return Inertia::render('Admin/Events/Moderation', [
            'events' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'sort', 'order'])
        ]);
    }

    public function approve(Event $event)
    {
        $event->update(['status' => 'published', 'admin_note' => null]);
        return back()->with('message', 'Event published successfully.');
    }

    public function reject(Request $request, Event $event)
    {
        $request->validate(['admin_note' => 'required|string|max:500']);
        $event->update(['status' => 'rejected', 'admin_note' => $request->admin_note]);
        return back()->with('message', 'Event rejected with note.');
    }
}
