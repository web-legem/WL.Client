<template>
  <div>
    <h1>DocumentType to Create</h1>
    <input
      v-model="name"
      type="text"
    >
    <button
      type="button"
      @click="submit()">Aceptar</button>
    <button
      type="button"
      @click="cancel()">Cancelar</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

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
    }
  }
  , created(){
    this.isCreating()
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    cancel() {
      this.$router.push(this.localePath({ name: 'admin-doc-types'}))
    }
    , submit() {
      this.create(this.name)
        .then( _ => this.$router.push( this.localePath({ name: 'admin-doc-types' }) ))
    }
    , ...mapActions('admin/document-types', {
      isCreating: 'isCreating'
      , clearSelection: 'clearSelection'
      , create: 'create'
    })
  }
}
</script>