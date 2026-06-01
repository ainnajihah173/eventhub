<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\OrganizerApprovalController;


// 1. PUBLIC ROUTES
Route::get('/', function () {
    return Inertia::render('Welcome'); });

// 2. AUTHENTICATED ROUTES (Shared)
Route::middleware(['auth', 'verified', 'not_suspended'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // 3. ADMIN ONLY
    Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/approvals', [OrganizerApprovalController::class, 'index'])->name('approvals.index');
        Route::post('/approvals/{profile}/approve', [OrganizerApprovalController::class, 'approve'])->name('approvals.approve');
        Route::post('/approvals/{profile}/reject', [OrganizerApprovalController::class, 'reject'])->name('approvals.reject');
    });

    // 4. ORGANIZER ONLY
    Route::middleware(['auth', 'verified', 'role:organizer'])->prefix('organizer')->name('organizer.')->group(function () {

        // Page shown if status is 'pending'
        Route::get('/pending', function () {
            return Inertia::render('Auth/PendingOrganizer');
        })->name('organizer.pending');

        // PROTECTED ORGANIZER ROUTES (Must be approved)
        Route::middleware(['approved_org'])->group(function () {
            Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
            // ... other event management routes
        });
    });
});


// Breeze auth routes (login, register, password reset, email verify)
require __DIR__ . '/auth.php';
