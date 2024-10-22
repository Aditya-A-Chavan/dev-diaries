<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"), true);

    $phonenumber = filter_var($data['phonenumber']);

    if($phonenumber){
        $response = send_otp($phonenumber);
        echo $response;
    }
}

function send_otp($phonenumber){
    $url = "http://13.48.25.155:9186/authentication/send_otp";

    $payload = json_encode(['phonenumber' => $phonenumber]);

    // Create a context for the POST request
    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => $payload,
            'ignore_errors' => true,  // Ignore HTTP errors to capture response
        ],
    ];

    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    if ($response === FALSE) {
        return "Error sending OTP.";
    }

    return $response;
}



?>
