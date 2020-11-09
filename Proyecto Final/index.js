window.onload = function () {
    formularioSegunMensura();
}


/*Tomas los datos ingresados por el usuario y genera un objeto Mensura*/

function LaborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
    this.listaHonorariosTabla = [];
    this.listaSuperficiesTabla = [];
    this.honorariosParciales = [];
    this.honorarioTotal = 0;
    this.agregarHonorarioParcial = function (lista, valor) {
        return lista.push(valor);
    }
}

/*Funciones DOM*/

function valorId(id) {
    return document.getElementById(id).value;
}


function valorClase(clase) {
    return document.getElementsByClassName(clase).value;
}

function listaClase(clase) {
    var lista = document.getElementsByClassName(clase);
    return lista;
}

function habilitarEntradasDatos(mensura, lista) {
    
    lista[0].style.display = 'block';
    lista[1].style.display = 'block';
    lista[2].style.display = 'block';
    lista[3].style.display = 'block';
    lista[4].style.display = 'block';
    lista[5].style.display = 'block';

    switch (mensura) {
        case mensura = 'urbano':
            lista[2].style.display = 'none';
            lista[3].style.display = 'none';
            lista[4].style.display = 'none';
            lista[5].style.display = 'none';
            break;

        case mensura = 'secano':
            lista[4].style.display = 'none';
            lista[5].style.display = 'none';
            break;

        case mensura = 'certificacion':
            lista[0].style.display = 'none';
            lista[1].style.display = 'none';
            lista[2].style.display = 'none';
            lista[3].style.display = 'none';
            break;
    }
}

function formularioSegunMensura() {
    var mensura = valorId('selectorMensura');

    var lista = listaClase('mensura');

    habilitarEntradasDatos(mensura, lista);

}




/*Crea objetos con las variables necesarias para el calculo de los honorarios*/

function VariablesGeneralesPresupuesto(superficies, honorarios, vertices, valorVertices, superficieExcedente, valorSuperficieExcedente, certificacionRiego) {
    this.superficies = superficies;
    this.honorarios = honorarios;
    this.vertices = vertices;
    this.valorVertices = valorVertices;
    this.superficieExcedente = superficieExcedente;
    this.valorSuperficieExcedente = valorSuperficieExcedente;
    this.certificacionRiego = certificacionRiego;
}

/*Tomas parametros ingresados por prompt*/

function CapturaDeParametrosMensura() {

    this.determinarLaborProfesional = function () {
        do {
            alert("Las opciones permitidas son: Urbano, Rural, Secano, Certificacion de Riego.-");
            var tipo = prompt("Ingrese Labor Profesional:");
            tipo = tipo.toLowerCase();
        } while (tipo != "urbano" && tipo != "rural" && tipo != "secano" && tipo != "certificacion de riego")

        return tipo;
    }

    this.determinarSuperficie = function (tipo) {
        if (tipo == 'rural' || tipo == 'urbano' || tipo == 'secano') {
            do {
                var superficie = prompt("Ingrese Superficie del Inmueble: ");
            } while (isNaN(superficie));
        }
        return superficie;
    }

    this.cantidadDeVertices = function (tipo) {
        if (tipo == 'rural' || tipo == 'secano') {
            do {
                var vertices = prompt("Ingrese cantidad de vertices de la propiedad: ");
            } while (Number.isInteger(vertices));
            return vertices;
        } else {
            return vertices = 4;
        }
    }

    this.determinarIrrigado = function (tipo) {
        return (tipo == 'certificacion de riego' || tipo == 'rural') ? true : false;
    }

    this.listaHonorariosQueUtilizamos = function (tipo, listaHonorariosUrbano, listaHonorariosRuralSecano) {
        if (tipo == 'urbano') {
            return listaHonorariosUrbano;
        } else {
            return listaHonorariosRuralSecano;
        }
    }

    this.listaSuperficiesQueUtilizamos = function (tipo, listaSuperficiesUrbano, listaSuperficiesRuralSecano) {
        if (tipo == 'urbano') {
            return listaSuperficiesUrbano;
        } else {
            return listaSuperficiesRuralSecano;
        }
    }

}

/*Calcula las distintas componentes de los honorarios*/

function CalculoHonorarios() {

    this.honorarioSuperficie = function (superficie, listaSuperficies, listaHonorarios, tipo) {
        if (tipo == 'certificacion de riego') {
            return 0;
        }
        var ultimoIndice = listaSuperficies.length - 1;
        if (superficie > listaSuperficies[ultimoIndice]) {
            var honorario = listaHonorarios[ultimoIndice];
        } else {
            for (var i = 0; i < listaSuperficies.length; i++) {
                if (superficie < listaSuperficies[i]) {
                    var honorario = listaHonorarios[i];
                    break;
                }
            }
        }
        return honorario;
    }

    this.honorarioRiego = function (honorario, irrigado) {
        return irrigado ? honorario : 0;
    }

    this.honorarioTotal = function (honorariosParciales) {
        var honorarioTotal = 0;
        for (var i = 0; i < honorariosParciales.length; i++) {
            honorarioTotal += honorariosParciales[i];
        }
        return honorarioTotal;
    }

    /*Faltan métodos que permitan calculas los honorarios por cantidad de vertices y
    por exceso de superficie.-*/

}




var variablesUrbano = new VariablesGeneralesPresupuesto();
variablesUrbano.listaSuperficies = [301, 501, 701, 1001, 1201, 1501, 2001, 5001, 10001];
variablesUrbano.listaHonorarios = [8400, 11300, 14100, 15500, 18400, 21200, 24000, 29700, 43800];

var variablesRural = new VariablesGeneralesPresupuesto();
variablesRural.listaSuperficies = [1001, 3001, 6001, 10001, 100001, 200001, 500001, 1000001, 5000001, 10000001, 50000001, 100000001, 50000001, 1000000001];
variablesRural.listaHonorarios = [8400, 8400, 11300, 12400, 14100, 22500, 29600, 43700, 62100, 10200, 12500, 296000, 486600, 1875000, 3470000];
variablesRural.certificacionRiego = 5000;

var CalculoHonorarios = new CalculoHonorarios();

var mensura = new LaborProfesional();





/*
mensura.tipo = capturaParametrosMensura.determinarLaborProfesional();
mensura.superficie = capturaParametrosMensura.determinarSuperficie(mensura.tipo);
mensura.irrigado = capturaParametrosMensura.determinarIrrigado(mensura.tipo);
mensura.listaSuperficiesTabla = capturaParametrosMensura.listaSuperficiesQueUtilizamos(mensura.tipo, variablesUrbano.listaSuperficies, variablesRural.listaSuperficies);
mensura.listaHonorariosTabla = capturaParametrosMensura.listaHonorariosQueUtilizamos(mensura.tipo, variablesUrbano.listaHonorarios, variablesRural.listaHonorarios);
mensura.agregarHonorarioParcial(mensura.honorariosParciales, metodosCalculoHonorarios.honorarioSuperficie(mensura.superficie, mensura.listaSuperficiesTabla, mensura.listaHonorariosTabla, mensura.tipo));
mensura.agregarHonorarioParcial(mensura.honorariosParciales, metodosCalculoHonorarios.honorarioRiego(variablesRural.certificacionRiego, mensura.irrigado));
mensura.honorarioTotal = metodosCalculoHonorarios.honorarioTotal(mensura.honorariosParciales);
*/