<?php

namespace App\Console\Commands;

use App\Services\NewsService;
use Illuminate\Console\Command;

class FetchNewsCommand extends Command
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        parent::__construct();
        $this->newsService = $newsService;
    }

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch news from given sources and store in local database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sources = [
            'news api' => 'getFromNewsAPI',
            'the guardian' => 'getFromGuardian',
            'new york times' => 'getFromNyTimes',
        ];

        foreach ($sources as $sourceName => $method) {
            $this->fetchNewsFromSource($sourceName, $method);
        }

        return 0;
    }

    private function fetchNewsFromSource(string $sourceName, string $method)
    {
        $this->info("Fetching data from {$sourceName} and saving to local database");
        
        $result = $this->newsService->$method();
        
        $message = $result 
            ? "Successfully fetched and saved news from {$sourceName}"
            : "Failed to fetch or save news from {$sourceName}";
        
        $this->info($message);
    }
}
