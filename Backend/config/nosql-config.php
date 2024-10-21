<?php
require 'vendor/autoload.php'; // Load Composer's autoloader

$client = new MongoDB\Client("mongodb+srv://adityachavan271:jxjSgtwDcbhPPAr0@dev-diaries-cluster-1.i527v.mongodb.net/?retryWrites=true&w=majority&appName=dev-diaries-cluster-1");

$db = $client->selectDatabase('blogs');

echo "Connected to MongoDB!";
?>
