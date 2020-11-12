window.onload = function () {

    formularioSegunMensura();
}


/*Tomas los datos ingresados por el usuario y genera un objeto Mensura*/

function LaborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
}

/*Funciones DOM*/

function valorId(id) {
    var valor = document.getElementById(id).value;
    return valor;
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

//FUNCION ONCHANGE FORMULARIO

function formularioSegunMensura() {

    var mensura = valorId('selectorMensura');

    var lista = listaClase('mensura');

    habilitarEntradasDatos(mensura, lista);

}

//CALCULO HONORARIOS DE MENSURA

function tomarIndice(valor, lista){
    let ultimoIndice = lista.length - 1;
    if( valor > lista[ultimoIndice]){
        indice = ultimoIndice;
        return indice;
    }else{
        for(let i = 0; i < lista.length; i++){
            if(valor < lista[i]){
                indice = i;
                return indice;
            }       
        }
    }
}

function valor(indice, lista){
    let honorario = lista[indice];
    return honorario;
};

function honorarioVertice(indice, vertice){
    let listaVertice = [4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 40, 90, 140];
    let listaHonorario = [480, 560, 705, 850, 1130, 1550, 1830, 2390, 2820, 3240, 3800, 4200, 4200, 4200, 4200];
    if(listaVertice[indice] < vertice){
        restoVertices = vertice - listaVertice[indice];
        honorario = listaHonorario[indice] * restoVertices;
        return honorario;
    }else{
        return 0;
    }
}

function presupuestoUrbano(superficie){
    let superficieUrbana = [301, 501, 701, 1001, 1201, 1501, 2001, 5001, 10001];
    let honorariosUrbano = [8500, 11300, 14100, 15500, 18300, 21150, 23970, 9620, 43720];
    let indice = tomarIndice(superficie, superficieUrbana);
    let  honorario = valor(indice, honorariosUrbano);
    return honorario;
}


function presupuestoRuralSecano(superficie, vertices){
    let superficieRural = [1001, 3001, 6001, 10001, 100001, 200001, 500001, 1000001, 5000001, 10000001, 50000001, 1000000001];
    let honorarioRural = [8500,8500, 11300, 12400, 14000, 22600, 29600, 43700, 62000, 100150, 125000, 295000, 485000, 1870000, 3450000];
    let indice = tomarIndice(superficie, superficieRural);
    let honorarioUno = valor(indice, honorarioRural);
    let honorarioDos = honorarioVertice(indice, vertices);
    return honorarioUno + honorarioDos;
}

function irrigado(derecho){
    return derecho ? 5000 : 0;
}

function sacarPresupuesto(tipo, superficie, vertices, riego) {
    if(tipo == 'certificacion'){
        return 5000;
    }
    if(tipo == 'urbano'){
        let honorario = presupuestoUrbano(superficie);
        return honorario;
    }else if(tipo == 'rural'){
        let parcialUno = presupuestoRuralSecano(superficie, vertices);
        let parcialDos = irrigado(riego);
        let honorario = parcialUno + parcialDos;
        return honorario;
    }else if(tipo == 'secano'){
        let honorario = presupuestoRuralSecano(superficie, vertices);
        return honorario;
    }
}

/*Faltan métodos que permitan calculas los honorarios por cantidad de vertices y
por exceso de superficie.-*/





var mensuraNueva = new LaborProfesional();

function botonPresupuesto() {
    debugger;
    var boton = document.getElementById('botonPresupuesto');
    var formulario = document.getElementById('datosMensura');
    var presupuesto = document.getElementById('presupuestado');
    mensuraNueva.tipo = valorId('selectorMensura');
    mensuraNueva.superficie = valorId('vertices');
    mensuraNueva.vertices = valorId('vertices');
    mensuraNueva.irrigado = valorId('selectorRiego');
    let honorario = sacarPresupuesto(mensuraNueva.tipo, mensuraNueva.superficie, mensuraNueva.vertices, mensuraNueva.irrigado);
    if (boton.innerHTML == 'Presupuestar'){
        sessionStorage.setItem('honorario', honorario);
        let valorHonorario = sessionStorage.getItem('honorario');
        formulario.style.display = 'none';
        presupuesto.style.display = 'block';
        let mensaje = `Los honorarios son: ${valorHonorario} pesos.`;
        document.getElementById('honorariosTotales').style.innerHTML(mensaje);
        boton.innerHTML = 'Otro Presupuesto';
        console.log(mensura, superficie, vertices, irrigado);
    } else {
        formulario.style.display = 'block';
        presupuesto.style.display = 'none';
        boton.innerHTML = 'Presupuestar';
    }
}




botonPresupuesto();