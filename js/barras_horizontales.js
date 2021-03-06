/*
    Este script representa un gráfico de barras horizontales.
    Se debe aplicar a un div, el cual debe tener los dos siguientes hijos:
        el canvas y otro div con los datos.
    El formato general debe ser:
    <div>
        <canvas></canvas>
        <table></table>
    </div>
*/
(function($){
    var object; // Es el div padre.
    var canvas; // El canvas, donde se dibuja.
    var tableInfo; // Tabla con la información.
    var context; // El contexto para dibujar.
    var datos; // Matriz con los datos obtenidos de tableInfo.

    // Variables gráficas
    var coloresAleatorios = false; // Esta variable indica que las barras tendrán colores aleatorios.
    var margenIzquierdo = 60;
    var margenDerecho = 35;
    var margenSuperior = 30;
    var margenInferior = 30;
    var colorEjes = "black";
    var colorLetra = "black";
    var sumaTotal;
    var maximo; // El valor máximo de los datos.
    var altoGrafico;
    var anchoGrafico;
    var altoBarra;
    var separacionEtiquetaPorcentaje = -30;
    var separacionEtiquetaCantidad = 10;
    var padding = 3;

    /*
    Función inicial. Establece las posiciones del canvas y la tabla.
    */
    $.fn.barra_horizonal = function(ca){
        object = this;
        canvas = object.find("canvas")[0];
        tableInfo = object.find("table")[0];
        $(canvas).css("border", "1px solid black");
        $(tableInfo).css({
            "backgroundColor": "white",
            "position": "absolute",
            "top": "10px",
            "left": "420px"
        });
        context = canvas.getContext("2d");

        if(coloresAleatorios != undefined){
            coloresAleatorios = ca;
        }

        calcularDatos();
        dibujar();
    };

    function calcularDatos(){
        datos = [];
		var fila = 0;
		$(tableInfo).find("tr").has("td").each(function(){
		    datos[fila] = [];
		    var columna = 0;
		    // Cargo datos.
		    $(this).find("td").each(function(){
				datos[fila][columna] = $(this).text();
				columna++;
			});
			// Cargo colores.
			if(!coloresAleatorios){
			    var color = $(this).css("color");
			    if(color=$(this).css("color").match(/rgb\((\d+), (\d+), (\d+)/)){
				    datos[fila]["color"] = [color[1], color[2], color[3]];
			    }else if(color=$(this).css("color").match(/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/)){
				    datos[fila]["color"] = [parseInt(color[1],16) ,parseInt(color[2],16), parseInt(color[3], 16)];
			    }else{
				    console.log("Error en el formato del color");
			    }
			}else{
			    datos[fila]["color"] = obtenerColorAleatorio();
			}
			fila++;
		});
		calcularMaximo();
		calcularSumaTotal();
    }

	function calcularMaximo(){
	    maximo = 0;
	    for(var i = 0; i < datos.length; i++){
	        var dato = parseInt(datos[i][1]);
	        if(maximo < dato){
	            maximo = dato;
	        }
	    }
	}

    function calcularSumaTotal(){
		sumaTotal = 0;
		for(var i = 0; i < datos.length; i++){
			sumaTotal += parseInt(datos[i][1]);
		}
	}

    function obtenerColorAleatorio(){
        return [255, 0, 0];
    }

    function dibujar(){
        altoGrafico = canvas.height - margenSuperior - margenInferior;
        anchoGrafico = canvas.width - margenIzquierdo - margenDerecho;
        altoBarra = altoGrafico / datos.length;
        dibujarBarras();
        dibujarEjes();
        dibujarEtiquetas();
    }

    function dibujarEjes(){
		var xInicial = margenIzquierdo;
		var yInicial = margenSuperior;
		var xFinal1 = xInicial;
		var yFinal1 = margenSuperior + altoGrafico;
		var xFinal2 = margenIzquierdo + anchoGrafico;
		var yFinal2 = yFinal1;
		context.strokeStyle = colorEjes;
		context.beginPath();
		context.moveTo(xInicial, yInicial);
		context.lineTo(xFinal1, yFinal1);
		context.moveTo(xFinal1, yFinal1);
		context.lineTo(xFinal2, yFinal2);
		context.closePath();
		context.stroke();
	}

    function dibujarBarras(){
		var x = margenIzquierdo;
		var offsetY = margenSuperior;
		var y = offsetY + padding;
		var ancho = 0;
		var xEtqCantidad = 0;
		var yEtqCantidad = offsetY + altoBarra / 2;
		var xEtqPorcentaje = margenIzquierdo - separacionEtiquetaPorcentaje;
		var yEtqPorcentaje = yEtqCantidad;

		var alto = altoBarra - padding * 2;
		var max = maximo;
		for(var i = 0; i < datos.length; i++){
			ancho = (datos[i][1] * anchoGrafico) / max;
			xEtqCantidad = ancho + x + separacionEtiquetaCantidad;
			var colorBarra = context.createLinearGradient(x, y, x + ancho, y);
			colorBarra.addColorStop(0, "rgb(" + datos[i]["color"].join() + ")");
			var c1 = parseInt(datos[i]["color"][0]) - 20;
			var c2 = datos[i]["color"][1] - 30;
			var c3 = datos[i]["color"][2] - 20;
			colorBarra.addColorStop(1, "rgb(" + c1 + "," + c2 + "," + c3 + ")");
			context.fillStyle = colorBarra;
			context.fillRect(x, y, ancho, alto);
			context.fillStyle = colorLetra;
			context.textAlign = "left";
			context.fillText(datos[i][1], xEtqCantidad, yEtqCantidad);
			var porcentaje = Math.round((datos[i][1] * 100) / sumaTotal);
			context.textAlign = "right";
			context.fillText(porcentaje + "%", xEtqPorcentaje, yEtqPorcentaje);
			y += 2 * padding + alto;
			yEtqCantidad += altoBarra;
			yEtqPorcentaje = yEtqCantidad;
		}
    }

    function dibujarEtiquetas(){
		altoBarra = altoGrafico / datos.length;
		var y = altoBarra / 2;
		var x = margenIzquierdo / 2;
		var offsetY = margenSuperior;
		
		for(var i = 0; i < datos.length; i++){
			context.fillStyle = colorLetra;
			context.textAlign = "center";
			context.fillText(datos[i][0], x, offsetY + y);
			y += altoBarra;
		}
	}

}(jQuery));

