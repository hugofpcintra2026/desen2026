<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$apiKey = getenv('XPAY_API_KEY') ?: 'cpk_live_ex84lopcp2xexagmazz6za11';
$baseUrl = 'https://api.xpaybrasil.com/v1';

$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

$valStr = isset($body['value']) ? (string)$body['value'] : '20,00';
$valClean = preg_replace('/[^\d.,]/', '', $valStr);
if (strpos($valClean, ',') !== false) {
    $valClean = str_replace('.', '', $valClean);
    $valClean = str_replace(',', '.', $valClean);
}
$floatVal = floatval($valClean);
$amount = max(500, (int)round(($floatVal > 0 ? $floatVal : 20) * 100));

$phoneDigits = preg_replace('/\D/', '', isset($body['phone']) ? (string)$body['phone'] : '');
if (strlen($phoneDigits) >= 12 && substr($phoneDigits, 0, 2) === '55') {
    $phoneDigits = substr($phoneDigits, 2);
}
if (strlen($phoneDigits) !== 10 && strlen($phoneDigits) !== 11) {
    $phoneDigits = '11999999999';
}

function generateValidCpfPhp() {
    $n = [];
    for ($i = 0; $i < 9; $i++) $n[$i] = random_int(0, 9);
    $d1 = 0;
    for ($i = 0; $i < 9; $i++) $d1 += $n[$i] * (10 - $i);
    $d1 = ($d1 % 11) < 2 ? 0 : 11 - ($d1 % 11);
    $n[9] = $d1;
    $d2 = 0;
    for ($i = 0; $i < 10; $i++) $d2 += $n[$i] * (11 - $i);
    $d2 = ($d2 % 11) < 2 ? 0 : 11 - ($d2 % 11);
    $n[10] = $d2;
    return implode('', $n);
}

$taxId = generateValidCpfPhp();
$payload = [
    'amount' => $amount,
    'expiresIn' => 900,
    'externalId' => 'tim_' . $phoneDigits . '_' . time(),
    'customer' => [
        'name' => !empty($body['name']) ? $body['name'] : 'Cliente Recarga TIM',
        'email' => !empty($body['email']) ? $body['email'] : "cliente.{$phoneDigits}@recargatim.com.br",
        'phone' => $phoneDigits,
        'taxId' => $taxId
    ]
];

$ch = curl_init("{$baseUrl}/charge/pix");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        "X-API-KEY: {$apiKey}",
        "Content-Type: application/json"
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 20
]);
$resText = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$json = json_decode($resText, true);
if ($httpCode < 200 || $httpCode >= 300 || !$json) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $json['errors'][0]['description'] ?? ($json['message'] ?? 'Erro ao gerar PIX na XPay Brasil.')
    ]);
    exit;
}

$charge = $json['data'] ?? $json;
$txId = $charge['id'] ?? '';
$brCode = $charge['brCode'] ?? '';
$brCodeBase64 = $charge['brCodeBase64'] ?? '';

echo json_encode([
    'success' => true,
    'data' => [
        'id' => $txId,
        'transactionId' => $txId,
        'amount' => $charge['amount'] ?? $amount,
        'status' => $charge['status'] ?? 'PROCESSING',
        'paymentData' => [
            'transactionId' => $txId,
            'copyPaste' => $brCode,
            'qrCode' => $brCode,
            'qrCodeBase64' => $brCodeBase64,
            'qrCodeUrl' => $charge['url'] ?? ''
        ]
    ]
]);
