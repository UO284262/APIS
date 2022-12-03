class Geolocalización {
    constructor() {
        this.mensaje = "Se cargó correctamente";
        this.error = true;
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.listo = false;
        document.addEventListener('keydown', (event) => {
            this.#ejecutar(event.key);
        });
    }

    #ejecutar(char) {
        switch(char) {
            case "Enter": if(this.listo) this.cargarMapa(); break;
        }
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            this.error = true;
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "La información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    cargarMapa() {
        $("p").text('Mensaje: '+this.mensaje); 
        if(!this.error) {
            var pos = {lat: this.latitud, lng: this.longitud};
            var mapaOviedo = new google.maps.Map(document.querySelector("aside:last-of-type"),{zoom: 13,center:pos});
            new google.maps.Marker({position:pos,map:mapaOviedo});
        }
            
    }

    getPosicion(posicion){
        this.longitud=posicion.coords.longitude; 
        this.latitud=posicion.coords.latitude;  
        this.precision=posicion.coords.accuracy;
        this.altitud=posicion.coords.altitude;
        this.precisionAltitud=posicion.coords.altitudeAccuracy;
        this.rumbo=posicion.coords.heading;
        this.velocidad=posicion.coords.speed;    
        this.error = false;
    }

    setListo() {
        this.listo = true;
    }
}

var mapa = new Geolocalización();