<?php
/**
 * Created by PhpStorm.
 * User: memo
 * Date: 12/03/19
 * Time: 11:51 PM
 */

include "mysql.php";

setcookie('XDEBUG_SESSION', 'PHPSTORM');
ini_set('display_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));

function obtenerDatos($id_donacion)
{
    try {
        $sql = <<<sql
select *  from donaciones
inner join donantes on id_donante=donantes.id
where donaciones.id=$id_donacion and donaciones.estatus='CREADA'
sql;

        $mysql = new mysql();
        return $mysql->single_row($mysql->query($sql));
    } catch (DatabaseException $exception) {

    }
}

function completaDonacion($id_donacion)
{
    try {
        $mysql = new mysql();

        $sql = <<<sql
select count(1) count from donaciones where id=$id_donacion and estatus='CREADA';
sql;

        $count = (int)$mysql->single_row($mysql->query($sql), 'count');

        if (!$count) {
            return false;
        }

        $sql = <<<sql
update donaciones set estatus='COMPLETA' where id=$id_donacion and estatus='CREADA';
sql;

        $mysql->query($sql);
        return true;
    } catch (DatabaseException $exception) {
        return false;
    }
}