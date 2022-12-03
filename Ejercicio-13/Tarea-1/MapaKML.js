class MapaKML {
    constructor() {
      if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
        document.write("<p>Este navegador soporta el API File </p>");
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }

    leerKML() {
		    var files = document.querySelector("input[type='file']").files;
		    if(files == null || files.length == 0) {return;}
        var file = files[0];
        $("main").text("");
        if(file.name.match(/.*\.kml/))
        {
          var reader = new FileReader();
          reader.onload = function (evento)  {
            MapaKML.analizarKML(reader.result);
          };
          reader.readAsText(file);
        }
        else {
          $("main").text("Archivo no válido");
        }
    }

    static analizarKML(kml) {
      var coorKML = [];
      var coordenadas = $("coordinates",kml);
      for(var i = 0; i < coordenadas.length; i++) {
        var coor = coordenadas[i].textContent.split(",");
        coorKML[i] = {lat: Number(coor[1]), lng: Number(coor[0])};
      }
      MapaKML.cargarMapa(coorKML);
    }

    static cargarMapa(coorKML) {
      if(coorKML == null || coorKML.length == 0) return;
        var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 10,center:coorKML[0]});
        for(var i = 0; i < coorKML.length; i++)
        {
            new google.maps.Marker({position: coorKML[i],map:mapa});
        }
    }

    nada() {}
}

var mapaKML = new MapaKML();