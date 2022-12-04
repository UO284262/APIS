class AppAPIs {
    constructor() {
      this.audioContext;
      this.track;
      this.gainNode;
      this.panner;
      this.ready = false;
      document.addEventListener("visibilitychange", () => {
        if(this.ready) {
          if (document.hidden) {
            this.cambiarVolumen(this.gainNode.gain.value/3);
          } else {
            this.cambiarVolumen(this.gainNode.gain.value*3);
          }
        }
      })
    }

    leerFile() {
        var files = document.querySelector("input[type='file']").files;
		if(files == null || files.length == 0) {return;}
        var file = files[0];
        
        if (file.type.match(/audio.mpeg/)) {
              document.querySelector("audio").src = "Musica/" + file.name;
              this.#activarBotones();
        }
        var button = document.querySelector("button[value = \"PlayPause\"]"); 
        if(button.textContent == "Pause") {
            this.song.pause();
            button.textContent = "Play";
        }
    }

    loadAudio() {
        this.song = document.querySelector("audio");
        this.#cargarEventos();
        this.audioContext = new AudioContext();
        this.track = this.audioContext.createMediaElementSource(this.song);
        this.gainNode = this.audioContext.createGain();
        this.panner = this.audioContext.createStereoPanner({pan: 0});
        this.track.connect(this.gainNode).connect(this.panner).connect(this.audioContext.destination);
        $("button[value='escuchar']:first").attr("disabled",true);
        $("input[type='file']").attr("disabled",false);
        this.ready = true;
    }

    #activarBotones() {
      if (window.File && window.FileReader && window.FileList && window.Blob) 
      {  
          $("button[value='PlayPause']").attr("disabled",false);
          $("input[type='range']:last").attr("disabled",false);
          $("input[type='range']:first").attr("disabled",false);
      }
      else $("aside:last").append("<p>Este navegador no es compatible con esta aplicación. (API FILE no soportada)</p>");        
    }

    #cargarEventos() {
      this.song.addEventListener(
        "ended",
        () => {
          document.querySelector("button[value = \"PlayPause\"]").textContent = "Play";
        },
        false
      );
      var volume = document.querySelector("input[type=\"range\"][name='volumen']")
      volume.addEventListener(
        "input",
        () => {
          this.cambiarVolumen(volume.value);
        },
        false
      );
      var estereo = document.querySelector("input[type=\"range\"][name='stereo']")
      estereo.addEventListener(
        "input",
        () => {
          this.cambiarStereo(estereo.value);
        },
        false
      );
    }

    cambiarVolumen(value) {
      this.gainNode.gain.value = value;
    }

    cambiarStereo(value) {
      this.panner.pan.value = value;
    }

    playPause() {
        var button = document.querySelector("button[value = \"PlayPause\"]"); 
        if(button.textContent == "Play") {
            this.song.play();
            button.textContent = "Pause";
        }
        else {
            this.song.pause();
            button.textContent = "Play";
        }
    }
}

var app = new AppAPIs();