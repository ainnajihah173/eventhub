<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Organizer\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\OrganizerApprovalController;
use App\Http\Controllers\Admin\EventModerationController;


// 1. PUBLIC ROUTES
Route::get('/', function () {
    return Inertia::render('Welcome');
});

// 2. AUTHENTICATED ROUTES (Shared)
Route::middleware(['auth', 'verified', 'not_suspended'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 3. ADMIN ONLY
    Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/approvals', [OrganizerApprovalController::class, 'index'])->name('approvals.index');
        Route::post('/approvals/{profile}/approve', [OrganizerApprovalController::class, 'approve'])->name('approvals.approve');
        Route::post('/approvals/{profile}/reject', [OrganizerApprovalController::class, 'reject'])->name('approvals.reject');
        
        Route::get('/events/moderation', [EventModerationController::class, 'index'])->name('events.moderation');
        Route::post('/events/{event}/approve', [EventModerationController::class, 'approve'])->name('events.approve');
        Route::post('/events/{event}/reject', [EventModerationController::class, 'reject'])->name('events.reject');
    });

    // 4. ORGANIZER ONLY
    Route::middleware(['auth', 'verified', 'role:organizer', 'approved_org'])
        ->prefix('organizer')
        ->name('organizer.')
        ->group(function () {

            Route::resource('events', EventController::class);
            Route::post('/events/ai-generate', [EventController::class, 'generateDescription']);

        });
});


// Breeze auth routes (login, register, password reset, email verify)
require __DIR__ . '/auth.php';
