<?php
/**
 * Created by PhpStorm.
 * User: memo
 * Date: 13/03/19
 * Time: 12:12 AM
 */

if (!isset($_GET['id'])) {
    header('Location: index.html');
}

$id_donacion = $_GET['id'];

include "api/procesarDonacion.php";

if (completaDonacion($id_donacion, $folios)): ?>
    <head>
        <meta charset="UTF-8">
        <!--<meta name="viewport"
              content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">-->
        <meta name="viewport" content="width=690">
        <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/donar.css">
    <title>Cuervos Por Habesha</title>
    <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Semi+Condensed:400,700,900|Encode+Sans:400,700,900" rel="stylesheet">
    
    <style>
	.logo-1{
		position: absolute;
	}
		body{
			color: #fff;
			font-family: 'Encode Sans', sans-serif;
		}
		.card{
			margin-top: 120px;
		}
		.tx-gde{
			font-size: 1.4em;
			color: #fff;
			font-weight: 700;
		}
	</style>
    </head>
    <body>
    
    <a href="../../index.html" class="logo-1"><img src="../img/logo01.png" width="100%"></a>
<div class="fondo"></div>
    
    <div class="container pt-3">
        <div class="card">
            <div class="card-header">
                <h5>Sorteo #CuervosPorHabesha</h5>
            </div>
            <div class="card-body">
                <h3>¡Tu donación ha sido realizada exitosamente!</h3>
                <p>
                    El resultado del sorteo será anunciado el 15 de abril a las 21 hrs por medio de la cuenta de Instagram
                    de Luis Gerardo Méndez.
                </p>
                <h5>Aquí están tus boleto(s):</h5>
                <table id="tablaFolios" class="tx-gde">
                    <tbody class="table table-striped table-bordered">
                    <?php foreach ($folios as $folio): ?>
                        <tr>
                            <td>#CuervoHabesha<?= $folio['id'] ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>
        window.history.pushState({}, "Hide", '<?= $_SERVER['PHP_SELF'];?>');
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
    </script>
    <?php
    header('Location:index.html');
endif; ?>