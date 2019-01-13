<template>
  <div>
    <h1>Annotation Type to Create</h1>

    <input
      v-model="name"
      type="text"
    >

    <input
      v-model="root"
      type="text"
    >

    <button
      type="button"
      @click="submit()"
    >
      Aceptar
    </button>

    <button
      type="button"
      @click="cancel()"
    >
      Cancelar
    </button>
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
      , root: ''
    }
  }
  , created() {
    this.isCreating()
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    cancel() {
      this.$router.push(this.localePath({name: 'admin-annotation-types'}))
    }
    , submit() {
      this.create({name: this.name, root: this.root})
        .then(_ => this.$router.push(this.localePath({name: 'admin-annotation-types'})))
    }
    , ...mapActions('admin/annotation-types', {
      isCreating: 'isCreating'
      , clearSelection: 'clearSelection'
      , create: 'create'
    })
  }
}
</script>