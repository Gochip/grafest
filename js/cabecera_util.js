(function($){
    $.fn.calculoPromedio = function(){
        var objeto = this;
        var oculto = true;
        objeto.css("cursor", "pointer");
        objeto.on("contextmenu", function(event){
            oculto = !oculto;
            if(oculto) {
                objeto.find(".spanDatos").remove();
                return false;
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
            var left = ancho * (indice - 1);
            span.css({
                "display": "inline",
                "padding": "5px",
                "font-size": "10px",
                "border-radius": "10px"
            });
            var promedio = suma / n;
            span.html("(Prom: " + promedio + ")");
            objeto.append(span);
            return false;
        });
    }
}(jQuery));
