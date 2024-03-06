<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SportEvent;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class SportEventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data = SportEvent::all();

        return response()->json(['data' => $data], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {

            $request->validate([
                'sportEvent' => 'nullable|string',
                'description' => 'nullable|string',
                'sport' => 'nullable|string',
            ]);

            $data = SportEvent::create($request->all());
            return response()->json(['data' => $data], 201);
        } catch (ValidationException $e) {
            return response()->json(['error' => $e->validator->errors()]);

        } catch (QueryException $e) {
            // Handle database errors
            return response()->json(['error' => 'Database error', $e], 500);

        } catch (\Exception $e) {
            return response()->json(['error', 'Something went wrong', $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(SportEvent $sportEvent)
    {
        //
        return response()->json(['data', $sportEvent], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SportEvent $sportEvent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SportEvent $sportEvent)
    {
        //
        try {
            $request->validate([
                'sportEvent' => 'nullable|string',
                'description' => 'nullable|string',
                'sport' => 'nullable|string',
            ]);

            $sportEvent->fill($request->except('sportEventId'))->save();

            return response()->json(['data' => $sportEvent], 200);

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
    public function destroy(SportEvent $sportEvent)
    {
        //
        try {
            $sportEvent->delete();

            // Return a success response
            return response()->json(['data' => $sportEvent], 200);

        } catch (\Throwable $e) {
            // Handle other unexpected errors
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
