<?php


namespace Model;


class Contactos
{
    public function __construct()
    {
        $mysql = new MySQL();
        $mysql->create_table('contactos', [
            new TableColumn('id', ColumnTypes::BIGINT, 20, true, null, true, true),
            new TableColumn('id_categoria', ColumnTypes::BIGINT, 20),
            new TableColumn('id_ciudad', ColumnTypes::BIGINT, 20),
            new TableColumn('fecha_registro', ColumnTypes::TIMESTAMP, 0, false, 'current_timestamp'),
            new TableColumn('tipo_contacto', ColumnTypes::INT, 1, false, 1),
            new TableColumn('titulo_acad', ColumnTypes::VARCHAR, 5),
            new TableColumn('nombre', ColumnTypes::VARCHAR, 100),
            new TableColumn('apellido_paterno', ColumnTypes::VARCHAR, 100),
            new TableColumn('apellido_materno', ColumnTypes::VARCHAR, 100),
            new TableColumn('puesto', ColumnTypes::VARCHAR, 100),
            new TableColumn('agencia', ColumnTypes::VARCHAR, 100),
            new TableColumn('email', ColumnTypes::VARCHAR, 255),
            new TableColumn('telefono', ColumnTypes::VARCHAR, 255),
            new TableColumn('mailchimp', ColumnTypes::BIT, 1, false, "b'1'"),
        ]);
    }

    public function insertContacto(array $contacto)
    {
        $Categorias = new Categorias();
        $categoria = $Categorias->selectCategoria('PI');

        $sql = <<<sql
insert into contactos(nombre,email,id_categoria,id_ciudad,apellido_paterno,telefono) values (?,?,?,?,?,?)
sql;
        $mysql = new MySQL();
        $mysql->prepare($sql, [
            'ssiiss',
            $contacto['nombre'],
            $contacto['email'],
            $categoria['id'],
            1,
            '',
            ''
        ]);
        return $mysql->insertID();
    }
}