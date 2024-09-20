<?php

return [
//    'api_key' => env('NEWS_API'),
    'api_key' => '3603f3a972ea4558bf54fcd7513ece1e',
    'base_url' => 'https://newsapi.org/v2/',
    'endpoints' => [
        'top_headlines' => 'top-headlines',
    ],
    'options' => [
        'verify' => false,
        'timeout' => 30,
    ],
];
