<template>
  <div>
    <div class="controles_box_right">        
      <wl-button 
        v-show="!isNew"
        :ico="'ico-pencil'"                 
        @click.native="isEdit = true"
      >
        editar
      </wl-button>
      <wl-button 
        v-show="!isNew"
        :ico="'ico-trash'"                 
        @click.native="remove()"
      >
        eliminar
      </wl-button>
    </div>

    <slot name="wl-form" />

    <div class="controles_box_right down">
      <wl-button 
        v-show="isEdit || isNew" 
        :ico="'ico-floppy-o'" 
        @click.native="ok($event)"
      >
        Aceptar
      </wl-button>
      
      <wl-button 
        v-show="isEdit || isNew"
        :ico="'ico-times'"  
        @click.native="cancel($event)"
      >
        Cancelar
      </wl-button>
    </div>

    <!-- Modal confirmacion -->
    <wl-modal
      v-if="showDialog"
      :title="'Confirmación'"
      @wlclose="closeModal"
    >
      <template 
        slot="wl-content" 
        class="generic-box-vertical"
      >
        <p>
          ¿EstaSeguroDeseaEliminar "{{ objSelect.name }}"?
        </p>
        <div class="a-modal-confirmacion">
          <wl-button @click.native="okModal($event)">
            Eliminar
          </wl-button>          
          <wl-button @click.native="closeModal()">
            Cancelar
          </wl-button>
        </div>
      </template>
    </wl-modal>
  </div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";
import WlModal from "~/components/WlModal.vue";

export default {
  components: {
    WlButton,
    WlModal,
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
    },
    isNew: {type: Boolean, default: false },
  },
  data() {
    return {
      isEdit: false,
      isProcess: false,
      hasError: false,
      curObject: null,
      showDialog: false,
    };
  },
  created() {
    this.curObject = this.objSelect;
  },
  methods: {    
    remove(){
      this.showDialog = true;
    },
    cancel($event){    
      this.$emit('wlcancel',$event.target.value);
    },
    ok($event){
      if(this.isEdit){
        this.$emit('wlupdate',$event.target.value);
      }
      else if(this.isNew){
        this.$emit('wlcreate',$event.target.value);
      }
    },
    closeModal(){
      this.showDialog = false;
    },
    okModal($event){
      this.showDialog = false;
      this.$emit('wldelete',$event.target.value);
    },
  }
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
