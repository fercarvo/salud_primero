function init(){
    var urlResultados = "../json/resultados.json";
    var n=1;











    
    $.getJSON(urlResultados,function(respuesta){
        respuesta.forEach(function(resultado){
            var elemento = $("<tr>");
            elemento.append("<td>" + n + "</td>");
            elemento.append("<td>" + resultado.resultado + "</td>");
            elemento.append("<td>" + resultado.codigo + "</td>");
            elemento.append("<td>" + resultado.estado + "</td>");
            $(".tabla-resultado").append(elemento);
            n=n+1;
        });
    });
}

$(document).ready(init());