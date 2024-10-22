<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';

header('Content-Type: application/json');

function fetchAllBlogs() {
    global $connection;

    $query = "SELECT blog_id, blog_title, blog_content, image, created_at, user_name FROM blogs ORDER BY created_at DESC";
    $result = $connection->query($query);

    $blogs = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            if (!empty($row['image'])) {
                $row['image_url'] = 'http://localhost/dev-diaries/uploads/' . basename($row['image']);
            }
            $blogs[] = $row;
        }
    }
    return $blogs;
}

// Fetch all blogs and return as JSON
$blogs = fetchAllBlogs();
if (!empty($blogs)) {
    echo json_encode(['status' => 'success', 'data' => $blogs]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No blogs found']);
}

$connection->close();
?>
