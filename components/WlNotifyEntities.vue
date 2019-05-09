<template>
  <div class="notifyEntities">
    <wl-title text="Notificar" />
    <form 
      name="form-send-email-to"
      class="form"
      data-vv-scope="form1"
      @submit.prevent
    >
      <p class="paragraph">
        Selecciona las entidades a las que deseas notificar:
      </p>

      <div class="select-all-container">
        <wl-switch-button 
          id="pick_all"
          v-model="selectAll"
          :name="'form1.selectAll'"       
          :type="'checkbox'" 
          :disable="isLoading"
          :label="$t('notify.select-all')"
        />
      </div>

      <fieldset class="fieldset">
        <legend class="texto_labels">
          Entidades
        </legend>
        <template v-for="(entity,index) in entities">
          <wl-switch-button 
            :id="index.toString()"
            :key="entity.id"
            v-model="entitiesChecks[index].check"
            :name="'form1.configSystem'"       
            :type="'checkbox'" 
            :disable="isLoading"
            :small="true"
            :label="entity.name"
          />
        </template>
      </fieldset>

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
import WlTitle from '~/components/WlTitle.vue'
import WlModal from '~/components/WlModal.vue'

export default {
  components: {
    WlSwitchButton,
    WlButton,
    WlTitle,
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
        x.check = false
        return x
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
.notifyEntities {
  padding: 16px;
}

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
  margin-bottom: 16px;
}

.form {
  border: 1px solid var(--wl_gray);
  padding: 16px;
  height: 100%;
  overflow: hidden;
}

.select-all-container {
  display: flex;
  // justify-content: flex-end;
}

.fieldset {
  border: 1px solid var(--wl_gray);
  padding: 6px 16px;
}

.content-modal{  
  width: 100%;
  padding: 10px;  
  margin-bottom: -10px;
  background: transparent;
  color: var(--wl_text);
  min-width: 350px;
}

.content-modal-buttons{
  padding: 10px;  
  margin-top: 10px;
}
</style>
