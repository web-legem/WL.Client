<template>
  <div class="doc-id">
    <h1>DocumentType to Edit</h1>
    {{ selectedDocType && selectedDocType.id }}
    {{ selectedDocType && selectedDocType.name }}
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
    '$route'(){
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
    ...mapActions('admin/document-types', [
      'select'
      , 'clearSelection'
    ])
  }
}
</script>

<style>
.doc-id {
  display: block;
}
</style>
