<template>
  <div class="notifyEntities">
    <form 
      name="form-send-email-to"
      class="form"
      data-vv-scope="form1"
      @submit.prevent
    >
      <p class="paragraph">
        Selecciona las entidades a las que deseas notificar:
      </p>

      <template v-for="(entity,index) in entities">
        <wl-switch-button 
          :id="index.toString()"
          :key="entity.id"
          v-model="entitiesChecks[index].check"
          :name="'form1.configSystem'"       
          :type="'checkbox'" 
          :disable="false"
          :label="entity.name"
        />
      </template>

      <div class="right">
        <wl-button
          type="button"
          class="action"
          ico="ico-check"
          @click="notify"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
          @click="clear"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
    </form>
  </div>
</template>

<script>
import WlSwitchButton from '~/components/WlSwitchButton.vue'
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlSwitchButton,
    WlButton,
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
    }
  },
  methods: {
    notify() {
      console.log('notifying')
      this.$emit('notify', this.entitiesChecks
        .filter(x => x.check)
        .map(x => x.email)
      )
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
</style>
