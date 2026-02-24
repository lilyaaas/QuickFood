<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // User Registration (SPA Auth)
    public function register(Request $request)
    {
        // 1. Validate input
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:customer,driver,restaurant_owner',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Login the user immediately using Session guard
        Auth::login($user);

        return response()->json([
            'message' => 'Account created successfully',
            'user' => $user->only(['id', 'name', 'email', 'role'])
        ], 201);
    }

    // User Login (SPA Auth)
    public function login(Request $request)
    {
        // 1. Validate Input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // 2. Attempt to authenticate using the Session guard
        if (!Auth::attempt($request->only('email', 'password'))) {
            // 3. If authentication fails
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully',
            'user' => Auth::user()->only(['id','name','email','role']),
        ], 200);
    }

    // User Logout (SPA Auth)
    public function logout(Request $request)
    {
        // For SPA Auth, we will log out using the Session guard
        Auth::guard('web')->logout();
        
        // Invalidate the session and regenerate CSRF token
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully'
        ], 200);
    }
}