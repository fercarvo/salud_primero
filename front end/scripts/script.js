$(document).ready(function(){
    cargarCentrosMed();
});
    

function cargarCentrosMed(){
    $.getJSON("../json/centrosMed.json", function(data){
        $.each(data,function(i){
            var nombre = data[i].nombre;
            var ciudad = data[i].ciudad;
            var contac = data[i].contacto;
            var direc = data[i].direccion;
            var horarios = data[i].horarios;
            var coord = data[i].coordenadas;
            var urlImg = data[i].portada;
            var contenedor = $('#centros-medicos');
            var foto1 =data[i].foto1;
            var foto2 =data[i].foto2;
            var foto3 =data[i].foto3;
            var exam = data[i].Descripcion;
            var coordenadas = data[i].Coordenadas;
                                
            /*elementos html a generar*/
            var columna = $('<div class="col-xs-12 col-sm-6 col-md-4"></div>');
            var centrosMedicos = $('<div class="centros-medicos"></div>');
            var centro = $('<div class="centro-med"></div>');
            var ladoFrente = $('<div class="lado frente"></div>');
            var img = $('<img src="'+urlImg+'" alt="imagen">');
            var ladoAtras = $('<div class="text-center lado atras panel panel-default"></div>');
            var ladoAtrasHead =$('<div class="panel-heading tarjeta-titulo"></div>');
            var ladoAtrasNombre = $('<h4 class="text-center panel-title></h4>');
            var ladoAtrasBody =$('<div class="panel-body text-center"></div>');
            var ladoAtrasFooter =$('<div class="panel-footer"></div>');
            var hor = $('<p></p>');
            for (var j=0; j<horarios.length;j++){
                //console.log(horarios[j]);
                ladoAtrasBody.append(horarios[j]+'<br>');
            }
            var info = $('<button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#modalCentro'+(i+1)+'">Más Información</button>');

            contenedor.append(columna);
            columna.append(centrosMedicos);
            centrosMedicos.append(centro);
            centro.append(ladoFrente);
            centro.append(ladoAtras);
            ladoFrente.append(img);        
            ladoAtras.append(ladoAtrasHead);
            ladoAtras.append(ladoAtrasBody);
            ladoAtras.append(ladoAtrasFooter);
            
            ladoAtrasHead.append(nombre);        
            ladoAtrasFooter.append(info);
            
            
            //creacion de modales para mostrar informacion de cada centro
            
            
            var modal =$('<div id="modalCentro'+(i+1)+'" class="modal fade modal-centrado"></div>');
            var modalContent =$('<div class="modal-content"></div>');
            var modalHeader =$('<div class="modal-header"></div>');
            var modalHeaderBtn =$('<button type="button" class="close" data-dismiss="modal">&times;</button>');
            var modalTitle =$('<h4 class="modal-title">'+nombre+'</h4>');
            var modalBody =$('<div class="modal-body"></div>');
            var modalFooter =$('<div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button></div>');
            
            
            
            $('body').append(modal);
            modal.append(modalContent);
            modalContent.append(modalHeader);
            modalHeader.append(modalHeaderBtn);
            modalHeader.append(modalTitle);
            modalContent.append(modalBody);
            modalContent.append(modalFooter);
            
            var contenidoModal =$('<div class="container-fluid bd-example-row"></div>');
            var fila1 =$('<div class="row fila"></div>');
            var fila2 =$('<div class="row fila"></div>');
            
            contenidoModal.append(fila1);
            contenidoModal.append(fila2);
            modalBody.append(contenidoModal);
            
            
            
            var descripcion =$('<div class="col-md-6"></div>');
            var inforPanel =$('<div class="panel panel-default"></div>');
            var inforHeading =$('<div class="panel-heading text-center"></div>');
            var inforTitle = $('<h3 class="panel-title">Informaci&oacute;n</h3>');
            var inforBody = $('<div class="panel-body text-center"></div>');
            var infoExamenes = $('<span style="font-weight:bold;">Ex&aacute;menes: </span><br/>');
            var infoDireccion = $('<span style="font-weight:bold;">Direcci&oacute;n: </span><span>'+direc+'</span><br/>');
            var infoContacto = $('<span style="font-weight:bold;">Tel&eacute;fono: </span><span>'+contac+'</span><br/>');
            
            inforBody.append(infoExamenes);
            //var exa = $('<p></p>');
            for (var k=0; k<exam.length; k++){
                inforBody.append(exam[k]+'<br>');
            }
            
            descripcion.append(inforPanel);
            inforPanel.append(inforHeading);
            inforPanel.append(inforBody);
            inforHeading.append(inforTitle);
            inforBody.append(infoDireccion);
            inforBody.append(infoContacto);
            fila1.append(descripcion);
            
            /*
            var carrusel =$('<div class="col-md-6"></div>');
            var slider =$('<div id="carouselCentroMed'+(i+1)+'" class="carousel slide" data-ride="carousel"></div>');
            var ol = $('<ol class="carousel-indicators"></ol>');
            var li0 =$('<li data-target="carousel-example-generic" data-slide-to="0" class="active"></li>');
            var li1 =$('<li data-target="carousel-example-generic" data-slide-to="1"></li>');
            var li2 =$('<li data-target="carousel-example-generic" data-slide-to="2"></li>');
            
            var carruselImg =$('<div class="carousel-inner" role="listbox"></div>');
            var item1 =$('<div class="item active"></div>');
            var img1 =$('<img src="'+foto1+'" alt="foto1">');
            var item2 =$('<div class="item active"></div>');
            var img2 =$('<img src="'+foto2+'" alt="foto2">');
            var item3 =$('<div class="item active"></div>');
            var img3 =$('<img src="'+foto3+'" alt="foto3">');
            
            var controlIzq =$ ('<a class="left carousel-control" href="#carouselCentroMed'+(i+1)+'" role="button" data-slide="prev"></a>');
            var izq =$('<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>');
            var controlDer =$('<a class="right carousel-control" href="#carouselCentroMed'+(i+1)+'" role="button" data-slide="next"></a>');
            var der =$('<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>');
            
            carrusel.append(slider);
            slider.append(ol);
            slider.append(carruselImg);
            slider.append(controlIzq);
            slider.append(controlDer);
            
            ol.append(li0);
            ol.append(li1);
            ol.append(li2);
            
            carruselImg.append(item1);
            carruselImg.append(item2);
            carruselImg.append(item3);
            
            controlIzq.append(izq);
            controlDer.append(der);
            
            item1.append(img1);
            item2.append(img2);
            item3.append(img3);
            
            fila1.append(carrusel);
            
            */
            
            var galeria =$('<div class="panel panel-default"></div>');
            var galeriaHeading =$('<div class="panel-heading text-center"></div>');
            var galeriaTitle = $('<h3 class="panel-title">Informaci&oacute;n</h3>');
            var galeriaBody = $('<div class="panel-body text-center"></div>');
            
            
            var colSlider =$('<div class="col-md-6"></div>');
            var carousel = $('<div id="carousel-centro'+(i+1)+'" class="carousel slide" data-ride="carousel"></div>');
            var carouselIndicators = $('<ol class="carousel-indicators"></ol>');
            var indicator0 = $('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
            var indicator1 = $('<li data-target="#carousel-example-generic" data-slide-to="1"></li>');
            var indicator2 = $('<li data-target="#carousel-example-generic" data-slide-to="2"></li>');
            var carouselInner = $('<div class="carousel-inner" role="listbox"></div>');
            var item0 = $('<div class="item active"></div>');
            var imagen0 = $('<img src="'+foto1+'" alt="'+nombre+'">');
            var item1 = $('<div class="item"></div>');
            var imagen1 = $('<img src="'+foto2+'" alt="'+nombre+'">');
            var item2 = $('<div class="item"></div>');
            var imagen2 = $('<img src="'+foto3+'" alt="'+nombre+'">');
            var carouselLeftControl = $('<a class="left carousel-control" href="#carousel-centro'+(i+1)+'" role="button" data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span><span class="sr-only">Previous</span></a>');
            var carouselRightControl = $('<a class="right carousel-control" href="#carousel-centro'+(i+1)+'" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span><span class="sr-only">Next</span></a>');

            galeria.append(galeriaHeading);
            galeria.append(galeriaBody);
            galeriaHeading.append('<h3 class="text-center panel-title">Galer&iacute;a</h3>');
            galeriaBody.append(carousel);
            
            colSlider.append(galeria);
            carousel.append(carouselIndicators);
            carousel.append(carouselInner);
            carousel.append(carouselLeftControl);
            carousel.append(carouselRightControl);
            carouselIndicators.append(indicator0);
            carouselIndicators.append(indicator1);
            carouselIndicators.append(indicator2);
            carouselInner.append(item0);
            carouselInner.append(item1);
            carouselInner.append(item2);
            item0.append(imagen0);
            item1.append(imagen1);
            item2.append(imagen2);
            
            fila1.append(colSlider);
            

            // Mapa
            var mapaColumn = $('<div class="col-xs-12"></div>');
            var mapaPanel = $('<div class="panel panel-default"></div>');
            var mapaHeading = $('<div class="panel-heading"></div>');
            var mapaTitle = $('<h3 class="text-center panel-title">Mapa</h3>');
            var mapaBody = $('<div class="panel-body"></div>');
            var mapa =$('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7974.028468568863!2d-79.96830796821938!3d-2.1482369294487267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2s!4v1467777281521" width="100%" height="400px" frameborder="0" style="border:0" allowfullscreen></iframe>');

            // Ordeno los elementos del mapa
            mapaColumn.append(mapaPanel);
            mapaPanel.append(mapaHeading);
            mapaPanel.append(mapaBody);
            mapaHeading.append(mapaTitle);
            mapaBody.append(mapa);

            // Agrego el mapa a la fila 2
            fila2.append(mapaColumn);            
        });
        
    });
}

function cargarDatos(){
    $.getJSON("../json/pacientes.json", function(data){
        $.each(data,function(i){
            $("#nombre").append(data[i].Nombres);
            $(".#apellidos").append(data[i].Apellidos);
            $(".#cedula").append(data[i].Cedula);
            $(".#email").append(data[i].Email);
            $(".#dir").append(data[i].Direccion);
            $(".#telf").append(data[i].Telefono);
            console.log(data[i].Nombres);
        });
    });
}
