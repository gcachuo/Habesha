window.onload = function(){
    document.getElementById("cien").addEventListener('click',pago_Mensual,false);
    document.getElementById("doscientos").addEventListener('click',pago_Mensual,false);
    document.getElementById("quinientos").addEventListener('click',pago_Mensual,false);
    document.getElementById("libre-Mensual").addEventListener('keyup',pago_Mensual_Libre,false);
    document.getElementById("cientocincuenta").addEventListener('click',pago_Normal,false);
    document.getElementById("trescientos").addEventListener('click',pago_Normal,false);
    document.getElementById("mil").addEventListener('click',pago_Normal,false);
    document.getElementById("libre-Normal").addEventListener('keyup',pago_Normal_Libre,false);
    document.getElementById("donar-Mensual").addEventListener('click',esconde,false);
    document.getElementById("donar-Normal").addEventListener('click',esconde,false);
    document.getElementById("donar-Mensual").disabled = true;
    document.getElementById("donar-Normal").disabled = true;
    
    /*pago_Mensual() cambia el valor monetario del elemento [input type="hidden" name="amount"] dependiendo de la cantidad que el usuario elije
      que son valores de  100, 200 y 500 para un pago mensual*/
    function pago_Mensual(){
        if(document.getElementById("cien").checked){
            document.getElementById("valor-Mensual").value = document.getElementById("cien").value;
        }else if (document.getElementById("doscientos").checked){
            document.getElementById("valor-Mensual").value = document.getElementById("doscientos").value;
        }else if (document.getElementById("quinientos").checked){
            document.getElementById("valor-Mensual").value = document.getElementById("quinientos").value;
        }
        document.getElementById("libre-Mensual").value = "";
        document.getElementById("donar-Mensual").disabled = false;
    }

    /*pago_Mensual_Libre() continene una validación por expresion regular que admite numeros enteros y solo 2 decimales en el [input type="number"]
      para mandar cualquier cantidad que el usuario elija en un pago mensual*/
    function pago_Mensual_Libre(){
        var elementos = document.getElementsByName("input");
        var numeros = new RegExp("^[0-9]+([.])?([0-9]?[0-9])?$");
        for(var i=0;i<elementos.length;i++){
            elementos[i].checked = false;
        }
        if((numeros.test(document.getElementById("libre-Mensual").value) == false) || (document.getElementById("libre-Mensual").value == 0)){
            document.getElementById("libre-Mensual").value = "";
            document.getElementById("donar-Mensual").disabled = true; 
        }else{
            document.getElementById("donar-Mensual").disabled = false;
            document.getElementById("valor-Mensual").value = document.getElementById("libre-Mensual").value;
        }
    }
    
    /*pago_Normal() cambia el valor monetario del elemento [input type="hidden" name="a3"] dependiendo de la cantidad que el usuario elije
      que son valores de 150, 300 y 1000 para un pago unico*/
    function pago_Normal(){
        if(document.getElementById("cientocincuenta").checked){
            document.getElementById("valor-Total").value = document.getElementById("cientocincuenta").value;
        }else if (document.getElementById("trescientos").checked){
            document.getElementById("valor-Total").value = document.getElementById("trescientos").value;
        }else if (document.getElementById("mil").checked){
            document.getElementById("valor-Total").value = document.getElementById("mil").value;
        }
        document.getElementById("donar-Normal").disabled = false;
        document.getElementById("libre-Normal").value = "";
    }
    
    /*pago_Normal_Libre() continene una validación por expresion regular que admite numeros enteros y solo 2 decimales en el [input type="number"]
      para mandar cualquier cantidad que el usuario elija en un pago unico*/
    function pago_Normal_Libre(){
        var elementos = document.getElementsByName("valor-Normal");
        var numeros = new RegExp("^[0-9]+([.])?([0-9]?[0-9])?$");
        for(var i=0;i<elementos.length;i++){
            elementos[i].checked = false;
        }
        if((numeros.test(document.getElementById("libre-Normal").value) == false) || (document.getElementById("libre-Normal").value == 0)){
            document.getElementById("libre-Normal").value = "";
            document.getElementById("donar-Normal").disabled = true; 
        }else{
            document.getElementById("donar-Normal").disabled = false;
            document.getElementById("valor-Total").value = document.getElementById("libre-Normal").value;
        }
    }
    
    /*esconde() fue creado para esconder el correo de las donaciones del codigo http, su funcionamiento es agregar el correo cuando el usuario
      da click en cualquiera de los botones de donacion*/
    function esconde(){
        document.getElementById("org_1").value = "donaciones@proyectohabesha.org";
        document.getElementById("org").value = "donaciones@proyectohabesha.org";
    }
}