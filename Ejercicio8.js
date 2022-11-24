class WeatherAPI {
    constructor() {
        this.apikey = "834b9699cd9994c139f0949ddcf978bb";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.error = "<p>¡Problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></p>";
    }

    cargarDatos(c) {
        this.ciudad = c;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + this.unidades + this.idioma + "&APPID=" + this.apikey;
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: data => {
                this.datos = data;
                this.verDatos();       
            },
            error: () => {
                $("aside:last").append(this.error);    
            }
        });
    }

    verDatos() {
        $("aside:last").remove();
        $("aside").after("<aside></aside>");
        $("aside:last").append("<h1>Ciudad: " + this.datos.name + "</h1>");
        $("aside:last").append("<section><h2>País:</h2> " + this.datos.sys.country + "</section>");
        $("aside:last").append("<section><h2>Latitud:</h2> " + this.datos.coord.lat + "º</section>");
        $("aside:last").append("<section><h2>Longitud:</h2> " + this.datos.coord.lon + "º</section>");
        $("aside:last").append("<section><h2>Temperatura:</h2> " + this.datos.main.temp + "ºC</section>");
        $("aside:last").append("<section><h2>Sensación térmica:</h2> " + this.datos.main.feels_like + " ºC</section>");
        $("aside:last").append("<section><h2>Temperatura máxima:</h2> " + this.datos.main.temp_max + " ºC</section>");
        $("aside:last").append("<section><h2>Temperatura mínima:</h2> " + this.datos.main.temp_min + " ºC</section>");
        $("aside:last").append("<section><h2>Presión:</h2> " + this.datos.main.pressure + " milímetros</section>");
        $("aside:last").append("<section><h2>Humedad:</h2> " + this.datos.main.humidity + "%</section>"); 
        $("aside:last").append("<section><h2>Amanece a las:</h2> " + new Date(this.datos.sys.sunrise *1000).toLocaleTimeString() + "</section>"); 
        $("aside:last").append("<section><h2>Oscurece a las:</h2> " + new Date(this.datos.sys.sunset *1000).toLocaleTimeString() + "</section>"); 
        $("aside:last").append("<section><h2>Dirección del viento:</h2> " + this.datos.wind.deg + "  grados</section>");
        $("aside:last").append("<section><h2>Velocidad del viento:</h2> " + this.datos.wind.speed + " metros/segundo</section>");
        $("aside:last").append("<section><h2>Hora de la medida:</h2> " + new Date(this.datos.dt *1000).toLocaleTimeString() + "</section>");
        $("aside:last").append("<section><h2>Fecha de la medida:</h2> " + new Date(this.datos.dt *1000).toLocaleDateString() + "</section>");
        $("aside:last").append("<section><h2>Visibilidad:</h2> " + this.datos.visibility + " metros</section>");
        $("aside:last").append("<section><h2>Nubosidad:</h2> " + this.datos.clouds.all + " %</section>");
        $("aside:last").append("<picture><img src=\"https://openweathermap.org/img/w/"+ this.datos.weather[0].icon +".png\"/></picture>");
    }
}

var weather = new WeatherAPI();