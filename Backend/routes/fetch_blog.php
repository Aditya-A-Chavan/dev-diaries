<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';

header('Content-Type: application/json');

function fetchBlogs() {
    global $connection;

    $query = "SELECT blog_title, blog_content, created_at FROM blogs ORDER BY created_at DESC";
    $result = $connection->query($query);

    if ($result) {
        $blogs = array();
        while ($row = $result->fetch_assoc()) {
            $row['blog_content'] = substr($row['blog_content'], 0, 100) . '...';
            
            $blogs[] = $row;
        }
        return $blogs;
    } else {
        return null;
    }
}

$blogs = fetchBlogs();

if ($blogs !== null) {
    echo json_encode(['status' => 'success', 'data' => $blogs]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to fetch blogs']);
}

$connection->close();
?>