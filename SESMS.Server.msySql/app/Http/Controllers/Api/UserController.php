<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = User::all();

        return response()->json(['data' => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        try {

            $request->validate([
                'userName' => 'nullable|string',
                'password' => 'nullable|string',
                'firstName' => 'nullable|string',
                'middleName' => 'nullable|string',
                'lastName' => 'nullable|string',
                'suffixName' => 'nullable|string',
                'phoneNumber' => 'nullable|string',
                'email' => 'required|email|unique:users,email',
                'userRole' => 'nullable|string',
                'isActive' => 'nullable|boolean',

            ]);

            $data = User::create($request->all());
            return response()->json(['data' => $data], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()]);
        } catch (\Exception $e) {
            return response()->json(['error', 'Something went wrong', $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return response()->json(['data', $user], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        try {
            $request->validate([
                'userName' => 'nullable|string',
                'password' => 'nullable|string',
                'firstName' => 'nullable|string',
                'middleName' => 'nullable|string',
                'lastName' => 'nullable|string',
                'suffixName' => 'nullable|string',
                'phoneNumber' => 'nullable|string',
                'email' => 'required|email',
                'userRole' => 'nullable|string',
                'isActive' => 'nullable|boolean',
            ]);

            // $user->update($request->except('userId'));

            $user->fill($request->except('userId'))->save();

            return response()->json(['data' => $user], 200);

        } catch (ValidationException $e) {
            // Handle validation errors
            return response()->json(['error' => $e->validator->errors()], 422);

        } catch (QueryException $e) {
            // Handle database errors
            return response()->json(['error' => 'Database error'], 500);

        } catch (\Exception $e) {
            // Handle other unexpected errors
            return response()->json(['error code' => $e], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        try {
            $user->delete();

            // Return a success response
            return response()->json(['data' => $user], 200);

        } catch (\Throwable $e) {
            // Handle other unexpected errors
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
