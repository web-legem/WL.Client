<template>
  <div>
    <form action="">
      <input
        id="number"
        v-model="number"
        type="text"
        name="number"
      >
      <input 
        id="date" 
        v-model="date"
        type="date" 
        name="date" 
      >
      <select 
        id="entityId"
        v-model="entityId"
        name="entityId" 
      >
        <option 
          value=""
          disabled
        >
          {{ $t('doc-management.classify-doc.please-select-one') }}          
        </option>
        <option 
          v-for="entity in entities"
          :key="entity.id"
          :value="entity.id"
        >
          {{ entity.name }}
        </option>
      </select>
      EntityId: {{ entityId }}
      <select 
        id="documentTypeId"
        v-model="documentTypeId"
        name="documentTypeId" 
      >
        <option 
          value=""
          disabled
        >
          {{ $t('doc-management.classify-doc.please-select-one') }}
        </option>
        <option 
          v-for="documentType in documentTypes"
          :key="documentType.id"
          :value="documentType.id"
        >
          {{ documentType.name }}
        </option>
      </select>
      {{ documentTypeId }}
      <button
        type="button"
        @click="clear"
      >
        {{ $t('doc-management.classify-doc.butt-cancel') }}
      </button>
      <button
        type="button"
        @click="classify"
      >
        {{ $t('doc-management.classify-doc.butt-accept') }}        
      </button>
    </form>
  </div>
</template>

<script>
import moment from 'moment';
import {mapGetters, mapActions} from 'vuex'

export default {
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

</style>
