(function($){
    $.fn.calculoPromedio = function(){
        var objeto = this;
        var oculto = true;
        objeto.css("cursor", "pointer");
        objeto.click(function(){
            oculto = !oculto;
            if(oculto) {
                objeto.find(".spanDatos").remove();
                return;
            }
            var indice = objeto.index();
            var suma = 0;
            var n = 0;
            objeto.parents("table").find("tr td:nth-child(" + (indice + 1) + ")").each(function(){
                x = parseInt($(this).html());
                if(!isNaN(x)){
                    suma += x;
                }
                n++;
            });
            var span = $("<span class='spanDatos'></span>");
            var ancho = parseInt(objeto.css("width"));
            var left = ancho * indice;
            span.css({
                "background-color": "lightgreen",
                "padding": "5px",
                "width": ancho,
                "position": "absolute",
                "top": "-50px",
                "left": left,
                "border-radius": "10px"
            });
            var promedio = suma / n;
            span.html("Prom: " + promedio);
            objeto.append(span);
        });
    }
}(jQuery));
