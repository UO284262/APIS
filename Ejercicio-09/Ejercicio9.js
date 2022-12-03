class WeatherXML {
    constructor(){
        this.apikey = "834b9699cd9994c139f0949ddcf978bb";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.correcto = "¡Todo correcto! XML recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
    }

    cargarDatos(c) {
        this.ciudad = c;
        this.url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: data => {
                this.datos = data;
                this.verDatos();       
            },
            error: () => {
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
            }
        });
    }

    verDatos() {
         var ciudad = $('city',this.datos).attr("name");
         var longitud = $('coord',this.datos).attr("lon");
         var latitud = $('coord',this.datos).attr("lat");
         var pais = $('country',this.datos).text();
         var amanecer = $('sun',this.datos).attr("rise");
         var minutosZonaHoraria = new Date().getTimezoneOffset();
         var amanecerMiliSeg1970   = Date.parse(amanecer);
             amanecerMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
         var amanecerLocal = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
         var oscurecer             = $('sun',this.datos).attr("set");          
         var oscurecerMiliSeg1970  = Date.parse(oscurecer);
             oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
         var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
         var temperatura           = $('temperature',this.datos).attr("value");
         var feels_like          = $('feels_like',this.datos).attr("value");
         var temperaturaMin        = $('temperature',this.datos).attr("min");
         var temperaturaMax        = $('temperature',this.datos).attr("max");
         var temperaturaUnit       = $('temperature',this.datos).attr("unit");
         var tUnit                 = temperaturaUnit == "celsius"? "ºC" : (temperaturaUnit == "fahrenheit"? "ºF" : "K");
         var humedad               = $('humidity',this.datos).attr("value");
         var humedadUnit           = $('humidity',this.datos).attr("unit");
         var presion               = $('pressure',this.datos).attr("value");
         var presionUnit           = $('pressure',this.datos).attr("unit");
         var velocidadViento       = $('speed',this.datos).attr("value");
         var unitViento          = $('speed',this.datos).attr("unit");
         var direccionViento       = $('direction',this.datos).attr("value");
         var nombreDireccionViento = $('direction',this.datos).attr("name");
         var nubosidad             = $('clouds',this.datos).attr("value");
         var visibilidad           = $('visibility',this.datos).attr("value");
         var horaMedida            = $('lastupdate',this.datos).attr("value");
         var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
             horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
         var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
         var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
         var icon                  = $('weather',this.datos).attr("icon");
         
        $("aside:last").remove();
        $("aside").after("<aside></aside>");
        $("aside:last").append("<h1>" + ciudad + "</h1>");
        $("aside:last").append("<section><h2>País:</h2> " + pais + "</section>");
        $("aside:last").append("<section><h2>Latitud:</h2> " + latitud + "º</section>");
        $("aside:last").append("<section><h2>Longitud:</h2> " + longitud + "º</section>");
        $("aside:last").append("<section><h2>Temperatura:</h2> " + temperatura + tUnit + "</section>");
        $("aside:last").append("<section><h2>Sensación térmica:</h2> " + feels_like + tUnit + "</section>");
        $("aside:last").append("<section><h2>Temperatura máxima:</h2> " + temperaturaMax + tUnit + "</section>");
        $("aside:last").append("<section><h2>Temperatura mínima:</h2> " + temperaturaMin + tUnit + "</section>");
        $("aside:last").append("<section><h2>Presión:</h2> " + presion + presionUnit + "</section>");
        $("aside:last").append("<section><h2>Humedad:</h2> " + humedad + humedadUnit + "</section>"); 
        $("aside:last").append("<section><h2>Amanece a las:</h2> " + amanecerLocal + "</section>"); 
        $("aside:last").append("<section><h2>Oscurece a las:</h2> " + oscurecerLocal + "</section>"); 
        $("aside:last").append("<section><h2>Dirección del viento:</h2> " + direccionViento + "  grados (" + nombreDireccionViento +")</section>");
        $("aside:last").append("<section><h2>Velocidad del viento:</h2> " + velocidadViento + unitViento + "</section>");
        $("aside:last").append("<section><h2>Hora de la medida:</h2> " + horaMedidaLocal + "</section>");
        $("aside:last").append("<section><h2>Fecha de la medida:</h2> " + fechaMedidaLocal + "</section>");
        $("aside:last").append("<section><h2>Visibilidad:</h2> " + visibilidad + " metros</section>");
        $("aside:last").append("<section><h2>Nubosidad:</h2> " + nubosidad + " %</section>");
        $("aside:last").append("<picture><img alt='estado' src=\"https://openweathermap.org/img/w/"+ icon +".png\"/></picture>");
    }
}

var weather = new WeatherXML();