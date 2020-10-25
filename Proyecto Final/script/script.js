'use strict';

function laborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
}

function determinarLaborProfesional(){
    do{
        window.alert("Las opciones permitidas son: Urbana, Rural, Secano, Certificacion de Riego.-");
        var tipo = prompt(  "Ingrese Labor Profesional:");
    }while(tipo !="Urbana" || tipo!="Rural" || tipo!="Secano" || tipo!="Certificacion de Riego" )

    

}










