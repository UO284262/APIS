class Geolocalización {
    constructor() {}

    cargarMapa(){
        var oviedo = {lat: 43.397702, lng: -5.704601};
        var mapaOviedo = new google.maps.Map(document.querySelector("aside:last-of-type"),{zoom: 13,center:oviedo});
        new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }
}

var miPosicion = new Geolocalización();