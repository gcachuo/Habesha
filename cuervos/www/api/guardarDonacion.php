<?php
/**
 * Created by PhpStorm.
 * User: memo
 * Date: 12/03/19
 * Time: 11:18 PM
 */
try {
    include "mysql.php";

    setcookie('XDEBUG_SESSION', 'PHPSTORM');
    ini_set('display_errors', 1);
    error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));

    parse_str($_POST['form'], $registro);

    $donacion = $registro['donacion'];
    $tipo = (string)$donacion['tipo'];
    $cantidad = (int)$donacion['cantidad'];
    $metodo = (string)$donacion['metodo'];

    $mysql = new mysql();
    $query = $mysql->query("
replace into donaciones(id_donante,tipo,cantidad,metodo) values ($donacion[id_donante],'$tipo',$cantidad,'$metodo')
");

    $id = $mysql->last_insert_id();

    if (!$id) {
        $id = $mysql->single_row($mysql->query("select id from donaciones where id_donante='$donacion[id_donante]'"), 'id');
    }

    echo json_encode(['id' => (int)$id]);
} catch (DatabaseException $exception) {
    echo json_encode(['error' => 'Ocurrió un error', 'details' => $exception->getMessage()]);
} catch (Exception $exception) {
    echo json_encode(['error' => $exception->getMessage()]);
}