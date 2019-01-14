<template>
  <div     
    class="modal ani-modal-delay"
  >  
    <div 
      class="modal-overlay"
      @click="closeModal($event,false)"
    />
    <!--Simula la opacidad de fondo del dialogo-->      
    <div 
      class="modal-dialog ani-modal-info" 
      tabindex="1"
    >
      <div class="modal-close">            
        <div class="titulo-modal">
          {{ title }}
        </div>
        <button 
          title="Cerrar Dialogo" 
          @click="closeModal($event,true)"
        >
          <span class="ico-times" />
        </button>
      </div>
      <div class="modal-transclude">
        <slot name="wl-content" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      props: {
        title: { type: String, default: "" },
        overlayClose: { type: Boolean, default: false },        
      },
      methods:{
        closeModal($event, fromButton){
          if(fromButton){
            this.$emit('wlclose',$event.target.value)
          }else{
            if(overlayClose){
              this.$emit('wlclose',$event.target.value)
            }
          }
        }
      },
  };
</script>

<style lang="scss" scoped>
.modal{
  position:fixed;
  top:0;
  left:0;
  z-index:9999;
  width:100%;
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
}

.modal-close {
  width:100%;
  height:40px;
  display:flex;
  justify-content:flex-end;
  border-bottom: 1px solid #ccc;
  background:#00796B;
}

.modal-close > button{
  margin:0;
  padding:0;
  width:35px;
  background:transparent;
  cursor:pointer;
}

.modal-close > button:hover{
  background:rgba(0, 0, 0, 0.10);
}

.modal-close > button > span{
  display:flex;
  justify-content:center;
  align-items:center;
  color:#fff;
  font-size:1.3rem;
}

.titulo-modal{
    flex:1;    
    padding:0 15px;
    height:100%;
    display:flex;
    align-self:center;
    align-items:center;
    font-size: 1em;
    text-transform:capitalize;
    color:#fff;
}

/* opacididad de la pantalla */
.modal-overlay {
  position:fixed;
  top:0;
  left:0;
  z-index:9999;
  width:100%;
  height:100vh;
  background-color:#000;
  opacity: 0.5;
}

/*contenedor del close y el transclude*/
.modal-dialog {
  z-index:10000;
  width: auto;
  max-width:100vw;
  height:auto;
  display:flex;
  flex-direction:column;
  align-self:center;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.71);
}

/*contenido del modal en el transclude*/
.modal-transclude {
    overflow-y: auto;
    max-height: 80vh;    
}


/*=========================================================*/
/*Personalizacion del transclude*/
.modal-contenido{
    display:flex;
    padding:15px;
    color:#444;
}

.modal-contenido > span{
    font-size:2.5rem;
    display:flex;
    align-items:center;
    padding-right:10px;
}

.modal-contenido > div {
    flex:1;
    display:flex;
    align-items:center;
    align-self:center;
}

.modal-confirmacion{
    margin-top:20px;
    display:flex;
    justify-content:flex-end;
    border-top:1px solid #bbb;
    padding-top:5px;
    width:100%;
}

.modal-confirmacion button{
    margin-bottom:0;
    background:white;
    display:flex;
    justify-content:center;
    border:1px solid #ccc;
    cursor:pointer;
    margin-left:5px;
    color:#333;
    text-transform:uppercase;
}

.modal-confirmacion button:hover{
    background:#ddd;
}

.modal-confirmacion button.green {
    background: #0F745B;
    border-color:#0F745B;
    color:#fff;
}
.modal-confirmacion button.green:hover {
    background: #099472;
}
</style>
