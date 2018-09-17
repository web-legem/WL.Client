<template>
  <div>
    <h1>Entity to Create</h1>

    <input
      v-model="name"
      type="text"
    >

    <input
      v-model="email"
      type="email"
    >

    <select
      id="select"
      v-model="entityTypeId"
      name="select" 
    >
      <option
        value=""
        disabled>Por favor, seleciona uno</option>
      <option
        v-for="entityType in entityTypes"
        :key="entityType.id"
        :value="entityType.id">{{ entityType.name }}</option>
    </select>
    <p>Selected: {{ entityTypeId }}</p>

    <button
      type="button"
      @click="submit()">Aceptar</button>

    <button
      type="button"
      @click="cancel()">Cancel</button>
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
      entityTypeId: null
      , name: ''
      , email: ''
    }
  }
  , asyncData(context){
    return context.app.$axios.get('/api/EntityType')
      .then(response => ({ entityTypes: response.data }))
      .catch(e => console.log(e))
  }
  , created() {
    this.isCreating()
  }
  , beforeDestroy(){
    this.clearSelection()
  }
  , methods: {
    cancel() {
      this.$router.push(this.localePath({name: 'admin-entities'}))
    }
    , submit() {
      this.create({ name: this.name, email: this.email, entityTypeId: this.entityTypeId})
        .then(_ => this.cancel())
        .catch(e => console.log(e))
    }
    , ...mapActions('admin/entities', {
      create: 'create'
      , isCreating: 'isCreating'
      , clearSelection: 'clearSelection'
    })
  }
}
</script>