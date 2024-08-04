<?php


$servername = "localhost";
$username = "dev_diaries";
$password = "dev_diaries";
$dbname = "authentication";


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";


?>