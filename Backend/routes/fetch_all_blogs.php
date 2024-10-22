<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';

header('Content-Type: application/json');

// Function to fetch all blogs ordered by blog_id
function fetchAllBlogs() {
    global $connection;

    $query = "SELECT blog_id, blog_title, blog_content, image, created_at, user_name 
              FROM blogs ORDER BY blog_id DESC"; // Ordered by blog_id
    $result = $connection->query($query);

    $blogs = [];
    if ($result && $result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            // Convert binary image data to base64 string if an image exists
            if (!empty($row['image'])) {
                $row['image_url'] = 'data:image/jpeg;base64,' . base64_encode($row['image']);
                unset($row['image']); // Remove raw binary data to reduce payload size
            }
            $blogs[] = $row;
        }
    }
    // echo($blogs);
    return $blogs;
}

try {
    $blogs = fetchAllBlogs();
    if (!empty($blogs)) {
        echo json_encode(['status' => 'success', 'data' => $blogs]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No blogs found']);
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Server error: ' . $e->getMessage()]);
} finally {
    $connection->close();
}
?>
