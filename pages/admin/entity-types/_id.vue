<template>
  <div>
    <h1>Entity Type to Edit</h1>

    <input
      v-if="selected"
      :value="selected.name"
      type="text"
      @input="changeName($event.target.value)"
    >

    <div
      v-for="docType in docTypes"
      :key="docType.id">
      <input
        v-if="selected"
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
      @click="update"
    >Update</button>

    <button
      type="button"
      @click="cancel"
    >Cancel</button>

    <button
      type="button"
      @click="drop"
    >Delete</button>
  </div>
</template>

<script>
import {
  mapGetters
  , mapActions
} from 'vuex';

export default {
  computed: {
    checked: {
      get() {
        return this.$store.state.admin['entity-types'].selected
          ? this.$store.state.admin['entity-types'].selected.supportedDocumentTypesIds
          : []
      }
      , set(value) {
        this.$store.commit('admin/entity-types/changeSupportedDocumentTypes', value)
      }
    }
    , ...mapGetters('admin/entity-types', {
      selected: 'selected'
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
    cancel() {
      this.$router.push(this.localePath({name: 'admin-entity-types'}))
    }
    , drop() {
      this.delete()
        .then(_ => this.cancel())
    }
    , update() {
      this.save(this.selected)
        .then(_ => this.cancel())
    }
    , ...mapActions('admin/entity-types', [
      'select'
      , 'clearSelection'
      , 'changeSupportedDocumentTypes'
      , 'changeName'
      , 'save'
      , 'delete'
    ])
  }
  , asyncData(context) {
    return context.app.$axios.get('/api/DocumentType')
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log(e))
  }
}
</script>

<style>

</style>
