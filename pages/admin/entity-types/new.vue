<template>
  <div>
    <h1>EntityType to Create</h1>

    <input
      v-model="name"
      type="text"
    >

    <div
      v-for="docType in docTypes"
      :key="docType.id">
      <input
        :name="docType.id"
        :id="docType.id"
        :value="docType.id"
        v-model="checked"
        type="checkbox"
      >
      <label :for="docType.id">{{ docType.name }}</label>
    </div>
    <p>Selected: {{ checked }}</p>

    <button
      type="button"
      @click="submit()"
    >Aceptar</button>

    <button
      type="button"
      @click="cancel()"
    >Cancelar</button>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  nuxtI18n: {
    paths: {
      es: 'nuevo'
      , en: 'new'
    }
  }
  , data() {
    return {
      name: ''
      , docTypes: []
      , checked: []
    }
  }
  , methods: {
    cancel() {
      this.$router.push(this.localePath({name: 'admin-entity-types'}))
    }
    , submit() {
      this.create({ name: this.name, supportedDocumentTypesIds: this.checked })
        .then(_ => this.$router.push(this.localePath({name: 'admin-entity-types'})))
    }
    , ...mapActions('admin/entity-types', {
      create: 'create'
    })
  }
  , asyncData(context) {
    console.log(context)
    return context.app.$axios.get('/api/DocumentType')
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log('error', e))
  }
}
</script>