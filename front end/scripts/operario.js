function init(){
    var urlResultados = "json/muestrasRegistradas.json";
    var n=1;
    $.getJSON(urlResultados,function(respuesta){
        respuesta.forEach(function(muestra){
            var elemento = $("<tr>");
            elemento.append("<td>" + n + "</td>");
            elemento.append("<td>" + muestra.descripcion + "</td>");
            elemento.append("<td>" + muestra.codigo + "</td>");
            elemento.append("<td>" + muestra.estado + "</td>");
            $(".tabla-resultado").append(elemento);
            n=n+1;
        });
    });
}

$(document).ready(init());