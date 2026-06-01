<?php

namespace App\Services\AI;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');

        // Dynamically fetch the free model name from your .env file
        $model = config('services.gemini.model', 'gemini-2.5-flash');
        $this->baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";
    }

    public function generateDescription(string $title, string $location): string
    {
        $prompt = "Write a short, professional, and exciting event description for an event titled '{$title}' happening at '{$location}'. Make it engaging and concise.";

        $response = Http::post("{$this->baseUrl}?key={$this->apiKey}", [
            'contents' => [
                ['parts' => [['text' => $prompt]]]
            ]
        ]);

        if ($response->successful()) {
            return $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Could not generate description.';
        }

        // Log errors to your local Laravel file if the API fails
        Log::error('Gemini API failed: ' . $response->body());

        return 'AI Assistant is currently unavailable.';
    }
}
