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
    // Test mode, remove when going to production mode
    sandbox: true,
    // Nombre de usuario de Banwire
    user: 'pruebasbw',
    // Titulo de la entana
    title: "Proyecto Habesha",
    // Referencia
    reference: 'testref01',
    // Concepto
    concept: 'pago de prueba',
    infoMsg: 'Mensaje personalizado para el cliente',
    // Moneda
    currency: 'MXN',
    // Customer information
    cust: {
        fname: "",
        mname: "",
        lname: "",
        email: "prueba@gmail.com",
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
    notifyUrl: "https://test.banwire.com/sw_ex/response.php",
    // Opciones de pago
    paymentOptions: 'all', // visa,mastercard,amex,oxxo
    // Mostrar o no pagina de resumen de compra
    reviewOrder: true,
    // Handler en caso de exito en el pago
    successPage: '',
    onSuccess: function (data) {
        console.log("Pago correcto");
        console.log(data);
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
    SW.pay({
        // Total de la compra
        total: $("[name=banwire-Normal]:checked").val(),
        // Arreglo con los items de compra
        items: [
            {
                name: "Donación",
                qty: 1,
                desc: "Donacion de " + $("[name=banwire-Normal]:checked").html(),
                unitPrice: $("[name=banwire-Normal]:checked").val()
            }
        ]//,
        /*
            recurring: {
                interval: "month",
                //total: 2,
        //start: "2015-01-04",
                limit: "10"
            }*/
    });
}

function pagarRecurrente() {
    SW.pay({
        // Total de la compra
        total: $("[name=banwire-Normal]:checked").val(),
        // Arreglo con los items de compra
        items: [
            {
                name: "Donación",
                qty: 1,
                desc: "Donacion de " + $("[name=banwire-Normal]:checked").html(),
                unitPrice: $("[name=banwire-Normal]:checked").val()
            }
        ],
        recurring: {
            interval: "month",
            //total: 2,
            //start: "2015-01-04",
            limit: "10"
        }
    });
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

