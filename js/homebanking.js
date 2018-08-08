//Declaración de variables
var nombreUsuario = "Matias De Bonis";
var saldoCuenta = 3000;
var limiteExtraccion = 1000;
var dinero = 0;
var cuentaAmiga1= 1234567;
var cuentaAmiga2 = 7654321;
//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
}

//Se verifica la sesion del usuario
iniciarSesion();

//Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
    var extAnt = limiteExtraccion;
    limiteExtraccion = parseInt(prompt("Ingrese nuevo limite de extracción"));
    alert("Limite de extraccion anterior" + extAnt + "\nNuevo limite de extracción" + limiteExtraccion);
    actualizarLimiteEnPantalla();
}

//Funcion de extracción de dinero
function extraerDinero() {
    var dineroAnt = saldoCuenta;
    dinero = parseInt(prompt("ingrese cantidad a extraer (multiplos de 100)"));
    if(checkNull() === true && checkLimite() === true && checkBillete() === true && checkSaldo() === true ) {
        restarDinero(dinero);
        alert("Saldo anterior: " + dineroAnt + "\nDinero extraido: " + dinero + "\nSaldo actual: " + saldoCuenta);
        actualizarSaldoEnPantalla();
    }
}

//Funcion para deposito de dinero
function depositarDinero() {
    var dineroAnt = saldoCuenta;
    dinero = parseInt(prompt("ingese cantidad a depositar"));
    sumarDinero(dinero);
    alert("Saldo anterior: " + dineroAnt + "\nDinero depositado: " + dinero + "\nSaldo actual: " + saldoCuenta);
    actualizarSaldoEnPantalla();
}

//Funcion que selecciona el servicio deseado
function pagarServicio() {
    var pagoSelec = prompt("Ingresá el numero que corresponde al servicio que querés pagar \n 1. Agua \n 2. Luz \n 3.Internet \n 4. Teléfono");
    switch (pagoSelec) {
        case "1":
            dinero = 350
            if (checkSaldo() === true) {
                var servicio = [dinero, "agua"];
                pagoDeServicio(servicio);
            }
        break;

        case "2":
            dinero = 210;
            if (checkSaldo() === true) {
                var servicio = [dinero, "luz"];
                pagoDeServicio(servicio);
            }
        break;

        case "3":
            dinero = 570;
            if (checkSaldo() === true) {
                var servicio = [dinero, "internet"];
                pagoDeServicio(servicio);
            }
        break;

        case "4":
            dinero = 425;
            if (checkSaldo() === true) {
                var servicio = [dinero, "teléfono"];
                pagoDeServicio(servicio);
            }
        break;

        default:
            alert("Este servicio no existe en su cuenta, por favor ingrese el numero que corresponde al servicio que querés pagar")
        break;
        }
}
//Función que realiza el pago de servicio
function pagoDeServicio(servicio) {
    var dineroAnt = saldoCuenta;
    dinero = servicio[0];
    restarDinero(dinero);
    alert("Se ha pagado el servicio de " + servicio[1] + "\nSaldo anterior: " + dineroAnt + "\nDinero descontado: " + servicio[0] + "\nSaldo actual: " + saldoCuenta);
    actualizarSaldoEnPantalla();
}
//Funcion para transferir dinero a cuentas amigas
function transferirDinero() {
    dinero = parseInt(prompt("Ingrese importe a transferir"));
    if (checkNull() === true && checkSaldo() === true) {
        var cuenta = prompt("Ingrese la cuenta destino para la transferencia");
        cuenta = parseInt(cuenta);
        if (cuenta === cuentaAmiga1 || cuenta === cuentaAmiga2) {
            restarDinero(dinero);
            alert("Se han transferido: " + dinero + "\nCuenta destino: " + cuenta);
            actualizarSaldoEnPantalla();
        } else {
            alert("Solo se pueden realizar transferencias a cuentas amigas");
        }
    }
}

function iniciarSesion() {
    var codigoSeguridad = 1234;
    var codigoIngresado = parseInt(prompt("Bienvenido, ingrese su codigo de seguridad"));
    if (codigoIngresado === codigoSeguridad)  {
        alert("Bienvenido Matias De Bonis. Ya puedes comenzar a realizar operaciones");
    } else {
        alert("Codigo incorrecto. Tu dinero ha sido retenido por motivos de seguridad");
        saldoCuenta = 0;
        limiteExtraccion= 0;
        actualizarSaldoEnPantalla();
        actualizarLimiteEnPantalla();
    }
}

///FUNCIONES PERSONALIZADAS///

///Funcion que simula un plazo fijo (NO CAMBIA EL SALDO DE LA CUENTA, SOLO UN SIMULADOR)
function plazoFijo() {
    dinero = parseInt(prompt("ingrese la cantidad de dinero que desee depositar en plazo fijo (a 30 dias, TNA: 30,0%) \nAVISO: esto es un simulador, los valores introducidos son ficticios y no afectara de ningun modo a su cuenta"));
    var interes = dinero * (30/12) / 100;
    var totalSimulado = interes + saldoCuenta;
    alert("Su beneficio en 30 dias sera de: " + interes + "\n saldo total: " + totalSimulado);
}

//Funcion que comprueba que la extracción no excede el limite de la extracción.
function checkLimite() {
    if (dinero > limiteExtraccion) {
        alert("Se ha excedido el limite de extracción, su limite de extracción actual es de $" + limiteExtraccion)

        return false
    }
    else {

        return true
    }
}
// Funcion que comprueba que el saldo de la cuenta es suficiente para realizar la transacción.
function checkSaldo() {
     if (dinero > saldoCuenta) {
        alert("Usted no dispone del saldo necesario para realizar esta acción");
        
        return false;
    } else {

        return true;
    }
}
//Funcion que comprueba que la extracción se realize con multiplos de 100
function checkBillete() {
    var checker;
    checker = dinero % 100;
    if (checker === 0) {

        return true
    } else {
        alert("Solo pueden realizarse extracciones en billetes de 100");
        
        return false
    }
}
//Funcion que verifica que el valor ingresado en el prompt sea un numero
function checkNull() {
    if (typeof dinero === "number" && isNaN(dinero) === false) {
        
        return true;
    } else {
        alert("Por favor, ingrese la cantidad que desea extraer");
        
        return false;
    }
}
//Funciones para realizar transacciones de extracción y deposito.
function sumarDinero(dinero) {
    saldoCuenta += dinero;
}
function restarDinero(dinero) {
    saldoCuenta -= dinero;
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}