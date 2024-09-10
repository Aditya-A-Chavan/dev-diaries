
<?php


error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"), true);

    $otp = filter_var($data['otp']);
    $phonenumber = filter_var($data['phonenumber']);

    if($otp){
        $response = verify_otp($phonenumber, $otp);
        echo $response;
    }
}


function verify_otp($phonenumber, $otp){
    $url = "https://united-virgie-harshal-67d93943.koyeb.app/authentication/verify_otp";

    $payload = [
        'phonenumber' => $phonenumber,
        'otp' => $otp
    ];

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);  

    echo $response;

    curl_close($ch);

    return $response;
}


?>