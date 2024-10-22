<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';

header('Content-Type: application/json');

function fetchBlogById($id) {
    global $connection;

    $query = "SELECT blog_title, blog_content, image, created_at FROM blogs WHERE blog_id = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result) {
        return $result->fetch_assoc();
    } else {
        return null;
    }
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $blog = fetchBlogById($id);

    if ($blog !== null) {
        // Convert image to base64 if it exists
        if (!empty($blog['image'])) {
            $blog['image'] = 'data:image/jpeg;base64,' . base64_encode($blog['image']);
        }
        echo json_encode(['status' => 'success', 'data' => $blog]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Blog not found']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'No ID provided']);
}

$connection->close();
?>
