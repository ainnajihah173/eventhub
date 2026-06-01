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

        // If they are an organizer but not active yet
        if ($user && $user->role === 'organizer' && $user->status === 'pending') {
            // Redirect them to the "Hold on" page
            return redirect()->route('organizer.pending');
        }

        return $next($request);
    }
}
