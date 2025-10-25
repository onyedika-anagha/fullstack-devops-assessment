<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $forms = $request->user()->forms()->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $forms,
            'message' => 'Forms retrieved successfully'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'form_structure' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'data' => $validator->errors()
            ], 422);
        }

        $form = $request->user()->forms()->create([
            'title' => $request->title,
            'description' => $request->description,
            'form_structure' => $request->form_structure,
        ]);

        return response()->json([
            'success' => true,
            'data' => $form,
            'message' => 'Form created successfully'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $form = $request->user()->forms()->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $form,
            'message' => 'Form retrieved successfully'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'form_structure' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'data' => $validator->errors()
            ], 422);
        }

        $form = $request->user()->forms()->findOrFail($id);
        
        $form->update([
            'title' => $request->title,
            'description' => $request->description,
            'form_structure' => $request->form_structure,
        ]);

        return response()->json([
            'success' => true,
            'data' => $form,
            'message' => 'Form updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $form = $request->user()->forms()->findOrFail($id);
        $form->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Form deleted successfully'
        ]);
    }
}
