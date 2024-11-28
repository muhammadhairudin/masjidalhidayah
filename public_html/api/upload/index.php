<?php
// Error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', '/home/masjida5/logs/php_error.log');

// Log semua request
error_log("========= NEW REQUEST =========");
error_log("Time: " . date('Y-m-d H:i:s'));
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content Type: " . $_SERVER['CONTENT_TYPE']);
error_log("Content Length: " . $_SERVER['CONTENT_LENGTH']);

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Content-Type: application/json');

// Di awal file
error_log("=== Test Log ===");
error_log("Time: " . date('Y-m-d H:i:s'));

try {
    // Log raw input
    error_log("Raw POST: " . file_get_contents('php://input'));
    error_log("FILES: " . print_r($_FILES, true));
    error_log("POST: " . print_r($_POST, true));

    // Cek direktori upload
    $uploadDir = __DIR__ . '/../uploads/';
    error_log("Upload Directory: " . $uploadDir);
    error_log("Directory exists: " . (file_exists($uploadDir) ? 'Yes' : 'No'));
    error_log("Directory writable: " . (is_writable($uploadDir) ? 'Yes' : 'No'));
    
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
        error_log("Created directory: " . $uploadDir);
    }

    // Validasi file upload
    if (empty($_FILES['foto'])) {
        throw new Exception('No file uploaded');
    }

    $file = $_FILES['foto'];
    error_log("File details: " . print_r($file, true));

    // Validasi file error
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Upload error: ' . $file['error']);
    }

    // Generate filename
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $fileName = time() . '_' . uniqid() . '.' . $extension;
    $targetPath = $uploadDir . $fileName;

    // Move file
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        error_log("Failed to move file: " . error_get_last()['message']);
        throw new Exception('Failed to move uploaded file');
    }

    chmod($targetPath, 0644);
    error_log("File uploaded successfully: " . $targetPath);

    // Prepare response
    $response = [
        'status' => 'success',
        'message' => 'Upload successful',
        'data' => [
            'namaAnak' => $_POST['namaAnak'] ?? '',
            'tanggalLahir' => $_POST['tanggalLahir'] ?? '',
            'namaAyah' => $_POST['namaAyah'] ?? '',
            'namaIbu' => $_POST['namaIbu'] ?? '',
            'noTelp' => $_POST['noTelp'] ?? '',
            'alamat' => $_POST['alamat'] ?? '',
            'fotoUrl' => '/api/uploads/' . $fileName
        ]
    ];

    error_log("Sending response: " . json_encode($response));
    echo json_encode($response);

} catch (Exception $e) {
    error_log("Error occurred: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} 