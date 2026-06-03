<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\OrganizerApprovalController;
use App\Http\Controllers\Admin\EventModerationController;
use App\Http\Controllers\Organizer\EventController as OrganizerEventController;
use App\Http\Controllers\Attendee\EventDiscoveryController;
use App\Http\Controllers\Attendee\BookingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CategoryController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

/*
|--------------------------------------------------------------------------
| Authenticated & Safety Routes (Global Protection)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', 'not_suspended'])->group(function () {

    // 1. THE UNIFIED DASHBOARD (The "Switcher")
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | ADMIN ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware(['role:admin'])->prefix('admin')->name('admin.')->group(function () {
        // Organizer Verification
        Route::get('/approvals', [OrganizerApprovalController::class, 'index'])->name('approvals.index');
        Route::post('/approvals/{profile}/approve', [OrganizerApprovalController::class, 'approve'])->name('approvals.approve');
        Route::post('/approvals/{profile}/reject', [OrganizerApprovalController::class, 'reject'])->name('approvals.reject');

        // Event Moderation
        Route::get('/events/moderation', [EventModerationController::class, 'index'])->name('events.moderation');
        Route::post('/events/{event}/approve', [EventModerationController::class, 'approve'])->name('events.approve');
        Route::post('/events/{event}/reject', [EventModerationController::class, 'reject'])->name('events.reject');

        Route::resource('categories', CategoryController::class)->except(['create', 'edit', 'show']);

    });

    /*
    |--------------------------------------------------------------------------
    | ORGANIZER ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware(['role:organizer'])->prefix('organizer')->name('organizer.')->group(function () {
        
        // Holding page for non-approved organizers
        Route::get('/pending', function () {
            return Inertia::render('Auth/PendingOrganizer');
        })->name('pending');

        // PROTECTED: Only for Active/Approved Organizers
        Route::middleware(['approved_org'])->group(function () {
            Route::resource('events', OrganizerEventController::class);
            
            // AI Helper Route (AJAX)
            Route::post('/events/ai-generate', [OrganizerEventController::class, 'generateDescription'])->name('events.ai');
            Route::get('/events/{event}/attendees', [OrganizerEventController::class, 'attendees'])->name('events.attendees');
            
            // Sales & Bookings Management
            Route::get('/sales', function() { return Inertia::render('Organizer/Sales'); })->name('sales');
        });
    });

    /*
    |--------------------------------------------------------------------------
    | ATTENDEE (USER) ROUTES
    |--------------------------------------------------------------------------
    */
    Route::middleware(['role:user'])->group(function () {
        // Event Discovery (Explore)
        Route::get('/explore', [EventDiscoveryController::class, 'index'])->name('events.explore');
        Route::get('/events/{event}', [EventDiscoveryController::class, 'show'])->name('events.show');

        // Booking Process
        Route::post('/booking/{event}', [BookingController::class, 'store'])->name('booking.store');
        
        // Payment Flow 
        Route::get('/payment/checkout/{booking}', function($booking) { 
            return Inertia::render('Attendee/Checkout', ['bookingId' => $booking]); 
        })->name('payments.checkout');
    });

});

/*
|--------------------------------------------------------------------------
| Auth Routes (Breeze Defaults)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';