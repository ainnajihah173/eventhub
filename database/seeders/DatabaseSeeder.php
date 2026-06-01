<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

         // Create the Admin
    User::create([
        'name' => 'System Admin',
        'email' => 'admin@eventhub.com',
        'password' => bcrypt('password'), // Change this for production!
        'role' => 'admin',
        'status' => 'active',
        'email_verified_at' => now(),
    ]);

    // Create a Test Organizer
    User::create([
        'name' => 'Premium Organizer',
        'email' => 'org@eventhub.com',
        'password' => bcrypt('password'),
        'role' => 'organizer',
        'status' => 'active',
        'email_verified_at' => now(),
    ]);
    }
}
