<template>
  <div>
    <h1>DocumentType to Edit</h1>
    <input
      v-if="selectedDocType"
      v-model="name"
      type="text"
    >

    <button
      type="button"
      @click="cancel">Cancelar</button>

    <button
      type="button"
      @click="update">Update</button>

    <button
      type="button"
      @click="drop"
    >
      Eliminar
    </button>
  </div>
</template>

<script>
import {
  mapActions
  , mapGetters
} from 'vuex';

export default {
  computed: {
    ...mapGetters('admin/document-types', {
      selectedDocType: 'selected'
    })
    , name: {
      get() {
        return this.selectedDocType.name
      }
      , set(value){
        this.changeName(value)
      }
    }
  }
  , watch: {
    '$route.params.id'(){
      this.select(this.$route.params.id)
    }
  }
  , mounted() {
    this.select(this.$route.params.id)
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    cancel() {
      this.$router.push( this.localePath({ name: 'admin-doc-types'}))
    }
    , drop () {
      this.delete()
        .then( _ => this.cancel() )
    }
    , update() {
      this.save(this.selectedDocType)
        .then( _ => this.cancel() )
    }
    , ...mapActions('admin/document-types', [
      'select'
      , 'clearSelection'
      , 'changeName'
      , 'save'
      , 'delete'
    ])
  }
}
</script>