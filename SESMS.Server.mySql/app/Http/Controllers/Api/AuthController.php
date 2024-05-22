<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Check if user exists
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                return response()->json(['email' => "Couldn't find your Account"], 200);
            }

            // Verify password
            if (!Hash::check($request->password, $user->password)) {
                return response()->json(['password' => 'Wrong password. Try again'], 200);
            }

            // Generate JWT token
            $token = auth()->login($user);

            return response()->json(['token' => $token]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server Error', $e], 500);
        }
    }

}
