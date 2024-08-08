<?php

require_once '../config/req_config';
// require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


#saving sata to db
function saveRequest($ip_address, $username, $password, $email) 
{
    global $connection;
    $query = $connection->prepare("INSERT INTO requests (ip_address, username, password, email)
    VALUES (:ip_address, :username, :password, :email)");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->bindParam(':username', $username, PDO::PARAM_STR);
    $query->bindParam(':password', $password, PDO::PARAM_STR);
    $query->bindParam(':email', $email, PDO::PARAM_STR);
    $query->execute();
}

function createResponse($status, $message, $data=[]){
    
    $response = ['status' => $status, 'message' => $message, 'data'=>$data];

    return json_encode($response);
}


function checkRequestLimit($ip_address){
    global $connection;
    $query = $connection->prepare("SELECT COUNT(*) FROM requests 
    WHERE ip_address = :ip_address AND request_time > DATE_SUB(NOW(), 
    INTERVAL 1 HOUR)");

    $query->bindParam(':ipaddress', $ip_address, PDO::PARAM_STR);
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

if($_SERVER['REQUEST_METHOD'] == 'POST') 
{

    if(!checkRequestLimit($_SERVER['REMOTE_ADDR'])) 
    {
        echo createResponse('error', 'Too many requests! Try again later.', []);
        exit;
    }

    if(!checkRequestTime($_SERVER['REMOTE_ADDR'])) 
    {
        echo createResponse('error', 'Request too common! Try again later.', []);
        exit;
    }

    //Check and process entered data
    $data = json_decode(file_get_contents('php://input'), true);
    if($data) 
    {

        $username = isset($data['username']) ? $data['username'] : '';
        $password = isset($data['password']) ? $data['password'] : '';
        $email = isset($data['email']) ? $data['email'] : '';
        $displayName = isset($data['displayName']) ? $data['displayName'] : '';
        $contactNumber = isset($data['contactNumber']) ? $data['contactNumber'] : '';
        $dob = isset($data['dob']) ? $data['dob'] : '';
        $interestCat = isset($data['InterestCat']) ? $data['interestCat'] : '';
        $fullName = isset($data['fullName']) ? $data['fullName'] : '';
        $aboutMe = isset($data['aboutMe']) ? $data['aboutMer'] : '';
        $webLink = isset($data['webLink']) ? $data['webLink'] : '';


        // ALL FIELDS: username, password, email, displayName, contactNumber, dob, interestCat, fullName, aboutMe, webLink

        if(!validateInput($username) || !validateInput($password) || !validateInput($email)) 
        {
            echo createResponse('error', 'You have entered incorrect information.');
            exit;
        }

        if(empty($username) OR empty($email) OR empty($password))
        {
            echo createResponse('error', 'All fields are mandatory on the form.');
            exit;
        }
        
        $encrypted_password = password_hash($password, PASSWORD_ARGON2ID, 
        [
            'memory_cost' => 2048,
            'time_cost'   => 4,
            'threads'     => 2,
        ]);
        $encrypted_email = xorEncrypt($email, 'secret_key');

        echo createResponse('success', 'Account registered successfully.', 
        [
            'username' => $username,
            'password' => $encrypted_password,
            'email' => $encrypted_email
        ]);
   
        saveRequest($_SERVER['REMOTE_ADDR'], $username, $encrypted_password, $encrypted_email);
    } 
    else 
    {
        echo createResponse('error', 'Wrong request.', []);
        exit;
    }
}

