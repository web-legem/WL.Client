<template>
  <div>
    <h1>Annotation Type to Edit</h1>
    
    <input
      v-if="selected"
      :value="selected.name"
      type="text"
      @input="changeAnnotationTypeName"
    >

    <input
      v-if="selected"
      :value="selected.root"
      type="text"
      @input="changeAnnotationTypeRoot"
    >

    <button
      type="button"
      @click="update">Update</button>
    
    <button
      type="button"
      @click="cancel">Cancel</button>

    <button
      type="button"
      @click="drop">Delete</button>
  </div>
</template>

<script>
import {
  mapGetters
  , mapActions 
} from 'vuex';

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  computed: {
    ...mapGetters('admin/annotation-types', {
      selected: 'selected'
    })
  }
  , watch: {
    '$route'() {
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
      this.$router.push(this.localePath({name: 'admin-annotation-types'}))
    }
    , drop() {
      this.delete()
        .then(_ => this.cancel())
    }
    , update() {
      this.save(this.selected)
        .then(_ => this.cancel())
    }
    , changeAnnotationTypeName(e) {
      this.changeName(e.target.value)
    }
    , changeAnnotationTypeRoot(e) {
      this.changeRoot(e.target.value)
    }
    , ...mapActions('admin/annotation-types', [
      'select'
      , 'clearSelection'
      , 'changeName'
      , 'changeRoot'
      , 'save'
      , 'delete'
    ])
  }
}
</script>