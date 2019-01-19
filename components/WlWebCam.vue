<template>
  <div>
    <div>
      <label class="texto_labels ">
        fotografias
      </label>
      <div class="box_fotografia">
        <div class="foto_usuarios">
          <span 
            v-show="true"
            class="ico-user" 
          />
          <img 
            id="laimagen" 
            alt="fotrografia usuario" 
            src="" 
          >
          <input 
            id="input_usu_foto"
            type="file" 
            :disabled="false" 
          >
          <input 
            id="hidden_input" 
            type="hidden" 
            name="filename"
          >
        </div>
        <div class="botonera_camara">
          <wl-button 
            v-show="true"
            title="tomar foto" 
            :only-icon="true"
            :ico="'ico-camera'"
            :disable="!true"
            @click.native="openCamera()"
          />
          <wl-button 
            v-show="true" 
            title="subir foto" 
            :only-icon="true"
            :ico="'ico-upload'"
            :disable="!true"
            @click.native="selectFile()"
          />
          <wl-button 
            v-show="true" 
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
                id="camaraUsu" 
                ref="webcam"
                width="320" 
                height="240" 
                autoplay
              />
              <canvas 
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
                @click.native="snapshot()"
              >
                tomar foto
              </wl-button>

              <wl-button 
                v-show="!isStreaming"
                title="repetirFoto"
                :ico="'ico-camera'"
                @click.native="repetirFoto()"
              >
                repetir foto
              </wl-button>

              <wl-button 
                v-show="!isStreaming"
                title="guardarFoto"
                :ico="'ico-camera'"
                @click.native="guardarFoto()"
              >
                guardar foto
              </wl-button>
            </div>
          </div>
          <img 
            id="aux_imagen" 
            src 
            style="visibility:hidden;width:0;height:0;"
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
    img : this.$refs.laimagen,
    img2: this.$refs.aux_imagen,
    isStreaming: true,
    }
  },    
  computed: {
    videoElement () {
      return this.$refs.webcam;
    },
    canvasElement () {
      return this.$refs.canvas;
    },
  },
  methods:{   
    openCamera(){
      var video = this.videoElement;
      this.showCamera = true;
      this.webcamStream = true;
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((localMediaStream) => {
          video.srcObject = localMediaStream;
          this.webcamStream = localMediaStream;
          this.existCanvas = true;
        }).catch(function (err) {
          console.log("The following error occured: " + err);
        })                    
      } else {
          console.log("getUserMedia not supported");
      }
    },
    selectFile(){

    },
    deletePhoto(){

    },
    snapshot(){        
      try {// Draws current image from the video element into the canvas
        var video = this.videoElement;
        var canvas = this.canvasElement;
        if (this.existCanvas) {
          var ctx = this.$refs.canvas.getContext('2d');
          console.log("nnn2aa");
          video;
          console.log("nnn2bb");
          canvas.width;
          console.log("nnn2cc");
          ctx;
          console.log("nnn2dd");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          console.log("nnn3");
          this.img2.src = this.canvas.toDataURL("image/jpeg");
          console.log("nnn4");
          this.isStreaming = !this.isStreaming;
          console.log("nnn5");
        } else {
          console.log("Active la camara");
        }
      } catch (error){                        
        console.log("Existe problemas con su camara",error);
      }
    },
    guardarFoto() {
      var canvasAux = document.createElement("canvas");
      canvasAux.id = "canvasAux";
      canvasAux.height = 170;
      canvasAux.width = 150;
      var context = canvasAux.getContext('2d');

      context.drawImage(img2, 85, 40, 150, 170, 0, 0, 150, 170);
      img.src = canvasAux.toDataURL("image/jpeg");
      img.style.visibility = "unset";

      var imageData = canvas.toDataURL('image/png');
      var params = "filename=" + imageData;

      document.getElementById("hidden_input").setAttribute("value", params);
      var files = document.getElementById("hidden_input");
      console.log(files);

      canvasAux.toBlob(function (image) { blob = image; });
      isStreaming = true;
      existCanvas = false;
      cerrarCamara();
    },
    repetirFoto() {
          canvas.width = canvas.width;//limpiar contenido del canvas  
          isStreaming = !isStreaming;
          existCanvas = true;
    },
    stopWebcam(){
      this.webcamStream.getVideoTracks()[0].stop();
    },
    closeCamera() {
      try {
        stopWebcam();
        existCanvas = false;
        foto = true;
        show = false;
      } catch (error){
        console.log("Existe problemas con su camara");
        show = false;
      }
    },
    closeModal(){
      this.$emit('wlclose',$event.target.value)        
    },
  },
}
</script>

<style>
/**********************/
.box_fotografia{
    display:flex;
    margin-top:2px;
}

.foto_usuarios{
    border:1px solid #bbb;
    min-width:150px !important;
    width:150px !important;
    height:170px;
    text-align:center;
}

.foto_usuarios > span:before{   
    color:#ddd;
    font-size:120px;
    display:block;
    margin-top:20px;    
}

#laimagen{
    width:100%;
    height:100%;
    visibility:hidden;
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

.botonera_fotografia > button{
    margin-left:15px;
}
.botonera_fotografia > button:first-child{
    margin-left:0;
}

.canvas_container{
    position:relative;
    display:flex;
    justify-content:center; 
}

.canvas_container:after{
    content:"";
    position:absolute;
    top:40px;
    left:85px;
    height:170px;
    width:150px;
    border:2px solid #ffffff;
}
</style>
