<?php


$servername = "localhost";
$username = "dev_diaries";
$password = "dev_diaries";
$dbname = "authentication";


$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}
// echo "Connected successfully";


?>