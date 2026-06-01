<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\OrganizerProfile;
use Illuminate\Support\Facades\Hash;

class OrganizerProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Create the Organizer User
        $user = User::create([
            'name' => 'John Organizer',
            'email' => 'organizer@eventhub.com',
            'password' => Hash::make('password'),
            'role' => 'organizer',
            'status' => 'active', // Approved immediately via seeder
            'email_verified_at' => now(),
        ]);

        // 2. Create the associated Profile
        OrganizerProfile::create([
            'user_id' => $user->id,
            'org_name' => 'Aesthetic Events Co.',
            'id_proof_path' => 'proofs/dummy_id.pdf',
            'org_description' => 'The premier organizer for modern tech and design events.',
            'org_phone' => '+60123456789',
            'org_website' => 'https://aestheticevents.com',
            'approval_status' => 'approved',
            'approved_at' => now(),
        ]);
    }
}
