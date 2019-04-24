<template>
  <div>
    <div class="controles_box_right">        
      <wl-button 
        v-show="!isNew"
        :disable="disableButtons"
        :ico="'ico-pencil'"
        @click.native="startEdit($event)"
      >
        {{ $t('components.crud.butt-edit') }}
      </wl-button>
      <wl-button 
        v-show="!isNew"
        :disable="disableButtons || isEdit"
        :ico="'ico-trash'"                 
        @click.native="remove()"
      >
        {{ $t('components.crud.butt-delete') }}
      </wl-button>
    </div>

    <slot name="wl-form" />

    <div class="controles_box_right down">
      <wl-button 
        v-show="isEdit || isNew" 
        :ico="'ico-floppy-o'" 
        @click.native="ok($event)"
      >
        {{ $t('components.crud.butt-accept') }}
      </wl-button>
      
      <wl-button 
        v-show="isEdit || isNew"
        :ico="'ico-times'"  
        @click.native="cancel($event)"
      >
        {{ $t('components.crud.butt-cancel') }}
      </wl-button>
    </div>
    <!-- Modal confirmacion -->
    <wl-modal
      v-if="showDialog"
      :title="$t('components.crud.title-confirm')"
      @wlclose="closeModal"
    >
      <template slot="wl-content">
        <div class="generic-box-vertical content-modal">
          <div>{{ $t('components.crud.div-sure-delete') }} "{{ objSelect.name }}"?</div>
        </div>
        <div class="modal-confirmacion confirm-dialog content-modal-buttons">
          <wl-button 
            class="green"
            ico="ico-trash" 
            @click.native="okModal($event)"            
          >
            {{ $t('components.crud.butt-delete') }}
          </wl-button>          
          <wl-button 
            ico="ico-times"
            @click.native="closeModal()"
          >
            {{ $t('components.crud.butt-cancel') }}
          </wl-button>
        </div>
      </template>
    </wl-modal>
    <!-- Modal Error -->
    <wl-modal
      v-if="error"
      :title="$t('components.crud.title-info')"
      @wlclose="clearErrorsa"
    >
      <template slot="wl-content">
        <div ref="errormsg" class="generic-box-vertical content-modal">
          <p v-html="error.message" />    
        </div>
        <div class="modal-confirmacion content-modal-buttons">
          <wl-button 
            class="green"
            ico="ico-check"
            @click.native="clearError($event)"
          >
            {{ $t('components.crud.butt-accept') }}
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
    error: {
      type: Error,
      default: null
    },
    disableButtons: {type: Boolean, default: false },
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
    startEdit($event){
      this.isEdit = true
      this.$emit('wlstartedit',$event.target.value);     
    },
    closeModal(){
      this.showDialog = false;
    },
    okModal($event){
      this.showDialog = false;
      this.$emit('wldelete',$event.target.value);
    },
    clearError($event){
      this.$emit('wlclearerror',$event.target.value);
    },
    clearErrorsa(){
      this.$emit('wlclearerror');
    },
  }
};
</script>

<style lang="scss" scoped>
.controles_box_right {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-bottom: solid 1px var(--wl_border);
  margin-bottom: 10px;
}

.controles_box_right.down {
  border-bottom: none;
  border-top: solid 1px var(--wl_border);
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

.content-modal{  
  min-width: 400px;
  max-width: 600px;
  padding: 10px;  
  margin-bottom: -10px;
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}

</style>
