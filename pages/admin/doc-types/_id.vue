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
      selectedDocType: 'selectedDocType'
    })
  }
  , watch: {
    '$route'(){
      this.selectDocType(this.$route.params.id)
    }
  }
  , mounted() {
    this.selectDocType(this.$route.params.id)
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    ...mapActions('admin/document-types', [
      'selectDocType'
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
