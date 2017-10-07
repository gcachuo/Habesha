// basic configuration
var io_install_flash = false;
// do not install Flash
var io_install_stm = false;
// do not require install of Active X
var io_exclude_stm = 12;
// do not run Active X under IE 8 platforms
var io_enable_rip = true;
// collect Real IP information
var io_bb_callback = function (bb, isComplete) {
    // populate hidden form fields in both forms 13
    var login_field = $("#EBT_DEVICEPRINT");
    if (login_field) {
        login_field.val(bb);
    }
};

var SW = new BwGateway({
    // Quitar o establecer a false cuando pase a produccion
    sandbox: true,
    // Nombre de usuario de Banwire
    user: 'pruebasbw',
    // Titulo de la entana
    title: "Mi Comercio",
    // Referencia
    reference: 'testref01',
    // Concepto
    concept: 'pago de prueba',
    // Opcional: Moneda
    currency: 'MXN',
    // Opcional: Tipo de cambio definido por el comercio (En caso de seleccionar una moneda que requiera mostrar el tipo de cambio a MXN. Solo informativo). Ejemplo: 15.00
    exchangeRate: '',
    // Total de la compra
    total: "100.00",
    // Opcional: Meses sin intereses
    months: [3,6,9,12],
    // Arreglo con los items de compra
    items: [
        {
            name: "Articulo uno",
            qty: 1,
            desc: "Articulo de prueba numero uno",
            unitPrice: 10
        },
        {
            name: "Articulo dos",
            qty: 2,
            desc: "Articulo numero dos de prueba",
            unitPrice: 40
        },
        {
            name: "Otro articulo con nombre mas largo",
            qty: 2,
            desc: "Articulo numero tres de prueba con una descripcion larga",
            unitPrice: 40
        }
    ],
    cust: {
        fname: "Ricardo", //Nombre del comprador
        mname: "Gamba", //Apellido paterno del comprador
        lname: "Lavin", //Apeliido materno del comprador
        email: "prueba@banwire.com", //Email del comprador
        phone: "55555555", //Número telefónico del comprador
        addr: "Direccion 440", //Dirección del comprador (calle y número)
        city: "Mexico", //Ciudad del comprador
        state: "DF", //Estado del comprador (2 dígitos de acuerdo al formato ISO)
        country: "MEX", //País del comprador (3 dígitos de acuerdo al formato ISO)
        zip: "14145" //Código de postal del comprador
    },
    ship: {
        addr: "Direccion 440", //Dirección de envío
        city: "Mexico", //Ciudad de envío
        state: "DF", //Estado de envío (2 dígitos de acuerdo al formato ISO)
        country: "MEX", //País de envío (3 dígitos de acuerdo al formato ISO)
        zip: "14145" //Código de postal del envío
    },
    // Opciones de pago, por defecto es "all". Puede incluir varias opciones separadas por comas
    paymentOptions: 'all', // visa,mastercard,amex,oxxo,speifast,all
    // Mostrar o no pagina de resumen de compra
    reviewOrder: true,
    // Mostrar o no mostrar los campos de envio
    showShipping: true,
    // Solamente para pagos recurrentes o suscripciones
    recurring: {
        // Cada cuanto se ejecutará el pago "month","year" o un entero representando numero de días
        interval: "month",
        // Opcional: Limitar el número de pagos (si no se pone entonces no tendrá limite)
        limit: 10,
        // Opcional: Fecha del primer cargo (en caso de no especificar se ejecutará de inmediato)
        start: "2014-01-01", // Formaro YYYY-MM-DD
        // Opcional: En caso de que los pagos subsecuentes (después del primero)
        // tengan un monto distinto al inicial
        total: "50.00"
    },
    // URL donde se van a enviar todas las notificaciones por HTTP POST de manera asoncrónica
    notifyUrl: "https://www.mipagina.com/recibir.php",
    // Handler en caso de exito en el pago
    successPage: 'http://google.com',
    onSuccess: function(data){
        alert("¡Gracias por tu pago!")
    },
    // Pago pendiente OXXO
    pendingPage: 'http://yahoo.com',
    onPending: function(data){
        alert("El pago está pendiente por ser efectuado");
    },
    // Pago challenge
    challengePage: 'http://challenge.com',
    onChallenge: function(data){
        alert("Pago enviado a validaciones de seguridad");
    },
    // Handler en caso de error en el pago
    errorPage: 'http://facebook.com',
    onError: function(data){
        alert("Error en el pago");
    },
    // Cuando cierra el popup sin completar el proceso
    onCancel: function(data){
        console.log("Se cancelo el proceso");
    }
});

function pagar() {
    // Podemos pagar con los valores por defecto
    SW.pay();

    /* O podemos modificar los valores antes de efectuar el pago
    SW.pay({
        total: 500,
        concept: "Concepto nuevo"
    });
    */
}

function donar() {
    ajax("donacion", {EBT_DEVICEPRINT: $("#EBT_DEVICEPRINT").val()});
}

function donacion() {
    alert('completo');
}

function ajax(fn, post) {
    $.post("banwire/banwire.php",
        {
            fn: fn,
            post: post
        },
        function (result) {
            if (typeof result === 'string') {
                alert(result);
                console.error(result);
            }
            else
                window[fn](result);
        },
        'json'
    ).fail(function (result) {
            alert(result.responseText);
            console.error(result.responseText);
        }
    );
}

