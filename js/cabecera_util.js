(function($){
    $.fn.calculoPromedio = function(){
        var objeto = this;
        var oculto = true;
        objeto.css("cursor", "pointer");
        objeto.click(function(){
            oculto = !oculto;
            if(oculto) {
                objeto.find(".spanDatos").hide();
                return;
            }
            var indice = objeto.index();
            var suma = 0;
            var n = 0;
            objeto.parents("table").find("tr td:nth-child(" + (indice + 1) + ")").each(function(){
                x = $(this).html();
                suma += parseInt(x);
                n++;
            });
            var span = $("<span class='spanDatos'></span>");
            var ancho = objeto.css("width");
            span.css({
                "background-color": "lightgreen",
                "padding": "5px",
                "position": "absolute",
                "top": "-50px",
                "left": ancho,
                "border-radius": "10px"
            });
            var promedio = suma / n;
            span.html("Prom: " + promedio);
            objeto.append(span);
        });
    }
}(jQuery));
