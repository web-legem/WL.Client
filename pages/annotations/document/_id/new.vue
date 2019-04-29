<template>
  <div
    class="form"
  >
    <form
      action=""
    >
      <h3>
        {{ $t('annotations.create-annotation') }}
      </h3>

      <wl-input
        id="number"
        v-model="number"
        title="Number"
        type="text"
        name="number"
        placeholder="por ejemplo: 029"
      />

      <wl-input 
        id="date" 
        v-model="date"
        title="Fecha publicación"
        type="date" 
        name="date" 
        placeholer="p.e.: 07/30/2018"
      />

      <wl-select 
        id="entityId"
        v-model="entityId"
        title="Entidad"
        value-prop-name="id"
        label-prop-name="name"
        name="entityId" 
        class="select"
        :list="entities"
      />

      <wl-select 
        id="documentTypeId"
        v-model="documentTypeId"
        title="Tipo Documento"
        value-prop-name="id"
        label-prop-name="name"
        name="documentTypeId" 
        class="select"
        :list="documentTypes"
        :empty-msg="$t('doc-management.classify-doc.please-select-one')"
      />

      <div
        class="action-container"
      >
        <wl-button
          type="button"
          class="action"
          ico="ico-check"
        >
          {{ $t('doc-management.classify-doc.butt-accept') }}        
        </wl-button>
        <wl-button
          type="button"
          class="action"
          ico="ico-times"
        >
          {{ $t('doc-management.classify-doc.butt-cancel') }}
        </wl-button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions} from 'vuex'
import WlInput from '~/components/WlInput.vue'
import WlSelect from '~/components/WlSelect.vue'
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlInput,
    WlSelect,
    WlButton,
  },
  nuxtI18n: {
    paths: { es: 'nuevo', en: 'new' }
  },
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  padding: 16px;
  flex-direction: column;
  border: 1px solid gray;
  margin: calc(1em + .5vw);
}

h3 {
  color: #00696b;
  padding-bottom: 5px;
  border-bottom: 1px solid #00696b;
  margin-bottom: 8px;
}

.action-container {
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.action {
  margin-left: 16px;
}

.select {
  margin-bottom: 10px;
}

.content {
  height: 100%;
}

.ico-upload {
  display: block;
  font-size: 3rem;
  color: gray;
}

.next {
  align-self: flex-end;
}
</style>
