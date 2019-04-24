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
          :title="$t('components.modal.title-clos-dia')"
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
            if(this.overlayClose){
              this.$emit('wlclose',$event.target.value)
            }
          }
        }
      },
  };
</script>

<style lang="scss">
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
  background: var(--wl_primary);
}

.modal-close > button{
  margin:0;
  padding:0;
  width:35px;
  background:transparent;
  cursor:pointer;
}

.modal-close > button:hover{
  background:rgba(0, 0, 0, 0.25);
}

.modal-close > button > span{
  display:flex;
  justify-content:center;
  align-items:center;
  color: var(--wl_btn_content);
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
    color: var(--wl_btn_content);
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
  background-color: var(--wl_form_bg);;
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
    color: var(--wl_text);
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
    border-top:1px solid var(--wl_border);
    padding-top:5px;
    width:100%;
}

.modal-confirmacion button{
    margin-bottom:0;
    display:flex;
    justify-content:center;
    cursor:pointer;
    margin-left:10px !important;
    text-transform:uppercase;
}

.modal-confirmacion button:before{
  content:'';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  height: 100%;
}

.modal-confirmacion button:hover:before{
  background:var(--wl_primary_hover);
  width: 100%;
}

.modal-confirmacion button:active:before{
  background:var(--wl_primary_active);
  width: 100%;
}

</style>
