<template>
  <div>
    <h1>Clasificar documento</h1>
    <p v-if="isAlreadyClassified">El documento ya fue clasificado</p>
    <p v-if="!isAlreadyClassified">El documento no ha sido clasificado</p>

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
          disabled>
          Por favor, selecciona uno
        </option>
        <option 
          v-for="entity in entities"
          :key="entity.id"
          :value="entity.id">{{ entity.name }}</option>
      </select>
      EntityId: {{ entityId }}
      <select 
        id="documentTypeId"
        v-model="documentTypeId"
        name="documentTypeId" 
      >
        <option 
          value=""
          disabled>
          Por favor, selecciona uno
        </option>
        <option 
          v-for="documentType in documentTypes"
          :key="documentType.id"
          :value="documentType.id">{{ documentType.name }}</option>
      </select>
      {{ documentTypeId }}
      <button
        type="button"
        @click="clear"
      >Cancel</button>
      <button
        type="button"
        @click="classify">Accept</button>
    </form>
    {{ number }}
    {{ date }}
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import moment from 'moment'

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
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
  }
  , computed: {
    ...mapGetters('doc-management/classify-document', {
      isAlreadyClassified: 'isAlreadyClassified'
    })
  }
  , watch: {
    '$route.params.id'(){
      this.loadData(this.$route.params.id)
    }
  }
  , methods: {
    ...mapActions('doc-management/classify-document', [
      'loadData'
    ])
    , classify() {
      console.log('classify')
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
    }
    , clear(){
      this.date = moment(Date.now())
        .locale(this.$store.state.i18n.locale)
        .format('YYYY-MM-DD')
      this.number = ''
      this.documentTypeId = null
      this.entityId = null
    }
  }
  , asyncData(context) {
    return Promise.all([
      context.app.$axios.get('/api/Entity')
      , context.app.$axios.get('/api/DocumentType')
    ]).then(results => ({
      entities: results[0].data
      , documentTypes: results[1].data
    }))
  }
  , fetch({ store, params }) {
    return store.dispatch('doc-management/classify-document/loadData', params.id)
  }
}
</script>