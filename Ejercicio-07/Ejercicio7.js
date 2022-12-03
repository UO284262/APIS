  class Ejercicio7 {
    
    constructor() {
        this.count = 1;
        document.addEventListener('keydown', (event) => {
            this.#ejecutar(event.key);
        });
    }

    #ejecutar(char) {
        switch(char) {
            case "o": this.ocultar(); break;
            case "m": this.mostrar(); break;
            case "s": this.modificar(); break;
            case "a": this.añadir(); break;
            case "b": this.borrar(); break;
            case "r": this.recorrerDOM(); break;
            case "t": this.sumarFilasColumnas(); break;
        }
    }

    sumarFilasColumnas() {
        var resT = 0;
        var res = [[0,0,0],[0,0,0]]
        var count = 0;
        var celdas = $("table tr td");
        celdas.each(e => 
            {
                var celda = celdas.get(e);
                resT += Number($(celda).text());
                var headers = $(celda).attr("headers").split(" ");
                switch(headers[0]) {
                    case "x": res[0][0] += Number($(celda).text()); break;
                    case "y": res[0][1] += Number($(celda).text()); break;
                    case "z": res[0][2] += Number($(celda).text()); break;
                }
                switch(headers[1]) {
                    case "XX": res[1][0] += Number($(celda).text()); break;
                    case "YY": res[1][1] += Number($(celda).text()); break;
                    case "ZZ": res[1][2] += Number($(celda).text()); break;
                }
            });
        $("table tr td[headers='resR resC']").text(resT);
        $("table tr td[headers='x resC']").text(res[0][0]);
        $("table tr td[headers='y resC']").text(res[0][1]);
        $("table tr td[headers='z resC']").text(res[0][2]);
        $("table tr td[headers='resR XX']").text(res[1][0]);
        $("table tr td[headers='resR YY']").text(res[1][1]);
        $("table tr td[headers='resR ZZ']").text(res[1][2]);
    }

    recorrerDOM() {
        var text = ""
        var arbolDOM = $("*",document.body);
        arbolDOM.each(e => text += this.#aTexto(arbolDOM.get(e)))
        $("section:first p:first").text(text);
    }

    #aTexto(e) {
        return "Parent: <" + $(e).parent().get(0).tagName + "> Elemento: <" + $(e).get(0).tagName + ">   ";
    }

    ocultar() {
        $("p").hide();
    }

    añadir() {
        $("ul").append("<li>Elemento añadido "+ this.count + "</li>");
        this.count++;
    }

    borrar() {
        $("ul li:last").remove();
    }

    mostrar() {
        $("p").show();
    }

    modificar() {
        var valor = $("h1:lt(1)").text();
        if(valor == "Framework Laravel") $("h1:lt(1)").text("Laravel Framework");
        else $("h1:lt(1)").text("Framework Laravel");
    }
  }

  var ej7 = new Ejercicio7();