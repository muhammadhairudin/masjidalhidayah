<?php
// Test koneksi dan permission
$uploadDir = __DIR__ . '/../uploads/';
echo "<pre>";
echo "PHP Version: " . phpversion() . "\n";
echo "Upload directory: " . $uploadDir . "\n";
echo "Directory exists: " . (file_exists($uploadDir) ? 'Yes' : 'No') . "\n";
echo "Directory writable: " . (is_writable($uploadDir) ? 'Yes' : 'No') . "\n";
echo "Max upload size: " . ini_get('upload_max_filesize') . "\n";
echo "Post max size: " . ini_get('post_max_size') . "\n";
echo "</pre>";

// Test form
?>
<form method="post" action="index.php" enctype="multipart/form-data">
    <input type="file" name="foto">
    <input type="text" name="namaAnak" value="Test Name">
    <button type="submit">Test Upload</button>
</form> 