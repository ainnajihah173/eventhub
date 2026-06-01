<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrganizerProfile;
use App\Services\Admin\OrganizerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizerApprovalController extends Controller
{
     public function index()
    {
        return Inertia::render('Admin/OrganizerApprovals', [
            'pendingOrganizers' => OrganizerProfile::with('user')
                ->where('approval_status', 'pending')
                ->latest()
                ->get()
        ]);
    }

    public function approve(OrganizerProfile $profile, OrganizerService $service)
    {
        $service->approve($profile);
        return back()->with('message', 'Organizer approved successfully!');
    }

    public function reject(Request $request, OrganizerProfile $profile, OrganizerService $service)
    {
        $request->validate(['reason' => 'required|string|max:500']);
        $service->reject($profile, $request->reason);
        return back()->with('message', 'Organizer application rejected.');
    }
}
