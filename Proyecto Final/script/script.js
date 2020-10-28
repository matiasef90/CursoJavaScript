
/*Tomas los datos ingresados por el usuario y genera un objeto Mensura*/

function LaborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
    this.honorario = [];
    this.agregarHonorarioParcial = function (lista, valor) {
        return lista.push(valor);
    }
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
        } while (tipo != "Urbano" && tipo != "Rural" && tipo != "Secano" && tipo != "Certificacion de Riego")

        return tipo;
    }

    this.determinarSuperficie = function (tipo) {
        if (tipo == 'Rural' || tipo == 'Urbano' || tipo == 'Secano') {
            do {
                var superficie = prompt("Ingrese Superficie del Inmueble: ");
            } while (isNaN(superficie));
        }
        return superficie;
    }

    this.cantidadDeVertices = function (tipo) {
        if (tipo == 'Rural' || tipo == 'Secano') {
            do {
                var vertices = prompt("Ingrese cantidad de vertices de la propiedad: ");
            } while (Number.isInteger(vertices));
            return vertices;
        } else {
            return vertices = 4;
        }
    }

    this.determinarIrrigado = function (tipo) {
        return true ? tipo == 'Certificacion de Riego' || 'Rural' : false;
    }
}

/*Calcula las distintas componentes de los honorarios*/

function MetodosCalculoHonorarios() {

    this.honorarioSuperficie = function (superficie, listaSuperficies, listaHonorarios) {
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

    this.honorioRiego = function (honorario, irrigado) {
        return honorario ? irrigado : 0;
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

var calculo = new MetodosCalculoHonorarios();
//var mensura = new LaborProfesional();
//mensura.tipo = CapturaDeParametrosMensura.determinarLaborProfesional();
//mensura.superficie = CapturaDeParametrosMensura.determinarSuperficie(mensura.tipo);
//mensura.irrigado = CapturaDeParametrosMensura.determinarIrrigado(mensura.tipo);


console.log(calculo.honorarioSuperficie(500, [100, 300, 700, 1000], [1,2,3,4]));












