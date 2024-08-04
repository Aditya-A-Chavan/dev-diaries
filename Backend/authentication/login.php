<?php

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


function createResponse($status, $mesage, $data = []){

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

    }
}


?>