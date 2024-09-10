<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


function createResponse($status, $message){

    $response = [
        'status' => $status,
        'message' => $message,
    ];

    return json_encode($response);

}

function XORencrypt($input){
    return base64_encode($input);
}



if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents('php://input'), true);

    if($data){
        $email = filter_var($data['email']);
        $newPass = filter_var($data['newPass']);

        $encrypted_password = password_hash($newPass, PASSWORD_ARGON2ID,
        [
            'memory_cost' => 2048,
            'time_cost' => 4,
            'threads' => 2,
        ]);
        $encrypted_email = XORencrypt($email, 'secret_key');
        
        echo createResponse('success', 'Account recovered successfully.');

        $sql = "UPDATE requests SET password = ? WHERE email = ?";
        $stmt = $connection->prepare($sql);

        if(!$stmt){
            error_log("Prepare failed: " . $connection->error);
            echo createResponse('error', 'An internal error occurred', []);
            exit;
        }

        $stmt->bind_param("ss", $encrypted_password, $encrypted_email);
        
        if (!$stmt->execute()) {
            error_log("Execute failed: " . $stmt->error);
            echo createResponse('error', 'An internal error occurred', []);
            exit;
        }

        $stmt->close();

        return true;
        
    }
}



?>