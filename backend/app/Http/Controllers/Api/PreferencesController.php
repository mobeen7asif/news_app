<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\PreferencesService;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;

class PreferencesController extends Controller
{
    private $preferencesService;

    public function __construct(PreferencesService $preferencesService)
    {
        $this->preferencesService = $preferencesService;
    }

    /**
     * Get all authors and sources for the preferences.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPreferencesPageResources(Request $request)
    {
        try {
            $resources = $this->preferencesService->getPreferencesPageResources($request->user());

            return ResponseHelper::sendResponse([
                'results' => $resources,
            ], 'Preferences page resources retrieved successfully');
        } catch (\Exception $e) {
            return ResponseHelper::sendError('Failed to retrieve preferences page resources.', null, 500);
        }
    }

    public function savePreferences(Request $request)
    {
        try {
            $this->preferencesService->savePreferences($request->user(), $request->all());

            return ResponseHelper::sendResponse([], 'Preferences saved successfully');
        } catch (\Exception $e) {
            return ResponseHelper::sendError('Failed to save preferences.', null, 500);
        }
    }
}
