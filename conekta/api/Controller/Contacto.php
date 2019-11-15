<?php

namespace Controller;

use Model\Contactos;

class Contacto
{
    function suscribir()
    {
        $contacto = [
            "nombre" => $_POST['nombre'],
            "email" => $_POST['email']
        ];

        $Contactos = new Contactos();
        $id_contacto = $Contactos->insertContacto($contacto);
        return compact('id_contacto');
    }
}