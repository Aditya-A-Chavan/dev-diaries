<?php


#imp function
function loadEnv($path) {
    if (!file_exists($path)) {
        throw new Exception('Environment file not found: ' . $path);
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach($lines as $line){
        if(strpos(trim($line), '#') === 0){
            continue;
        }

        list($name, $value) = explode('=', $line, 2);
        $_ENV[$name] = trim($value);
    }
}


loadEnv(__DIR__ . '/config.env');

$config = array(
    'db_hostname' => $_ENV['db_hostname'],
    'db_name' => $_ENV['db_name'],
    'db_username' => $_ENV['db_username'],
    'db_passwd' => $_ENV['db_passwd']
);

try{
    $connection = new PDO("pgsql:host=" . $config['db_hostname'] . ";dbname=" . $config['db_name'], $config['db_username'], $config['db_passwd']);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOExeption $e){
    die("connection failed, ye raha reason: " . $e);
}


?>