<template>
  <div>
    <div>
      <label class="texto_labels ">  
        {{ $t('components.webcam.label-foto-user') }}
      </label>
      <div class="box_fotografia">
        <div class="foto_usuarios">
          <wl-load2 
            v-if="isLoading"          
            class="loading-photo"
          />        
          <span 
            v-show="(!trash || !loadingSuccess) && !isLoading" 
            class="ico-user" 
          />
          <img             
            v-show="trash && loadingSuccess && !isLoading"
            id="laimagen"
            ref="imgShowed"
            :alt="$t('components.webcam.alt-foto-user')" 
            :src="photoFile"
            @load="showPhoto"
          >
          <input 
            id="input_usu_foto"
            ref="inputToLoad"
            title="archivo foto de usuario"
            type="file" 
            :disabled="disable" 
            @change="loadPhoto"
          >
          <input 
            id="hidden_input" 
            name="filename"
            title="fotografia de usuario"
            type="hidden" 
          >
        </div>
        <div class="botonera_camara">
          <wl-button 
            :title="$t('components.webcam.b-title-take-photo')"  
            :only-icon="true"
            :ico="'ico-camera'"
            :disable="disable"
            @click.native="openCamera()"
          />
          <wl-button 
            :title="$t('components.webcam.b-title-up-photo')"
            :only-icon="true"
            :ico="'ico-upload'"
            :disable="disable"            
            @click.native="selectFile()"
          />
          <wl-button 
            v-show="trash" 
            :title="$t('components.webcam.b-title-del-photo')"
            :only-icon="true"
            :ico="'ico-trash'"
            :disable="disable"            
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
            {{ $t('components.webcam.take-photo') }}
          </div>
          <button 
            :title="$t('components.webcam.title-clos-web')"
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
                :title="$t('components.webcam.title-del-photo')"
                :ico="'ico-camera'"
                class="c1"
                @click.native="snapshot()"
              >
                {{ $t('components.webcam.w-take-photo') }}
              </wl-button>

              <wl-button 
                v-show="!isStreaming"
                :title="$t('components.webcam.b-rep-photo')"
                :ico="'ico-camera'"
                class="c2"
                @click.native="repetirFoto()"
              >
                {{ $t('components.webcam.rep-photo') }}
              </wl-button>

              <wl-button 
                v-show="!isStreaming"
                :title="$t('components.webcam.b-save-photo')"
                :ico="'ico-camera'"
                class="c3"
                @click.native="savePhoto()"
              >
                {{ $t('components.webcam.save-photo') }}
              </wl-button>
            </div>
          </div>
          <img 
            ref="imgAux"
            class="img-aux"
            src=""
            alt="auxiliar"
          >          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";
import WlLoad2 from "~/components/WlLoad2.vue";

export default {
  components: {
    WlButton,
    WlLoad2,
  },
  props: {
    title: { type: String, default: "" },
    overlayClose: { type: Boolean, default: false },
    photoFile: {type:String, default:""},      
    disable: { type: Boolean, default: true },  
    isLoading: { type: Boolean, default: false },  
    loadingSuccess: { type: Boolean, default: false },  
    trash: { type: Boolean, default: false },
  },
  data() {
  return {
    showCamera: false,
    webcamStream: null,
    existCanvas: false,
    isStreaming: true,
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
          alert( this.$t('components.webcam.alert-no-sup-webcam'));
      }    
    },
    errorOpenCamera(error){
        if ((error.name == 'NotAllowedError') || (error.name == 'PermissionDismissedError')) {        
          alert( this.$t('components.webcam.alert-act-web-fun'))
          this.closeCamera();
      }
    },
    selectFile(){
      this.$refs.inputToLoad.click();
    },
    loadPhoto(e){
      var imgOrig = this.imageElement;
      var files = e.target.files;
      var f = files[0];
      var leerArchivo = new FileReader();

      var img = document.createElement("img");      
      leerArchivo.onload = (e) => {        
        img.src = e.target.result;
        img.onload = () => {
          var canvas = this.rescalePicture(img)          
          imgOrig.src = canvas.toDataURL(f.type);
          this.$emit('loading-success');
          this.convertToFile(imgOrig.src);
        };             
      };
      leerArchivo.readAsDataURL(f);//para q el archivo sea leido 
    },
    rescalePicture(img){
      var width = img.width;
      var height = img.height;
      var MAX_WIDTH = 155;
      var MAX_HEIGHT = 200;
      var ratio = MAX_WIDTH/MAX_HEIGHT;
      var ratioImg = width/height;                      
      var dx = 0;
      var dy = 0;
                
      var canvas = document.createElement("canvas");
      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;
      var ctx = canvas.getContext("2d");
          
      if (width >= height) {
        if(ratioImg<ratio){
          dy = (height - (height * ratio))/2;
          height = height * ratio;
        }else{
          if(ratioImg > 1){
            ratio = MAX_HEIGHT/MAX_WIDTH;
            ratioImg = height/width;
            ratio = ratioImg/ratio;
          } 
          dx = (width - (width * ratio))/2;
          width = width * ratio;             
        }                     
      } else {
          if(ratioImg>ratio){
            dx = (width - (width * ratio))/2;
            width = width * ratio;                   
          }else{
            dy = (height - (height * ratio))/2;
            height = height * ratio;
          }
      }           
        
      ctx.drawImage(img, dx, dy, width, height,0,0,MAX_WIDTH,MAX_HEIGHT);
      return canvas;
    },
    deletePhoto(){
      var img = this.imageElement;
      img.src = "";
      img.style.visibility = "hidden";
      this.$emit('show-trash',false);
      this.$emit('new-file', null);
      this.$emit('was-change');
    },
    showPhoto(){      
      var img = this.imageElement;
      img.style.visibility = "unset";
      this.$emit('show-trash',true);
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
          alert( this.$t('components.webcam.alert-act-webcam'));
        }
      } catch (error){                      
        alert( this.$t('components.webcam.alert-ex-pro-webcam'));
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
      img.style.display = "unset";
      this.convertToFile(img.src);
      var imageData = canvas.toDataURL('image/png');
      var params = "filename=" + imageData;
      document.getElementById("hidden_input").setAttribute("value", params);
      var files = document.getElementById("hidden_input");
      this.isStreaming = true;
      this.existCanvas = false;
      this.$emit('loading-success');
      this.$emit('show-trash',false);      
      this.$emit('was-change');
      this.closeCamera();
      
    },
    convertToFile(source){
      let dataUrl = source.split(',')
      let base64 = dataUrl[1];
      let mime = dataUrl[0].match(/:(.*?);/)[1];
      let bin = atob(base64);
      let length = bin.length;
      let buf = new ArrayBuffer(length);
      let arr = new Uint8Array(buf);
      bin
        .split('')
        .forEach((e,i)=>arr[i]=e.charCodeAt(0));      
      var objCreado = new File([buf],'filename',{type:mime}); // note: [buf]
      this.$emit('new-file', objCreado);
      this.$emit('was-change');
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
        alert( this.$t('components.webcam.alert-ex-pro-webcam'));
        this.showCamera = false;
      }
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
    border:1px solid var(--wl_gray);
    min-width:150px !important;
    width:150px !important;
    height:190px;
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.foto_usuarios > span:before{   
    background: transparent;
    color:var(--wl_gray_light);
    font-size:120px;
    display:block;    
}

#laimagen{
    width:auto; /* you can use % */
    height: 190px;
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
