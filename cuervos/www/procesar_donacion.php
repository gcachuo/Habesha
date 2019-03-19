<?php
/**
 * Created by PhpStorm.
 * User: memo
 * Date: 12/03/19
 * Time: 11:34 PM
 */

$return_url = $_SERVER['HTTP_HOST'] . preg_replace('/(.*)\/.+\.php/', '$1', $_SERVER['SCRIPT_NAME']);

if (!isset($_GET['id'])) {
    header('Location: index.html');
}
$id_donacion = $_GET['id'];

include "api/procesarDonacion.php";

$datos = obtenerDatos($id_donacion);

if (empty($datos)) {
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

            <?php if ($datos['metodo'] == 'paypal'): ?>
                <form class="ac-custom ac-radio ac-fill" name="_xclick"
                      action="https://paypal.com/cgi-bin/webscr"
                      method="post" target="_blank">
                    <input type="hidden" name="cmd"
                           value="<?= $datos['tipo'] == 'unica' ? '_donations' : '_xclick-subscriptions' ?>">
                    <input type="hidden" name="business" id="org" value="donaciones@proyectohabesha.org">
                    <input type="hidden" name="item_name"
                           value="DIMA_<?= $datos['tipo'] == 'unica' ? 'UNICO' : 'RECURRENTE' ?>">
                    <input type="hidden" name="currency_code" value="MXN">
                    <input type="hidden" name="amount" value="<?= $datos['cantidad'] ?>">
                    <input type="hidden" name="return"
                           value="http://<?= $return_url ?>/completar_donacion.php?id=<?= $id_donacion ?>">
                    <input type="image" src="../../img/btn-donar-2.png" border="0" name="submit"
                           id="donar-Normal" alt="Realice pagos con PayPal: es rápido, gratis y seguro.">
                    <input type="hidden" name="a3" value="<?= $datos['cantidad'] ?>">
                    <input type="hidden" name="p3" value="1">
                    <input type="hidden" name="t3" value="M">
                    <input type="hidden" name="src" value="1">
                    <input type="hidden" name="sra" value="1">
                </form>
            <?php else: ?>
            <input type="image" src="../../img/btn-donar-2.png" border="0" name="submit"
                   id="donar-Normal" onclick="pagar()">

                <script src="js/index.js"></script>
                <script src="../../banwire/checkout.js"></script>
                <script>
                    var SW = new BwGateway({
                        // Nombre de usuario de Banwire
                        user: 'habesha',
                        // Titulo de la entana
                        title: "Proyecto Habesha",
                        // Referencia
                        reference: 'donacion',
                        // Concepto
                        concept: 'Donacion',
                        infoMsg: 'Mensaje personalizado para el cliente',
                        // Moneda
                        currency: 'MXN',
                        // Customer information
                        cust: {
                            fname: "",
                            mname: "",
                            lname: "",
                            email: "",
                            phone: "",
                            addr: "",
                            city: "",
                            state: "",
                            country: "",
                            zip: ""
                        },
                        ship: {
                            addr: "",
                            city: "",
                            state: "",
                            country: "",
                            zip: ""
                        },
                        notifyUrl: "http://proyectohabesha.org/banwire/notify.php",
                        // Opciones de pago
                        paymentOptions: 'visa,mastercard,amex,spei', // visa,mastercard,amex,oxxo
                        // Mostrar o no pagina de resumen de compra
                        reviewOrder: true,
                        // Handler en caso de exito en el pago
                        successPage: '',
                        onSuccess: function (data) {
                            location.href = '<?= $return_url ?>/completar_donacion.php?id=<?= $id_donacion ?>';
                        },
                        // Pago pendiente OXXO
                        pendingPage: '',
                        onPending: function (data) {
                            console.log(data);
                            alert("El pago esta pendiente por ser efectuado");
                        },
                        // Pago challenge
                        challengePage: '',
                        onChallenge: function () {
                            alert("Pago enviado a validaciones de seguridad");
                        },
                        // Handler en caso de error en el pago
                        errorPage: '',
                        onError: function (error) {
                            console.log(error);
                        },
                        // Cuando cierra el popup sin completar el proceso
                        onCancel: function () {
                            console.log("Se cancelo el proceso");
                        }
                    });

                    function pagar() {
                        var total = '<?= $datos['cantidad'] ?>';
                        SW.pay({
                            // Total de la compra
                            total: total,
                            // Arreglo con los items de compra
                            items: [
                                {
                                    name: "Donación",
                                    qty: 1,
                                    desc: "Donación de " + total,
                                    unitPrice: total
                                }
                            ]
                        });
                    }
                </script>
            <?php endif; ?>
        </div>
    </div>
</div>
<script>
    window.history.pushState({}, "Hide", '<?php echo $_SERVER['PHP_SELF'];?>');
</script>