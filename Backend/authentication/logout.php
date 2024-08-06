<?php

require_once '../config/req_config.php';

unset($_SESSION['username']);
unset($_SESSION['loggedIn']);

session_destroy();

exit;

?>