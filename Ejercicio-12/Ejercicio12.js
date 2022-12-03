class FileAPI {
    constructor() {
      if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
        document.write("<p>Este navegador soporta el API File </p>");
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }

    analizarFiles() {
		var files = document.querySelector("input[type='file']").files;
		if(files == null || files.length == 0) {return;}
        var file = files[0];
        var tamaño = file.size;
        var name = file.name;
        var lastModifiedDate = file.lastModifiedDate;
        var type = file.type;
        var contenido = "";

        $("main aside:first").text("");
        $("main aside:first").append("<p>Nombre del archivo: " + name + "</p>")
        $("main aside:first").append("<p>Tamaño del archivo: " + tamaño + " bytes</p>")
        $("main aside:first").append("<p>Tipo del archivo: " + type + "</p>")
        $("main aside:first").append("<p>Fecha de modificación: " + lastModifiedDate + "</p>")
        $("main aside:last").text("");
        
        if (type.match(/text.plain/) || type.match(/text.xml/) || type.match(/application.json/)) { 
            var reader = new FileReader();
            reader.onload = (evento) =>  {
              $("main aside:last").text("");
              $("main aside:last").append("<p>Contenido del archivo:</p>");
              $("main aside:last").append("<pre></pre>");
              $("main aside:last-of-type pre").text(reader.result);
            };
            reader.readAsText(file);
        }
    }
}

var fileReader = new FileAPI();