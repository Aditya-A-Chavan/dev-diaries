<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';

session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data == null) {
        echo("No JSON data was recieved.");
        $blogcontent = "content";
        $blogtitle = "title";
    } else {
        $blogtitle = filter_var($data['blogtitle'], FILTER_SANITIZE_STRING);
        $blogcontent = filter_var($data['blogcontent'], FILTER_SANITIZE_STRING);
    }

    // $blogtitle = filter_var($data['blogtitle']);
    // $blogcontent = isset($data['blogcontent']) ? $data['blogcontent'] : '';
    // $blogcontent = filter_var($data['blogcontent']);
    $image = null;

    if(isset($_SESSION['username'])){
        $username = $_SESSION['username'];
    } else {
        $username = "example_user";
        echo("No username in session.");
    }

    if(isset($_FILES['blogimage']) && $_FILES['blogimage']['tmp_name']){
        
        $image = base64_encode(file_get_contents($_FILES['blogimage']['tmp_name']));
    }
    
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