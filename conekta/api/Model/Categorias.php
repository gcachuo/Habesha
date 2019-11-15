<?php


namespace Model;


class Categorias
{
    public function __construct()
    {
        $mysql = new MySQL();
        $mysql->create_table('categorias', [
            new TableColumn('id', ColumnTypes::BIGINT, 20, true, null, true, true),
            new TableColumn('clave', ColumnTypes::VARCHAR, 10),
            new TableColumn('descripcion', ColumnTypes::VARCHAR, 255),
        ]);
    }

    public function selectCategoria($clave)
    {
        $sql = <<<sql
select * from categorias where clave=?
sql;
        $mysql = new MySQL();
        return $mysql->fetch_single($mysql->prepare($sql, ['s', $clave]));
    }
}