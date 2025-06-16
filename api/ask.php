<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Ganti dengan domain spesifik untuk keamanan
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents("php://input"), true);
$question = $input["question"] ?? "";

if (empty($question)) {
  echo json_encode([
    "error" => "Pertanyaan tidak boleh kosong."
  ]);
  exit;
}

// Ganti dengan API key OpenAI Anda
$apiKey = "Bearer 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"; // Jangan taruh ini di frontend

$data = [
  "model" => "gpt-3.5-turbo",
  "messages" => [
    ["role" => "user", "content" => $question]
  ]
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
  ],
  CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Tangani jika gagal terhubung atau API error
if ($httpcode !== 200) {
  echo json_encode([
    "error" => "Gagal mendapatkan jawaban dari AI. Kode: $httpcode",
    "detail" => $error,
    "raw" => $response
  ]);
  exit;
}

echo $response;
