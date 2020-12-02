
$(document).ready(function(){
    $('#presupuestado').hide();
    formularioSegunMensura();
});

/*Tomas los datos ingresados por el usuario y genera un objeto Mensura*/

function LaborProfesional(tipo, superficie, vertices, irrigado) {
    this.tipo = tipo;
    this.superficie = superficie;
    this.vertices = vertices;
    this.irrigado = irrigado;
}

/*Funciones DOM*/

function valorId(id) {
    var valor = $('#' + id).val();
    return valor;
}


function valorClase(clase) {
    return $('.' + clase).val();
}

function listaClase(clase) {
    var lista = $('.' + clase);
    return lista;
}

function habilitarEntradasDatos(mensura, lista) {
    for(var i = 0; i < lista.length; i++){
        $(lista[i]).slideDown(600);
    }

    fondoFormulario(mensura, '#fondoMensuras');


    switch (mensura) {
        case mensura = 'urbano':
            for(var i = 2; i < lista.length; i++){
                $(lista[i]).slideUp(600);
            }
            break;

        case mensura = 'desert':
            for(var i = 4; i < lista.length; i++){
                $(lista[i]).slideUp(600);
            }
            break;

        case mensura = 'river':
            for(var i = 0; i < lista.length - 2; i++){
                $(lista[i]).slideUp(600);
            }
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
    if(tipo == 'river'){
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
    }else if(tipo == 'desert'){
        let honorario = presupuestoRuralSecano(superficie, vertices);
        return honorario;
    }
}

/*Faltan métodos que permitan calculas los honorarios por cantidad de vertices y
por exceso de superficie.-*/





var mensuraNueva = new LaborProfesional();

function botonPresupuesto() {
    var bgcard = $('#cardPrincipal')
    var boton =  $('#botonPresupuesto');
    var formulario = $('#datosMensura');
    var presupuesto = $('#presupuestado');
    mensuraNueva.tipo = valorId('selectorMensura');
    mensuraNueva.superficie = valorId('superficie');
    mensuraNueva.vertices = valorId('vertices');
    mensuraNueva.irrigado = valorId('selectorRiego');
    let honorario = sacarPresupuesto(mensuraNueva.tipo, mensuraNueva.superficie, mensuraNueva.vertices, mensuraNueva.irrigado);
    if ($(boton).html() == 'Presupuestar'){
        sessionStorage.setItem('honorario', honorario);
        let valorHonorario = sessionStorage.getItem('honorario');
        bgcard.removeClass('bg-secondary');
        bgcard.addClass('bg-success');
        $(formulario).fadeOut();
        $(presupuesto).fadeIn();
        $(boton).html('Otro Presupuesto');
        let mensaje = `Los honorarios son: ${valorHonorario} pesos.`;
        $('#honorariosTotales').html(mensaje);
    } else {
        bgcard.removeClass('bg-success');
        bgcard.addClass('bg-secondary');
        $(formulario).fadeIn();
        $(presupuesto).fadeOut();
        $('tituloHonorario').fadeOut();
        $(boton).html('Presupuestar');
    }
}


const fondoFormulario = (fondo, caja, indice = 0) =>{
    
    var apiID = 'AvvgnQyOX0AGJ6SdFn-FuIaRsn6AtUJGJsRzjX1ajZU';
    var query = fondo;
    
    $.ajax({
        type: "GET",
        url: `https://api.unsplash.com/search/photos?query=${query}&client_id=` + apiID,
        dataType: 'json',
        success: function (response) {
            let imagen = response.results[indice].urls.regular;
            $(caja).css('background-image', `url(${imagen})`);
            $(caja).css('background-size', 'cover');
    
        },
        error: () => {
            console.log('no cargo la imagen')
        } 
    });
}

var fondoHome = fondoFormulario('building', '#home');
var fondoNoticias = fondoFormulario('news', '#noticias', 4);


const noticias = (i) =>{
    let apiKey = '4adfee5e5dc9490f840b0bdbce584ca0';
    let queryUno = 'ULTIMAS_NOTICIAS';
    let queryDos = 'ECONOMIA';

    $.ajax({
        type: "GET",
        url: `https://api.jornalia.net/api/v1/articles?apiKey=${apiKey}&categories=${queryUno}%2C${queryDos}`,
        success: function (json) {
            let articulo = json.articles[i];
            $('#titulo a').html(articulo.title);
            $('#titulo a').attr('href', articulo.sourceUrl);
            $('#imgNoticia').attr('src', articulo.imageUrl);
            $('#descripcion').html(articulo.description);

        },
        error: () =>{
            console.log('No hay noticias.-');
        }
    });
}

let indiceNoticias = 5;

const siguiente = () =>{
    if(indiceNoticias > 4){
        indiceNoticias = 0;
    }else{
        indiceNoticias++;
    }
    noticias(indiceNoticias);
}

const cargarHome = () =>{
    $('#home').addClass('d-block');
    $('#fondoMensuras').removeClass('d-block');
    $('#noticias').removeClass('d-block');
    $('#liHome').addClass('bg-secondary');
    $('#liPresupuesto').removeClass('bg-secondary');
    $('#liNoticias').removeClass('bg-secondary');
}
const cargarPresupuesto = () =>{
    $('#home').removeClass('d-block');
    $('#fondoMensuras').addClass('d-block');
    $('#noticias').removeClass('d-block');
    $('#liHome').removeClass('bg-secondary');
    $('#liPresupuesto').addClass('bg-secondary');
    $('#liNoticias').removeClass('bg-secondary');
}
const cargarNoticias = () =>{
    $('#home').removeClass('d-block');
    $('#fondoMensuras').removeClass('d-block');
    $('#noticias').addClass('d-block');
    $('#liHome').removeClass('bg-secondary');
    $('#liPresupuesto').removeClass('bg-secondary');
    $('#liNoticias').addClass('bg-secondary');
}


cargarHome();
cargarNoticias();
cargarPresupuesto();
siguiente();
botonPresupuesto();
