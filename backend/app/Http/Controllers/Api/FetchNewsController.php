<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\News;
use App\Models\Source;
use App\Services\NewsService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;
use App\Helpers\ResponseHelper;

class FetchNewsController extends Controller
{

    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function fetchNews(): JsonResponse
    {
        try {
            $successNewsAPI = $this->newsService->getFromNewsAPI();
            $successGuardian = $this->newsService->getFromGuardian();
            $successNyTimes = $this->newsService->getFromNyTimes();

            if ($successNewsAPI && $successGuardian && $successNyTimes) {
                return ResponseHelper::sendResponse(['success' => true], 'News fetched successfully');
            } else {
                return ResponseHelper::sendError('Failed to fetch news.', null, 500);
            }
        } catch (\Exception $e) {
            Log::error('Error in fetchNews: ' . $e->getMessage());
            return ResponseHelper::sendError('An error occurred while fetching news.', null, 500);
        }
    }

}
