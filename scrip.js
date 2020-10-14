var semana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];


console.log(semana.length);

for(var i; i < semana.length; i++){
    console.log(semana[i]);
}

function informarDiasParesImpar(dias){
    for(var i; i < dias.length; i++){
        var num = 0;
        num = i + 1;
        if(num % 2 == 0){
            console.log(dias[i] + " es un día par.-");
        }else{
            console.log(dias[i] + " es un día impar.-");
        }
        if(num == 7){
            alert("Hoy es Domingo!!");
        }
    }
}

diasPares(semana);