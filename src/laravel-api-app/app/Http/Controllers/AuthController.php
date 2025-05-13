<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Notifications\Notifiable;


class AuthController extends Controller
{
    public function login(Request $request){
       $request->validate([
            'national_id' => 'required|string',
            'password' => 'required'
        ]);
        $user= User::where('national_id', $request->national_id)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => 'Invalid credentials'
            ];
        }
        $token = $user->createToken($user->first_name)->plainTextToken;
        return [
            'token' => $token,
            'user' => $user,
            'courses'=> $user->courses

        ];

    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => 'Logged out successfully'
        ];
    }
}