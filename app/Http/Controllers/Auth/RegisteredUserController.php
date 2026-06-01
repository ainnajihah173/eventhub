<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:user,organizer',
            // Organizer specific validation
            'org_name' => 'required_if:role,organizer|string|max:255',
            'id_proof' => 'required_if:role,organizer|file|mimes:pdf,jpg,png|max:2048',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            // Organizers start as 'pending'
            'status' => $request->role === 'organizer' ? 'pending' : 'active',
        ]);
        if ($request->role === 'organizer') {
            $path = $request->file('id_proof')->store('organizer_proofs', 'public');

            $user->organizerProfile()->create([
                'org_name' => $request->org_name,
                'id_proof_path' => $path,
                'approval_status' => 'pending',
            ]);
        }

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard'));
    }
}
