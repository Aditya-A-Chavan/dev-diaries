<!-- forget password form -->

<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once '../config/req_config.php';
require_once '../config/dbconfig.php';


if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $data = json_decode(file_get_contents("php://input"), true);

    $phonenumber = filter_var($data['phone'], FILTER_SANITIZE_STRING);

    if($phonenumber){
        
    }
}




?>