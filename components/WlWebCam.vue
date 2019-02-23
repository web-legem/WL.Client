<template>
  <div>
    <div>
      <label class="texto_labels ">
        fotografia de usuario
      </label>
      <div class="box_fotografia">
        <div class="foto_usuarios">
          <span 
            v-show="!trash"
            class="ico-user" 
          />
          <img 
            v-show="trash"
            id="laimagen"
            ref="imgShowed"
            alt="fotrografia usuario" 
            src=""
            @load="showPhoto"
          >
          <input 
            id="input_usu_foto"
            ref="inputToLoad"
            type="file" 
            :disabled="false" 
            @change="loadPhoto"
          >
          <input 
            id="hidden_input" 
            type="hidden" 
            name="filename"
          >
        </div>
        <div class="botonera_camara">
          <wl-button 
            title="tomar foto" 
            :only-icon="true"
            :ico="'ico-camera'"
            :disable="!true"
            @click.native="openCamera()"
          />
          <wl-button 
            title="subir foto" 
            :only-icon="true"
            :ico="'ico-upload'"
            :disable="!true"
            @click.native="selectFile()"
          />
          <wl-button 
            v-show="trash" 
            title="BorrarFoto" 
            :only-icon="true"
            :ico="'ico-trash'"
            :disable="!true"
            @click.native="deletePhoto()"
          />
        </div>
      </div>
    </div>
    <div 
      v-show="showCamera"
      class="modal" 
    >           
      <div 
        class="modal-overlay" 
        @click="closeCamera()"
      />            
      <div class="modal-dialog">
        <div class="modal-close">
          <div class="titulo-modal">
            Hacer foto
          </div>
          <button 
            title="cerrar camara" 
            @click="closeCamera()"
          >
            <span class="ico-times" />
          </button>
        </div>
        <div class="modal-contenido">
          <div class="contenido_fotografia">
            <div 
              class="canvas_container"             
            >          
              <video 
                v-show="isStreaming"
                id="camaraUsu" 
                ref="webcam"
                width="320" 
                height="240" 
                autoplay
              />
              <canvas 
                v-show="!isStreaming"
                id="fotoUsu" 
                ref="canvas"
                width="320" 
                height="240"
              />
            </div>

            <div class="botonera_fotografia">
              <wl-button 
                v-show="isStreaming"
                title="BorrarFoto"
                :ico="'ico-camera'"
                class="c1"
                @click.native="snapshot()"
              >
                tomar foto
              </wl-button>

              <wl-button 
                v-show="!isStreaming"
                title="repetirFoto"
                :ico="'ico-camera'"
                class="c2"
                @click.native="repetirFoto()"
              >
                repetir foto
              </wl-button>

              <wl-button 
                v-show="!isStreaming"
                title="savePhoto"
                :ico="'ico-camera'"
                class="c3"
                @click.native="savePhoto()"
              >
                guardar foto
              </wl-button>
            </div>
          </div>
          <img 
            ref="imgAux"
            class="img-aux"
            src=""
          >          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";

export default {
  components: {
    WlButton,
  },
  props: {
    title: { type: String, default: "" },
    overlayClose: { type: Boolean, default: false },          
  },
  data() {
  return {
    showCamera: false,
    webcamStream: null,
    existCanvas: false,
    isStreaming: true,
    trash: false,
    }
  },    
  computed: {
    videoElement () {return this.$refs.webcam},
    canvasElement () {return this.$refs.canvas},
    imageElement () {return this.$refs.imgShowed},
    imageAuxElement () {return this.$refs.imgAux},
  },
  methods:{   
    openCamera(){
      var video = this.videoElement;
      this.showCamera = true;
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
          video.srcObject = localMediaStream;
          this.webcamStream = localMediaStream;
          this.existCanvas = true;
          },this.errorOpenCamera
        ).catch(function (err) {
          alert("The following error occured: " + err);
        })                    
      } else {
          alert("No tiene soporte para uso de la webCam");
          console.log("getUserMedia not supported");
      }    
    },
    errorOpenCamera(error){
        if ((error.name == 'NotAllowedError') || (error.name == 'PermissionDismissedError')) {        
          alert("Debe activar la camara para usar esta función")
          this.closeCamera();
      }
    },
    selectFile(){
      this.$refs.inputToLoad.click();
    },
    loadPhoto(e){
      var img = this.imageElement;
      var files = e.target.files;
      var f = files[0];
      var leerArchivo = new FileReader();
      leerArchivo.onload = (e) => {
          img.src = e.target.result;

      };
      leerArchivo.readAsDataURL(f);//para q el archivo sea leido 
    },
    deletePhoto(){
      var img = this.imageElement;
      img.src = "";
      this.trash = false;
      img.style.visibility = "hidden";
    },
    showPhoto(){      
      var img = this.imageElement;      
      this.trash = true;
      img.style.visibility = "unset";
    },
    snapshot(){        
      try {// Draws current image from the video element into the canvas
        var video = this.videoElement;
        var canvas = this.canvasElement;
        var imgAux = this.imageAuxElement;
        
        if (this.existCanvas && canvas) {
          canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
          imgAux.src = canvas.toDataURL("image/jpeg");
          this.isStreaming = false;
        } else {
          alert("Active la camara por favor");
        }
      } catch (error){                      
        alert("Existe problemas con su camara");
        console.log(error);
      }
    },
    savePhoto() {
      var img = this.imageElement;
      var imgAux = this.imageAuxElement;
      var canvas = this.canvasElement;

      var canvasAux = document.createElement("canvas");
      canvasAux.id = "canvasAux";
      canvasAux.height = 200;
      canvasAux.width = 155;
      
      canvasAux.getContext('2d').drawImage(imgAux, 80, 20, 155, 200, 0, 0, 155, 200);
      img.src = canvasAux.toDataURL("image/jpeg");
      img.style.visibility = "unset";
      var imageData = canvas.toDataURL('image/png');
      var params = "filename=" + imageData;
      document.getElementById("hidden_input").setAttribute("value", params);
      var files = document.getElementById("hidden_input");
      this.isStreaming = true;
      this.existCanvas = false;
      this.closeCamera();
    },
    repetirFoto() {
        var canvas = this.canvasElement;
        canvas.width = canvas.width;//limpiar contenido del canvas  
        this.isStreaming = true;
        this.existCanvas = true;
    },
    closeCamera() {
      try {
        if(this.webcamStream != null){
          this.webcamStream.getVideoTracks()[0].stop();          
        }
        this.existCanvas = false;
        this.foto = true;
        this.showCamera = false;
      } catch (error){
        alert("Existe problemas con su camara");
        console.log(error);
        this.showCamera = false;
      }
    },
    closeModal(){
      this.$emit('wlclose',$event.target.value)        
    },
  },
}
</script>

<style>
.box_fotografia{
    display:flex;
    margin-top:2px;
}

.foto_usuarios{
    border:1px solid #bbb;
    min-width:150px !important;
    width:150px !important;
    height:190px;
    text-align:center;
}

.foto_usuarios > span:before{   
    color:#ddd;
    font-size:120px;
    display:block;
    margin-top:30px;    
}

#laimagen{
    width:100%;
    height:100%;
}

.botonera_camara {
    display:flex;
    flex-direction:column;
    justify-content:flex-start !important;
    margin-left:5px;
}
.botonera_camara > button{
    margin-bottom:5px;
}

/*-----input para subir foto-------*/
#input_usu_foto{
    display: none;
}

/*--Fin input para subir foto-------*/

.difuminar.ng-hide-remove {
    animation: .9s fadeIn;
}

/* --------------- */

.contenido_fotografia{
    display:flex;
    flex-direction:column;
}

.botonera_fotografia{
    display:flex;
    margin-top:15px;
    justify-content:flex-end;
    width:100%;
}

.botonera_fotografia .c2,
.botonera_fotografia .c3
{
    margin-left:15px;
}

.canvas_container{
    position:relative;
    display:flex;
    justify-content:center; 
}

.canvas_container:after{
    content:"";
    position:absolute;
    top:20px;
    left:80px;
    height:200px;
    width:155px;
    border:2px solid #ffffff;
}

.img-aux{
  visibility:hidden;
  width:0;
  height:0;
}
</style>
