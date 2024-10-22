<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Access form fields directly from $_POST
    $blogtitle = filter_var($_POST['blogtitle']);
    $blogcontent = filter_var($_POST['blogcontent']);

    $image = null;

    // Check if the user is logged in
    if (isset($_SESSION['username'])) {
        $username = $_SESSION['username'];
    } else {
        $username = "example_user";
        echo("No username in session.");
    }

    // Handle the file upload
    if (isset($_FILES['blogimage']) && $_FILES['blogimage']['tmp_name']) {
        $image = (file_get_contents($_FILES['blogimage']['tmp_name']));
    }

    // Call a function to save the blog (assuming saveRequest is a function)
    saveRequest($blogcontent, $blogtitle, $image, $username);
}



function saveRequest($blogcontent, $blogtitle, $image, $username){
    global $connection;

    $query = $connection->prepare("INSERT INTO blogs (blog_title, blog_content, image, user_name) VALUES (?, ?, ?, ?)");

    // $username = 'example_user'; 

    if($image){
        $query->bind_param('ssss', $blogtitle, $blogcontent, $image, $username);
    } else {
        $query->bind_param('sss', $blogtitle, $blogcontent, $username);
    }

    $query->execute();

    if($query->affected_rows > 0){
        echo "Blog saved successfully!";
    } else {
        echo "Error saving blog: " . $query->error;
    }

    $query->close();
}
?>