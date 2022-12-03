class GasofaAPI {
    constructor() {
        this.error = "<p>¡Problemas! No puedo obtener información!</p>";
        this.gasolina;
        this.producto = "1";
        this.conseguirDatos();
        this.ya = true;
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
            for(var j = 0; j < i; j++)
            {
                this.verDatos(aVer[j]);
                existe = true;
            }
            if(!existe) {
                $("aside:last h1").text("No está registrado");
            }
        }
    }

    verDatos(aVer) {
        $("aside:last").append("<section><h2>" + aVer.Rótulo + "</h2></section>");
        $("aside:last section:last").append("<p>Dirección: "+ aVer.Dirección +"</p>");
        $("aside:last section:last").append("<p>Horario: "+ aVer.Horario +"</p>");
        $("aside:last section:last").append("<p>Gasolina 95 E5: " + aVer.PrecioProducto + "€</p>");
    }
}

var gasofa = new GasofaAPI();