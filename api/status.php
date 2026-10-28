<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$apiKey = getenv('XPAY_API_KEY') ?: 'cpk_live_ex84lopcp2xexagmazz6za11';
$baseUrl = 'https://api.xpaybrasil.com/v1';

$id = $_GET['id'] ?? '';
if (!$id && isset($_SERVER['REQUEST_URI'])) {
    $parts = explode('/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    $id = end($parts);
}

if (!$id) {
    echo json_encode(['success' => false, 'status' => 'PENDING', 'data' => ['status' => 'PENDING']]);
    exit;
}

$ch = curl_init("{$baseUrl}/charge/" . urlencode($id));
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "X-API-KEY: {$apiKey}",
        "Content-Type: application/json"
    ],
    CURLOPT_TIMEOUT => 15
]);
$resText = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$json = json_decode($resText, true);
$charge = $json['data'] ?? $json ?? [];
$pStatus = strtoupper((string)($charge['paymentStatus'] ?? ''));
$cStatus = strtoupper((string)($charge['status'] ?? ''));

$isPaid = in_array($pStatus, ['PAID', 'RECIEVED', 'RECEIVED', 'APPROVED']) || in_array($cStatus, ['COMPLETED', 'PAID']);
$norm = $isPaid ? 'PAID' : 'PENDING';

echo json_encode([
    'success' => true,
    'status' => $norm,
    'data' => [
        'id' => $charge['id'] ?? $id,
        'status' => $norm,
        'paymentStatus' => $charge['paymentStatus'] ?? 'PROCESSING',
        'chargeStatus' => $charge['status'] ?? 'OPEN'
    ]
]);
