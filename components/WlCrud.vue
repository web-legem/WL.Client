<template>
  <div>
    <div class="controles_box_right">        
      <wl-button 
        v-show="true" 
        :ico="'ico-pencil'"         
        :disable="true"
        @click.native="edit()">editar
      </wl-button>
      
      <wl-button 
        v-show="true" 
        :ico="'ico-trash'"         
        :disable="true"
        @click.native="remove()">eliminar
      </wl-button>
      
      <wl-button 
        v-show="true" 
        :ico="'ico-plus'"         
        :disable="true"
        @click.native="create()">nuevo
      </wl-button>
    </div>

    este es el obj : {{ objSelect != null ? objSelect.name: "aun esta null" }}
    <br>
    este es el resultado: {{ 'constante showMod' }}
    <br>
    este es el obj : {{ curObject != null ? curObject.name: "aun esta null el nuevo objecto" }}


    <slot name="wl-form"/>

    <div class="controles_box_right down">
      <wl-button 
        v-show ="isEdit"           
        :ico="'ico-floppy-o'" 
        :disable="true"
        @click.native="ok()">Aceptar
      </wl-button>
      
      <wl-button 
        v-show="isEdit"
        :ico="'ico-times'"  
        :disable="true"
        @click.native="cancel()">Cancelar
      </wl-button>
    </div>
  </div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";

export default {
  components: {
    WlButton
  },
  props: {
    objSelect: {
      type: Object,
      default: function() {
        return {
          id: -1,
          name: "elemento"
        };
      }
    }
  },
  data() {
    return {
      isNew: false,
      isEdit: false,
      isProcess: false,
      hasError: false,
      curObject: null
    };
  },
  created() {
    this.curObject = this.objSelect;
  },

};
</script>

<style lang="scss" scoped>
.controles_box_right {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-bottom: solid 1px #e2e2e2;
  margin-bottom: 10px;
}

.controles_box_right.down {
  border-bottom: none;
  border-top: solid 1px #e2e2e2;
  margin-bottom: 0;
  margin-top: 10px;
}

.controles_box_right.down button {
  margin-bottom: 0;
  margin-top: 10px;
}

.controles_box_right button {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
