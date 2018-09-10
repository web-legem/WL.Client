<template>
  <div class="doc-id">
    <h1>DocumentType to Edit</h1>
    {{ selectedDocType && selectedDocType.id }}
    {{ selectedDocType && selectedDocType.name }}
    {{ editedDocType && editedDocType.id }}
    {{ editedDocType && editedDocType.name }}

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
  data() {
    return {
      editedDocType: {}
    }
  }
  , computed: {
    ...mapGetters('admin/document-types', { 
      selectedDocType: 'selected'
    })
  }
  , watch: {
    '$route.params.id'(){
      this.select(this.$route.params.id)
    }
    , 'selectedDocType'() {
      this.editedDocType.id = this.selectedDocType.id
      this.editedDocType.name = this.selectedDocType.name
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
