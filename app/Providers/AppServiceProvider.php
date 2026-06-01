<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Role gates
        Gate::define('admin', fn(User $user) =>
            $user->isAdmin() && $user->isActive()
        );

        Gate::define('organizer', fn(User $user) =>
            $user->isOrganizer() && $user->isActive()
        );

        Gate::define('user', fn(User $user) =>
            $user->isUser() && $user->isActive()
        );

        Gate::define('organizer-approved', fn(User $user) =>
            $user->isOrganizer() &&
            $user->isActive() &&
            $user->organizerProfile?->isApproved()
        );
    }
}