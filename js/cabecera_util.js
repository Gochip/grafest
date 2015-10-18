(function($){
    $.fn.calculoPromedio = function(){
        objeto = this;
        objeto.css("cursor", "pointer");
        objeto.click(function(){
            var indice = objeto.index();
            var suma = 0;
            var n = 0;
            objeto.parents("table").find("tr td:nth-child(" + (indice + 1) + ")").each(function(){
                x = $(this).html();
                suma += parseInt(x);
                n++;
            });
            console.log(suma / n);
        });
    }
}(jQuery));
