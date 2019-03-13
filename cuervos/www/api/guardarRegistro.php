<?php
try {
    include "mysql.php";

    setcookie('XDEBUG_SESSION', 'PHPSTORM');
    ini_set('display_errors', 1);
    error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));

    parse_str($_POST['form'], $registro);

    if (empty($registro['correo'])) {
        throw new Exception('Complete todos los campos.');
    }

    $mysql = new mysql();
    $query = $mysql->query("
insert ignore into folios(nombre,apellidos,telefono,correo,ciudad,estado,pais) values ('$registro[nombre]','$registro[apellidos]','$registro[telefono]','$registro[correo]','$registro[ciudad]','$registro[estado]','$registro[pais]');
");

    $id = $mysql->last_insert_id();

    if (!$id) {
        $id = $mysql->single_row($mysql->query("select id from folios where correo='$registro[correo]'"), 'id');
    }

    echo json_encode(['id' => (int)$id]);
} catch (Exception $exception) {
    echo json_encode(['error' => 'Ocurrió un error', 'details' => $exception->getMessage()]);
}