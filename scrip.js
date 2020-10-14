var semana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

/*Informa si el dia de la semana es par o impar. 
En el caso de que sea el día 7 de la semana imprime
 una alerta por pantalla.-*/

function informarDiasParesImpar(dias) {
    for (var i = 0; i < dias.length; i++) {
        var num = 0;
        num = i + 1;
        if (num % 2 == 0) {
            console.log(dias[i] + " es un día par.-");
        } else {
            console.log(dias[i] + " es un día impar.-");
        }
        if (num == 7) {
            alert("Hoy es Domingo!!");
        }
    }
}

informarDiasParesImpar(semana);