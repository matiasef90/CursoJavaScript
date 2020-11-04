window.onload = function () {
    recibirDatos();
}

function recibirDatos() {
    
    var altura = document.getElementById('altura').value;
    var peso = document.getElementById('peso').value;
    var imc = calcularIndiceMasaCorporal(altura, peso);
    var informePeso = evaluarImc(imc);
    if(altura != '' && peso !=''){
        escribirEnHtml('titulo', "Composicion Corporal");
        escribirEnHtml('IMC', "Tu indice de masa corporal es: ", imc);
        escribirEnHtml('estadoFisico', informePeso)
    }
    

}

function calcularIndiceMasaCorporal(altura, peso) {
    var indiceMasaCorporal;
    var alturaAlCuadrado = altura * altura;
    var indiceMasaCorporal = peso / alturaAlCuadrado;
    var indiceMasaCorporal = indiceMasaCorporal.toFixed(1);
    return indiceMasaCorporal;
}

function evaluarImc(imc) {
    if(imc < 18.5){
        return 'Tu peso es inferior al normal.-';
    }else if(imc > 18.5 && imc < 24.9){
        return 'Tu peso es normal.-';
    }else if(imc > 25 && imc < 29.9){
        return 'Tu peso es superior al normal.-';
    }else{
        return 'Tienes obesidad.-';
    }
}

function escribirEnHtml(id, texto, valor = '') {
    return document.getElementById(id).innerHTML = texto + valor;

}