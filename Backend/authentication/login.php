<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


function createResponse($status, $message, $data = []){

    $response = [
        'status' => $status,
        'message' => $message,
        'data' => $data
    ];

    return json_encode($response);

}

function CheckRequestLimit($ip_address){
    global $connection;
    $query = $connection->prepare("SELECT COUNT(*) FROM requests 
    WHERE ip_address = :ip_address AND request_time > DATE_SUB(NOW(), 
    INTERVAL 1 HOUR)");

    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->execute();

    $result = $query->fetch(PDO::FETCH_ASSOC);

    
    if($result['COUNT(*)'] > 100){
        return false;
    }
    return true;

}



function CheckRequestTime($ip_address){
    global $connection;
    $query = $connection->prepare("SELECT request_time FROM requests 
    WHERE ip_address = :ip_address 
    ORDER BY request_time 
    DESC LIMIT 1");

    $query->bind_PAram(':ip_address', $ip_address, PDO::PARAM_STR);

    $query->execute();
    
    $result = $query->detch(PDO::FETCH_ASSOC);

    if($result){
        $last_request_time = strtotime($result['request_time']);
        $current_time = strtotime(date('Y-m-d H:i:s'));
        
        if($current_time - $last_request_time < 1){
            return False;
        }
    
    }
    return True;
}


function XORencrypt($input){
    return base64_encode($input);
}



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Uncomment these lines when you're ready to implement rate limiting
    /*
    if (!CheckRequestLimit($_SERVER['REMOTE_ADDR'])) {
        echo createResponse('error', 'Too many requests. Please try again later.', []);
        exit;
    }

    if (!CheckRequestTime($_SERVER['REMOTE_ADDR'])) {
        echo createResponse('error', 'Request frequency limit exceeded. Please wait before trying again.', []);
        exit;
    }
    */

    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data || !isset($data['email']) || !isset($data['password']) || empty($data['email']) || empty($data['password'])) {
        echo createResponse('error', 'Missing or invalid email/password', []);
        exit;
    }

    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo createResponse('error', 'Invalid email format', []);
        exit;
    }

    $email_hash = base64_encode($email);

    $sql = "SELECT * FROM requests WHERE email = ?";
    $stmt = $connection->prepare($sql);
    
    if (!$stmt) {
        error_log("Prepare failed: " . $connection->error);
        echo createResponse('error', 'An internal error occurred', []);
        exit;
    }

    $stmt->bind_param("s", $email_hash);
    
    if (!$stmt->execute()) {
        error_log("Execute failed: " . $stmt->error);
        echo createResponse('error', 'An internal error occurred', []);
        exit;
    }

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user) {
        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            echo createResponse('success', 'Logged in successfully', ['username' => $user['username']]);
        } else {
            echo createResponse('error', 'Incorrect email or password', []);
        }
    } else {
        echo createResponse('error', 'Incorrect email or password', []);
    }

    $stmt->close();
} else {
    echo createResponse('error', 'Invalid request method', []);
}

?>