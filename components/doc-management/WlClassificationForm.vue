<template>
  <div
    class="form"
  >
    <form
      action=""
    >
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
          @click="classify"
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
    WlButton,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  props: {
    entities: { type: Array, required: true },
    documentTypes: { type: Array, required: true},
  },
  data() {
    return {
      number: ''
      , entityId: null
      , documentTypeId: null
      , date: moment(Date.now())
        .locale(this.$store.state.i18n.locale)
        .format('YYYY-MM-DD')
      , error: null
    }
  },
  computed: {
    ...mapGetters('doc-management/classify-document', {
      isAlreadyClassified: 'isAlreadyClassified'
    }),
  }
  , watch: {
    '$route.params.id'(){
      this.loadData(this.$route.params.id)
    }
  },
  fetch({ store, params }) {
    return store.dispatch('doc-management/classify-document/loadData', params.id)
  },
  methods: {
    ...mapActions('doc-management/classify-document', [
      'loadData'
    ]),
    classify() {
      this.$axios.post('/api/Document', {
        fileId: this.$route.params.id
        , document: {
          entityId: this.entityId
          , documentTypeId: this.documentTypeId
          , number: this.number
          , publicationDate: this.date
        }
      })
      .then(console.log)
      .catch(console.log)
    },
    clear(){
      this.date = moment(Date.now())
        .locale(this.$store.state.i18n.locale)
        .format('YYYY-MM-DD')
      this.number = ''
      this.documentTypeId = null
      this.entityId = null
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  padding: 16px;
  flex-direction: column;
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
</style>
