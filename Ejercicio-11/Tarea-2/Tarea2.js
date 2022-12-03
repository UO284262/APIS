class Geolocalización {
    constructor (){
        this.mensaje = "Se cargó correctamente";
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this),  this.verErrores.bind(this));
        document.addEventListener('keydown', (event) => {
            this.#ejecutar(event.key);
        });
    }

    #ejecutar(char) {
        switch(char) {
            case "Enter": this.verTodo(); break;
        }
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
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

    getPosicion(posicion){
        this.longitud=posicion.coords.longitude; 
        this.latitud=posicion.coords.latitude;  
        this.precision=posicion.coords.accuracy;
        this.altitud=posicion.coords.altitude;
        this.precisionAltitud=posicion.coords.altitudeAccuracy;
        this.rumbo=posicion.coords.heading;
        this.velocidad=posicion.coords.speed;       
    }

    getLongitud(){
        return this.longitud;
    }

    getLatitud(){
        return this.latitud;
    }

    getAltitud(){
        return this.altitud;
    }

    verTodo(){
        $("aside:last").remove();
        $("aside:last").after("<aside></aside>");
        $("aside:last").append('<p>Mensaje: '+this.mensaje +'</p>'); 
        $("aside:last").append('<section><h2>Longitud: </h2><p>'+this.longitud +' grados</p></section>'); 
        $("aside:last").append('<section><h2>Latitud: </h2><p>'+this.latitud +' grados</p></section>');
        $("aside:last").append('<section><h2>Precisión de la latitud y longitud: </h2><p>'+ this.precision +' metros</p></section>');
        $("aside:last").append('<section><h2>Altitud: </h2><p>'+ this.altitude +' metros</p>');
        $("aside:last").append('<section><h2>Precisión de la altitud: </h2><p>'+ this.precisionAltitud +' metros</p></section>'); 
        $("aside:last").append('<section><h2>Rumbo: </h2><p>'+ this.rumbo +' grados</p>'); 
        $("aside:last").append('<section><h2>Velocidad: </h2><p>'+ this.velocidad +' metros/segundo</p></section>');
    }
}

var miPosicion = new Geolocalización();