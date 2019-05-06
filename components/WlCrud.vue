<template>
  <div>
    <form 
      name="form-general"
      data-vv-scope="form1"
      @submit.prevent
    >
      <div class="controles_box_right">             
        <wl-button 
          v-show="!isNew && !wasNotFound"
          :disable="disableButtons"
          :ico="'ico-pencil'"
          @click.native="startEdit($event)"
        >
          {{ $t('components.crud.butt-edit') }}
        </wl-button>
        <wl-button 
          v-show="!isNew && !wasNotFound"
          :disable="disableButtons || isEdit"
          :ico="'ico-trash'"                 
          @click.native="remove()"
        >
          {{ $t('components.crud.butt-delete') }}
        </wl-button>
      </div>

      <slot name="wl-form" />    

      <div class="controles_box_right down">
        <div
          v-if="isLoading"
          class="progress-container"
        >        
          <div class="progress-line" />            
          <span>
            {{ $t('components.crud.loading') }}
          </span>
        </div>    

        <wl-button 
          v-show="isEdit || isNew" 
          :ico="'ico-floppy-o'" 
          :type="'submit'"
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
    </form>

    <!-- Modal confirmacion -->
    <wl-modal
      v-if="showDialog"
      :title="$t('components.crud.title-confirm')"
      @wlclose="closeModal"
    >
      <template slot="wl-content">
        <div class="generic-box-vertical content-modal">
          <div>{{ $t('components.crud.div-sure-delete') }} "{{ getElementName }}"?</div>
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
        <div 
          ref="errormsg" 
          class="generic-box-vertical content-modal"
        >
          <p 
            v-for="(mensaje, index) in mensajes" 
            :key="index"
          >    
            {{ mensaje }}
          </p>
        </div>
        <div class="modal-confirmacion content-modal-buttons">
          <wl-button 
            class="green"
            ico="ico-check"
            @click.native="getActionModal($event)"
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
    elementName: {type: String, default: "" },
    isLoading: {type: Boolean, default: false },
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
  computed:{
    mensajes(){
      if(this.error.message){        
        return this.error.message.split("<br/>")
      }else{
        return this.error.message
      }
    },
    wasNotFound(){
      if(this.error && this.error.name == "WLError"){
        return true;
      }
      return false
    },
    getElementName(){
      if(this.elementName){
        return this.objSelect[this.elementName]
      }else{
        return this.objSelect.name
      }
    }
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
    getActionModal($event){
      if(this.wasNotFound){
        this.$emit('wlcancel',$event.target.value);
      }else{
        this.clearError($event)
      }
    }
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
  width: 100%;
  padding: 10px;  
  margin-bottom: -10px;
  background: transparent;
  color: var(--wl_text);
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}

.progress-container{
  flex:1;
  display: flex;
  flex-direction: column;
  font-size: .9rem;
  margin-top: 10px;
}
</style>
