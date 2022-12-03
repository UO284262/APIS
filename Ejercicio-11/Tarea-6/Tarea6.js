class Geolocalización {

    constructor() {
        this.error = "<p>¡Problemas! No puedo obtener información!</p>";
        this.gasolina;
        this.producto = "5";
        this.conseguirDatos();
        this.ya = true;
        this.listo = false;
        document.addEventListener('keydown', (event) => {
            this.#ejecutar(event.key);
        });
    }

    #ejecutar(char) {
        switch(char) {
            case "Enter": this.cargarDatos(document.querySelector("input[type=\"text\"]").value); break;
        }
    }

    conseguirDatos() {
        this.url = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroCCAAProducto/03/" + this.producto;
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: data => {
                this.gasolina = data;
                $("input").attr('disabled',false);
                $("button[value='Oviedo']").attr('disabled',false);
                $("button[value='Gijón']").attr('disabled',false);
                $("button[value='Avilés']").attr('disabled',false);
                $("button[value='Pravia']").attr('disabled',false);
                $("button[value='Soto del Barco']").attr('disabled',false);
            },
            error: () => {
                $("aside:last").append(this.error);    
            }
        });
    }

    cargarDatos(municipio) {
        if(this.ya)
        {
            var i = 0;
            var aVer = [];
            for(var e in this.gasolina.ListaEESSPrecio)
            {
                if(e != "length")
                {
                    var p = $(this.gasolina.ListaEESSPrecio).get(e);
                    if(p.Municipio == municipio)
                    {
                        aVer[i] = p;
                        i++;
                    }
                }
            }
            $("aside:last").remove();
            $("aside").after("<aside></aside>");
            $("aside:last").append("<h1>" + municipio + "</h1>");
            var existe = false;
            var gasolineras = [];
            for(var j = 0; j < i; j++)
            {
                this.verDatos(aVer[j]);
                gasolineras[j] = {lat: Number(aVer[j].Latitud.replace(",",".")), lng: Number(aVer[j]['Longitud (WGS84)'].replace(",","."))};
                existe = true;
            }
            if(!existe) {
                $("aside:last h1").text("No está registrado");
            }
            else {
                if(this.listo) this.cargarMapa(gasolineras);
            }
        }
    }

    verDatos(aVer) {
        $("aside:last").append("<section><h2>" + aVer.Rótulo + "</h2></section>");
        $("aside:last section:last").append("<p>Dirección: "+ aVer.Dirección +"</p>");
        $("aside:last section:last").append("<p>Horario: "+ aVer.Horario +"</p>");
        $("aside:last section:last").append("<p>Gasóleo Premium: " + aVer.PrecioProducto + "€</p>");
    }

    cargarMapa(gasolineras) {
        var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 13,center:gasolineras[0]});
        for(var i = 0; i < gasolineras.length; i++)
        {
            new google.maps.Marker({position: gasolineras[i],map:mapa});
        }
    }

    setListo() {
        this.listo = true;
    }
}

var mapaGasofa = new Geolocalización();