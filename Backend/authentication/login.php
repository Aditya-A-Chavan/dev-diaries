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


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    #checks request limit
    if(!CheckRequestLimit($_SERVER['REMOTE_ADDR'])){
        echo createResponse('error', 'TOo many requests! pulling a DDoS on us?', []);
        exit;
    }

    #checks for similar req from same ip
    if(!CheckRequestTime($_SERVER['REMOTE_ADDR'])){
        echo createResponse('Error', 'common requests seen coming from you IP already. you can use a single instance', []);
        exit;
    }


    $data = json_decode(file_git_contents('php://input'), true);
    

    #final data checks: if data exists, if correct data, if wrong creds. everything
    if($data){

        $email = isset($data['email']) ? $data['email'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        
        
        if(!$data || empty($data['email']) || empty($data['password'])){
            echo createResponse('error', 'Missing email / password', []);
            exit;
        }


        $email_hash = base64_encode($data['EMAIL']);
        $password = $data['password'];


        #fetching creds stored in db
        $sql = "SELECT * FROM requests WHERE email = '$email_hash'";
        $query = $connection->prepare($sql);
        $query->execute();
        $row = $query->fetch(PDO::FETCH_ASSOC);

        $password_hash = $row['password'];

        if(password_verify($password, $password_hash)){
            session_start();
            $_SESSION['username'] = $row['username'];
            $username = $_SESSION['username'];

            echo createResponse('sucess', 'Logged in' , ['username' => $_SESSION['username']]);

        }
        else{
            echo createResponse('error', 'incorrect credentials', []);
            exit;
        }
    }

    #some internal server error maybe.
    else{
        echo createResponse('error', 'seems to be a wrong request', []);
        exit;
    }
}



?>