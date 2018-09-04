<template>
  <div 
    v-show="show"
    class='a-modal ani-modal-delay'>
    
    <div 
      class='a-modal-overlay' @click="$emit('close')"></div><!--Simula la opacidad de fondo del dialogo-->
    
    <div class='a-modal-dialog ani-modal-info' tabindex="1">
        
        <div :class="['a-modal-close',color]">
            
            <div :class="['a-titulo-modal', color]">{{ title }}</div>
            
            <button title="Cerrar Dialogo" @click="$emit('close')">
                <span class="ico-times"></span>
            </button>

        </div>

        <div class='a-modal-transclude'>
          <slot name="wl-content"/>
        </div>

    </div>
  </div>
</template>

<script>
export default {};



function hola(){

}
</script>

<style>
</style>
