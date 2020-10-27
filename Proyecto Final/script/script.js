
function laborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
}

function determinarLaborProfesional() {
    do {
        alert("Las opciones permitidas son: Urbano, Rural, Secano, Certificacion de Riego.-");
        var tipo = prompt("Ingrese Labor Profesional:");
    } while (tipo != "Urbano" && tipo != "Rural" && tipo != "Secano" && tipo != "Certificacion de Riego")

    return tipo;
}

function determinarSuperficie(tipo) {
    if (tipo == 'Rural' || tipo == 'Urbano' || tipo == 'Secano') {
        do {
            var superficie = prompt("Ingrese Superficie del Inmueble: ");
        } while (isNaN(superficie));
    }
    return superficie;
}

function cantidadDeVertices(tipo) {
    if (tipo == 'Rural' || tipo == 'Secano') {
        do {
            var vertices = prompt("Ingrese cantidad de vertices de la propiedad: ");
        } while (Number.isInteger(vertices));
        return vertices;
    } else {
        return vertices = 4;
    }
}

function determinarIrrigado(tipo) {
    return true ? tipo == 'Certificacion de Riego' : false;
}



function datosParcelariosLaborEncargada(tipo) {

    var datos = [];

    datos.push(tipo);

    datos.push(determinarSuperficie(tipo));

    datos.push(cantidadDeVertices(tipo));

    datos.push(determinarIrrigado(tipo));

    return datos;

}

function honorarioUrbano(superficie) {
    var listaSuperficies = [0, 300, 500, 700, 1000, 1200, 1500, 2000, 5000, 10000];
    var honorarios = [8400, 11300, 14100, 15500, 18400, 21200, 24000, 29700, 43800];
    for (var i = 0; i < listaSuperficies.length; i++) {
        var j = i++;
        if (superficie < listaSuperficies[j]) {
            var honorario = honorarios[i];
            break;
        } else if (superficie == listaSuperficies[9]) {
            var honorario = honorarios[8];
        }
    }
    return honorario;
}


function honorarioRuralSecano(superficie, vertices, irrigado) {
    var listaSuperficies = [1001, 3001, 10001, 100001, 200001, 500001, 1000001, 5000001,10000001, 50000001, 100000001, 500000001, 1000000001];
    var honorarioBase = [8500, 8500, 11300, 12400, 14100, 22600, 29600, 43700, 62000, 100200, 124000, 296000, 486600, 1875000];
    var complementoSuperficie = [0, 141, 37, 42, 846, 705, 479, 352, 84, 47, 42, 38, 34, 31, 22];
    var cantidadVertices = [4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 40, 90, 140];
    var complementoVertice = [480, 560, 705, 850, 1100, 1550, 1800, 2400, 2800, 3200, 3800, 4200, 4200, 4200, 4200];
    var honorario;
    honorario = 4800 ? irrigado : 0;
}


var tipo = determinarLaborProfesional();
var datos = datosParcelariosLaborEncargada(tipo);
var mensura = new laborProfesional(datos[0], datos[1], datos[2], datos[3]);
var honorario = honorarioUrbano(mensura.superficie);

alert(honorario);






