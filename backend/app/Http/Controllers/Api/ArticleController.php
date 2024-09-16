<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ArticleService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ResponseHelper;

class ArticleController extends Controller
{
    private $articleService;

    public function __construct(ArticleService $articleService)
    {
        $this->articleService = $articleService;
    }

    public function getArticles(Request $request)
    {
        try {
            $response = $this->articleService->getArticles($request);

            if ($response['status']) {
                return ResponseHelper::sendResponse(
                    ['results' => $response['results']],
                    'Articles retrieved successfully'
                );
            } else {
                return ResponseHelper::sendError($response['message'], null, 500);
            }
        } catch (\Exception $exception) {
            return ResponseHelper::sendError($exception->getMessage(), null, 500);
        }
    }

    public function getAuthors(Request $request)
    {
        try {
            $response = $this->articleService->getAuthors($request);

            if ($response['status']) {
                return ResponseHelper::sendResponse(
                    ['results' => $response['results']],
                    'Authors retrieved successfully'
                );
            } else {
                return ResponseHelper::sendError($response['message'], null, 500);
            }
        } catch (\Exception $exception) {
            return ResponseHelper::sendError($exception->getMessage(), null, 500);
        }
    }

    public function getSources(Request $request)
    {
        try {
            $response = $this->articleService->getSources($request);

            if ($response['status']) {
                return ResponseHelper::sendResponse(
                    ['results' => $response['results']],
                    'Sources retrieved successfully'
                );
            } else {
                return ResponseHelper::sendError($response['message'], null, 500);
            }
        } catch (\Exception $exception) {
            return ResponseHelper::sendError($exception->getMessage(), null, 500);
        }
    }
}
