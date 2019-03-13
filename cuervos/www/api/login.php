<?php
setcookie('XDEBUG_SESSION', 'PHPSTORM');
ini_set('display_errors',1);
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
echo json_encode(["msg" => 1]);