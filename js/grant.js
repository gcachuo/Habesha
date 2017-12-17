window.onload = function () {
    $("input[type=radio]").click(function () {
        //$("input[type=radio]").removeClass("chk");
        if ($(this).hasClass("chk")) {
            $("form")[0].reset();
            ($(this).siblings("svg").children("path").attr("d",""));
            $("input[name=a3]").val(0);
            $("input[name=amount]").val(0);
        }
        $(this).toggleClass("chk");
    });


    $("#cien").click(function () {
        pago_Mensual();
    });
    $("#quinientos").click(function () {
        pago_Mensual();
    });
    $("#libre-Mensual").keyup(function () {
        pago_Mensual_Libre();
    });
    $("#donar-Mensual").prop("disabled", true).click(function () {
        esconde();
    });
    $("#seiscientos").click(function () {
        pago_Normal();
    });
    $("#mildoscientos").click(function () {
        pago_Normal();
    });
    $("#dosmil").click(function () {
        pago_Normal();
    });
    $("#libre-Normal").keyup(function () {
        pago_Normal_Libre();
    });
    $("#donar-Normal").prop("disabled", true).click(function () {
        esconde();
    });

    document.getElementById("doscientos").addEventListener('click', pago_Mensual, false);

    document.getElementById("doscientos").addEventListener('click', pago_Normal, false);


    /*pago_Mensual() cambia el valor monetario del elemento [input type="hidden" name="amount"] dependiendo de la cantidad que el usuario elije

      que son valores de  100, 200 y 500 para un pago mensual*/

    function pago_Mensual() {

        if ($("#cien").hasClass("chk")) {

            document.getElementById("valor-Mensual").value = document.getElementById("cien").value;

        } else if (document.getElementById("doscientos").checked) {

            $("#valor-Mensual").val(document.getElementById("doscientos").value);

        } else if (document.getElementById("quinientos").checked) {

            document.getElementById("valor-Mensual").value = document.getElementById("quinientos").value;

        }

        $("#libre-Mensual").val("");
        $("#donar-Mensual").attr("disabled",false);

    }


    /*pago_Mensual_Libre() continene una validaci�n por expresion regular que admite numeros enteros y solo 2 decimales en el [input type="number"]

      para mandar cualquier cantidad que el usuario elija en un pago mensual*/

    function pago_Mensual_Libre() {

        var elementos = document.getElementsByName("input");

        var numeros = new RegExp("^[0-9]+([.])?([0-9]?[0-9])?$");

        for (var i = 0; i < elementos.length; i++) {

            elementos[i].checked = false;

        }

        if ((numeros.test(document.getElementById("libre-Mensual").value) == false) || (document.getElementById("libre-Mensual").value == 0)) {

            document.getElementById("libre-Mensual").value = "";

            document.getElementById("donar-Mensual").disabled = true;

        } else {

            document.getElementById("donar-Mensual").disabled = false;

            document.getElementById("valor-Mensual").value = document.getElementById("libre-Mensual").value;

        }

    }


    /*pago_Normal() cambia el valor monetario del elemento [input type="hidden" name="a3"] dependiendo de la cantidad que el usuario elije

      que son valores de 150, 300 y 1000 para un pago unico*/

    function pago_Normal() {

        if (document.getElementById("doscientos").checked) {

            document.getElementById("valor-Total").value = document.getElementById("doscientos").value;

        } else if (document.getElementById("seiscientos").checked) {

            document.getElementById("valor-Total").value = document.getElementById("seiscientos").value;

        } else if (document.getElementById("mildoscientos").checked) {

            document.getElementById("valor-Total").value = document.getElementById("mildoscientos").value;

        } else if (document.getElementById("dosmil").checked) {

            document.getElementById("valor-Total").value = document.getElementById("dosmil").value;

        }

        document.getElementById("donar-Normal").disabled = false;

        document.getElementById("libre-Normal").value = "";

    }


    /*pago_Normal_Libre() continene una validaci�n por expresion regular que admite numeros enteros y solo 2 decimales en el [input type="number"]

      para mandar cualquier cantidad que el usuario elija en un pago unico*/

    function pago_Normal_Libre() {

        var elementos = document.getElementsByName("valor-Normal");

        var numeros = new RegExp("^[0-9]+([.])?([0-9]?[0-9])?$");

        for (var i = 0; i < elementos.length; i++) {

            elementos[i].checked = false;

        }

        if ((numeros.test(document.getElementById("libre-Normal").value) == false) || (document.getElementById("libre-Normal").value == 0)) {

            document.getElementById("libre-Normal").value = "";

            document.getElementById("donar-Normal").disabled = true;

        } else {

            document.getElementById("donar-Normal").disabled = false;

            document.getElementById("valor-Total").value = document.getElementById("libre-Normal").value;

        }

    }


    /*esconde() fue creado para esconder el correo de las donaciones del codigo http, su funcionamiento es agregar el correo cuando el usuario

      da click en cualquiera de los botones de donacion*/

    function esconde() {

        document.getElementById("org_1").value = "donaciones@proyectohabesha.org";

        document.getElementById("org").value = "donaciones@proyectohabesha.org";

    }

}