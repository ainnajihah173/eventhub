<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOrganizerApproved
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // 1. Check if the current route is already the 'pending' page
        // This prevents the infinite loop
        if ($request->routeIs('organizer.pending')) {
            return $next($request);
        }

        // 2. Redirect pending organizers
        if ($user && $user->role === 'organizer' && $user->status === 'pending') {
            return redirect()->route('organizer.pending');
        }

        return $next($request);
    }
}
