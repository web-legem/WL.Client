<template>
  <div class="container-form-left">    
    <h1 class="left-form-title">
      {{ $t('notify.title') }}
    </h1>
    <form 
      name="form-send-email-to"
      class="form-left"
      data-vv-scope="form1"
      @submit.prevent
    >
      <p class="paragraph">
        Selecciona las entidades a las que desea notificar:
      </p>

      <wl-switch-button         
        id="pick_all"
        v-model="selectAll"
        :name="'form1.selectAll'"       
        :type="'checkbox'" 
        :disable="isLoading"
        :small="true"
        :label="$t('notify.select-all')"
      />

      <fieldset class="fieldset">
        <legend class="texto_labels">
          Entidades
        </legend>
        <template v-for="( obj, index) in entitiesChecks">
          <wl-switch-button 
            :id="'chk'+index.toString()"
            :key="obj.entity.id"
            v-model="obj.check"
            :name="'form1.configSystem'+index"       
            :type="'checkbox'" 
            :disable="isLoading"
            :small="true"
            :label="obj.entity.name"
          />          
        </template>
      </fieldset>
      <span class="fix-flex" />
      <div class="right">
        <wl-button
          type="submit"
          class="action"
          ico="ico-check"
          :title="$t('doc-management.classify-doc.butt-accept')"
          :disable="isLoading"
          @click="showConfirmDialog"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          :disable="isLoading"
          :title="$t('doc-management.classify-doc.butt-cancel')"
          @click="clear"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
    </form>

    <wl-modal
      v-if="showDialog"
      :title="$t('components.crud.title-confirm')"
      @wlclose="closeDialog"
    >
      <template slot="wl-content">
        <div class="generic-box-vertical content-modal">
          <div>{{ $t('notify.notification-sent') }}</div>
        </div>
        <div class="modal-confirmacion confirm-dialog content-modal-buttons">
          <wl-button 
            ico="ico-arrow-left"
            @click.native="closeDialog"
          >
            {{ $t('notify.return') }}
          </wl-button>
        </div>
      </template>
    </wl-modal>
  </div>
</template>

<script>
import WlSwitchButton from '~/components/WlSwitchButton.vue'
import WlButton from '~/components/WlButton.vue'
import WlModal from '~/components/WlModal.vue'

export default {
  components: {
    WlSwitchButton,
    WlButton,
    WlModal,
  },
  props: {
    entities: {
      type: Array,
      required: true,
    },
    documentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      entitiesChecks: this.entities.map(x => {                
        return { entity: x, check: false };
      }),
      showDialog: false,
      isLoading: false,
    }
  },
  computed: {
    areAllEntitiesSelected() {
      return this.entitiesChecks.every(x => x.check)
    },
    selectAll: {
      get() {
        return this.areAllEntitiesSelected
      },
      set(value) {
        this.entitiesChecks.forEach(element => {
          element.check = value
        });
      },
    }
  },
  methods: {
    showConfirmDialog(){
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    notify() {
      this.$emit('notify', this.entitiesChecks
        .filter(x => x.check)
        .map(x => x.email)
      )
      this.showDialog = false
    },
    clear() {
      this.$emit('clean')
    }
  }
}
</script>

<style lang="scss" scoped>
.right {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 16px;
}

.action {
  margin-left: 8px;
}

.paragraph {
  margin-bottom: 10px;
}

.fieldset {
  border: 1px solid var(--wl_gray);
  padding: 6px 16px;
}

.content-modal{  
  padding: 10px;  
  margin-bottom: -10px;
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}
</style>
