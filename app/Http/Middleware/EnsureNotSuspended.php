<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNotSuspended
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->status === 'suspended') {
            auth()->guard()->logout();
            return redirect()->route('login')
                ->withErrors(['email' => 'Your account has been suspended.']);
        }

        return $next($request);
    }
}