<template>
  <div class="doc-id">
    <h1>DocumentType to Edit</h1>
    <input
      v-if="selectedDocType"
      :value="selectedDocType.name"
      type="text"
      @input="changeDocTypeName">
      
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
      console.log('drop')
      this.delete()
        .then( _ => this.cancel() )
    }
    , update() {
      this.save(this.selectedDocType)
        .then( _ => this.cancel() )
    }
    , changeDocTypeName(e) {
      this.changeName(e.target.value)
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

<style>
.doc-id {
  display: block;
}
</style>
