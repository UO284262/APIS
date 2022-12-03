class MapaGeoJSON {
    constructor() {
      if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
        document.write("<p>Este navegador soporta el API File </p>");
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }

    leerGeoJSON() {
        var files = document.querySelector("input[type='file']").files;
		if(files == null || files.length == 0) {return;}
        var file = files[0];
        $("main").text("");
        if(file.name.match(/.*\.geojson/))
        {
          var reader = new FileReader();
          reader.onload = function (evento)  {
            MapaGeoJSON.analizarGeoJSON(reader.result);
          };
          reader.readAsText(file);
        }
        else {
          $("main").text("Archivo no válido");
        }
    }

    static analizarGeoJSON(GeoJSON) {
      var coorGeoJSON = [];
      var coordenadas = GeoJSON.match(/\"coordinates\": \[\n\s*.*,\n\s*.*\n\s*\]/g);
      for(var i = 0; i < coordenadas.length; i++) {
        var coor = coordenadas[i].match(/\-?[\d]+\.[\d]+/g);
        coorGeoJSON[i] = {lat: Number(coor[1]), lng: Number(coor[0])};
      }
      MapaGeoJSON.cargarMapa(coorGeoJSON);
    }

    static cargarMapa(coorGeoJSON) {
      var mapa = new google.maps.Map(document.querySelector("main"),{zoom: 10,center:coorGeoJSON[0]});
      for(var i = 0; i < coorGeoJSON.length; i++)
      {
          new google.maps.Marker({position: coorGeoJSON[i],map:mapa});
      }
    }

    nada() {}
}

var mapaGeoJSON = new MapaGeoJSON();