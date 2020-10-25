'use strict';

function laborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
}

function determinarLaborProfesional(){
    do{
        window.alert("Las opciones permitidas son: Urbano, Rural, Secano, Certificacion de Riego.-");
        var tipo = prompt(  "Ingrese Labor Profesional:");
    }while(tipo != "Urbano" && tipo !="Rural" && tipo !="Secano" && tipo !="Certificacion de Riego") 

    return tipo; 
}

function determinarSuperficie(tipo){
    if(tipo == 'Rural' || tipo == 'Urbano' || tipo == 'Secano'){
        do{
            var superficie = prompt("Ingrese Superficie del Inmueble: ");
        }while (isNaN(superficie));
    }
    return superficie;
}

function cantidadDeVertices(tipo){
    if(tipo == 'Rural' || tipo == 'Secano'){
        do{
            var vertices = prompt("Ingrese cantidad de vertices de la propiedad: ");
        }while (Number.isInteger(vertices));
        return vertices;
    }else{
        return vertices = 4;
    }
}

function determinarIrrigado(tipo){
    return true ? tipo == 'Certificacion de Riego' : false;
}



function datosParcelariosLaborEncargada(tipo){

    var datos = [];

    datos.push(tipo);

    datos.push(determinarSuperficie(tipo));
    
    datos.push(cantidadDeVertices(tipo));

    datos.push(determinarIrrigado(tipo));

    return datos;

}



var tipo = determinarLaborProfesional();
var datos = datosParcelariosLaborEncargada(tipo);
var mensura = new laborProfesional(datos[0], datos[1], datos[2], datos[3]);


console.log(mensura.irrigado);








