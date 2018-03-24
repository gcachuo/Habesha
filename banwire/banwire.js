$(function () {
    $("#banwire-libre").keyup(function () {
        var allRadios = document.getElementsByName('banwire-Normal');
        var booRadio;
        var x = 0;
        for (x = 0; x < allRadios.length; x++) {

            allRadios[x].onclick = function () {
                if (booRadio == this) {
                    this.checked = false;
                    booRadio = null;
                } else {
                    booRadio = this;
                }
            };
        }
    });
    $("#btnPagarUnico").click(function (e) {
        e.preventDefault();
        pagar();
    });
    $("#btnPagarOxxo").click(function (e) {
        e.preventDefault();
        pagarOxxo();
    });
    $("#btnPagarRecurrente").click(function (e) {
        e.preventDefault();
        pagarRecurrente();
    });
});

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
    notifyUrl: "banwire/notify.php",
    // Opciones de pago
    paymentOptions: 'visa,mastercard,amex,spei', // visa,mastercard,amex,oxxo
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

var SWoxxo = new BwGateway({
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
    notifyUrl: "banwire/notify.php",
    // Opciones de pago
    paymentOptions: 'oxxo', // visa,mastercard,amex,oxxo
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
    var total = $("[name=banwire-Normal]:checked").val();
    if (total == null) {
        total = $("#banwire-libre").val();
    }
    SW.pay({
        // Total de la compra
        total: total,
        // Arreglo con los items de compra
        items: [
            {
                name: "Donación",
                qty: 1,
                desc: "Donacion de " + total,
                unitPrice: total
            }
        ]
    });
}

function pagarOxxo() {

    var total = $("[name=banwire-Normal]:checked").val();
    if (total == null) {
        total = $("#banwire-libre").val();
    }
    SWoxxo.pay({
        cust: {
            email: $("[name=email]").val()
        },
        // Total de la compra
        total: total,
        // Arreglo con los items de compra
        items: [
            {
                name: "Donación",
                qty: 1,
                desc: "Donacion de " + total,
                unitPrice: total
            }
        ]
    });
}

function pagarRecurrente() {
    var total = $("[name=banwire-Recurrente]:checked").val();
    if (total == null) {
        total = $("#banwire-libre-recurrente").val();
    }
    SW.pay({
        // Total de la compra
        total: total,
        // Arreglo con los items de compra
        items: [
            {
                name: "Donación",
                qty: 1,
                desc: "Donacion de " + total,
                unitPrice: total
            }
        ],
        recurring: {
            interval: "month"
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

