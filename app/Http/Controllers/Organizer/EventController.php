<?php

namespace App\Http\Controllers\Organizer;
use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Services\Organizer\EventService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    // List Organizer's Events
    public function index()
    {
        return Inertia::render('Organizer/Events/Index', [
            'events' => Event::where('user_id', auth()->id())->latest()->get()
        ]);
    }

    // Show Create Form
    public function create()
    {
        return Inertia::render('Organizer/Events/Create');
    }

    // Store Event
    public function store(Request $request, EventService $service)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'start_date_time' => 'required|date',
            'end_date_time' => 'required|date|after_or_equal:start_date_time',
            'price' => 'required|numeric|min:0',
            'available_slots' => 'required|integer|min:1',
            'thumbnail' => 'nullable|image|max:2048',
        ]);

        $service->store($validated, auth()->id());

        return redirect()->route('organizer.events.index')
            ->with('message', 'Event submitted for admin approval.');
    }

    public function generateDescription(Request $request, \App\Services\AI\GeminiService $aiService)
    {
        $request->validate(['title' => 'required|string', 'location' => 'required|string']);

        $suggestion = $aiService->generateDescription($request->title, $request->location);

        return response()->json(['suggestion' => $suggestion]);
    }
}
