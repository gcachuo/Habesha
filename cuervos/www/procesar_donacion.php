<?php
/**
 * Created by PhpStorm.
 * User: memo
 * Date: 12/03/19
 * Time: 11:34 PM
 */

if (isset($_GET['id'])):
    $id_donacion = $_GET['id'];

    include "api/procesarDonacion.php";

    $datos = obtenerDatos($id_donacion);

    if(empty($datos)){
        header('Location: index.html');
        die();
    }
    ?>
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

            <div>
                <h4><?= "$datos[nombre] $datos[apellidos]" ?></h4>
                <h5><?= $datos['correo'] ?></h5>
                <hr>
                <h6>Método de Pago: <?= $datos['metodo'] == 'paypal' ? 'PayPal' : 'Banwire' ?></h6>
                <h6>Tipo de donación: <?= $datos['tipo'] == 'unica' ? 'Única' : 'Recurrente' ?></h6>
                <h6>Cantidad: $<?= number_format($datos['cantidad'], 2) ?></h6>
                <hr>
            </div>

            <form class="ac-custom ac-radio ac-fill" name="_xclick"
                  action="https://www.sandbox.paypal.com/cgi-bin/webscr"
                  method="post" target="_blank">
                <input type="hidden" name="cmd" value="_donations">
                <input type="hidden" name="business" id="org" value="donaciones@proyectohabesha.org">
                <input type="hidden" name="item_name" value="DIMA_UNICO">
                <input type="hidden" name="currency_code" value="MXN">
                <input type="hidden" name="amount" value="200">
                <input type="hidden" name="return"
                       value="http://localhost/Habesha/cuervos/www/completar_donacion.php?id=<?= $id_donacion ?>">
                <input type="image" src="../../img/btn-donar-2.png" border="0" name="submit"
                       id="donar-Normal" alt="Realice pagos con PayPal: es rápido, gratis y seguro.">
            </form>
        </div>
    </div>
</div>
<script>
    window.history.pushState({}, "Hide", '<?php echo $_SERVER['PHP_SELF'];?>');
</script>
<?php
else:
    header('Location: index.html');
endif;