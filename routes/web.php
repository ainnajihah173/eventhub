<?php

use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\OrganizerApprovalController;
use App\Http\Controllers\Organizer\ProfileController as OrgProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn() => inertia('Welcome'))->name('home');

// Breeze auth routes (login, register, password reset, email verify)
require __DIR__.'/auth.php';

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    // Organizer: apply for organizer role
    Route::prefix('organizer')->name('organizer.')->group(function () {
        Route::get('/apply', [OrgProfileController::class, 'create'])
            ->name('apply');
        Route::post('/apply', [OrgProfileController::class, 'store'])
            ->name('apply.store');
        Route::get('/pending', [OrgProfileController::class, 'pending'])
            ->name('pending');
    });

    // Admin panel
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {

        Route::get('/dashboard', fn() => inertia('Admin/Dashboard'))
            ->name('dashboard');

        // Organizer approvals
        Route::get('/approvals', [OrganizerApprovalController::class, 'index'])
            ->name('approvals');
        Route::patch('/approvals/{profile}/approve', [OrganizerApprovalController::class, 'approve'])
            ->name('approvals.approve');
        Route::patch('/approvals/{profile}/reject', [OrganizerApprovalController::class, 'reject'])
            ->name('approvals.reject');

        // User management
        Route::get('/users', [AdminUserController::class, 'index'])
            ->name('users');
        Route::patch('/users/{user}/suspend', [AdminUserController::class, 'suspend'])
            ->name('users.suspend');
        Route::patch('/users/{user}/activate', [AdminUserController::class, 'activate'])
            ->name('users.activate');
    });
});