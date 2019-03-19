<?php
try {
    include "mysql.php";
    setcookie('XDEBUG_SESSION', 'PHPSTORM');
    ini_set('display_errors', 1);
    error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));

    parse_str($_POST['form'], $login);
    unset($_POST);

    $usuario = $login['usuario'];
    $password = $login['pass'];

    if (empty($usuario) or empty($password)) {
        throw new Exception('Complete todos los campos.');
    }

    $mysql = new mysql();
    $usuario = $mysql->single_row($mysql->query(<<<sql
select id,password from usuarios where usuario='$usuario';
sql
    ));

    if (!password_verify($password, $usuario['password'])) {
        throw new Exception('Los datos son incorrectos.');
    }

    echo json_encode(['id' => (int)$usuario['id']]);
} catch (DatabaseException $exception) {
    echo json_encode(['error' => 'Ocurrió un error', 'details' => $exception->getMessage()]);
} catch (Exception $exception) {
    echo json_encode(['error' => $exception->getMessage()]);
}