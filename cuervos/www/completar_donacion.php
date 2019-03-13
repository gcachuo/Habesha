<?php
/**
 * Created by PhpStorm.
 * User: memo
 * Date: 13/03/19
 * Time: 12:12 AM
 */

$id_donacion = $_GET['id'];

include "api/procesarDonacion.php";

if (completaDonacion($id_donacion)): ?>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <link rel="stylesheet" href="css/index.css">
        <title>Cuervos Por Habesha</title>
    </head>
    <body>
    <div class="container pt-3">
        <div class="card">
            <div class="card-header">
                <h5>Sorteo #CuervosPorHabesha</h5>
            </div>
            <div class="card-body">
                <h3>Gracias por tu donación</h3>
            </div>
        </div>
    </div>
    <script>
        if (!localStorage.getItem('donante') || !localStorage.getItem('donacion')) {
            location.href = 'index.html';
        }
        localStorage.removeItem('donacion');
        localStorage.removeItem('donante');
    </script>
<?php else: ?>
    <script>
        localStorage.removeItem('donacion');
        localStorage.removeItem('donante');
        location.href = 'index.html';
    </script>
<?php endif; ?>