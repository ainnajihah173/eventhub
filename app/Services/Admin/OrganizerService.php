<?php

namespace App\Services\Admin;

use App\Models\OrganizerProfile;
use Illuminate\Support\Facades\DB;

class OrganizerService
{
    public function approve(OrganizerProfile $profile)
    {
        DB::transaction(function () use ($profile) {
            // 1. Update the profile status
            $profile->update([
                'approval_status' => 'approved',
                'approved_at' => now(),
            ]);

            // 2. Activate the user account
            $profile->user->update(['status' => 'active']);
        });
    }

    public function reject(OrganizerProfile $profile, string $reason)
    {
        DB::transaction(function () use ($profile, $reason) {
            $profile->update([
                'approval_status' => 'rejected',
                'admin_note' => $reason,
                'rejected_at' => now(),
            ]);

            // Keep user status as pending or set to rejected
            $profile->user->update(['status' => 'rejected']);
        });
    }

}
