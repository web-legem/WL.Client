<template>
<<<<<<< HEAD
  <wl-crud :obj-select="obj">
    <template slot="wl-form">
      <div class="doc-id">
        <h1>DocumentType to Edit</h1>
        <input
          v-if="selectedDocType"
          v-model="name"
          type="text">
=======
  <div>
    <h1>DocumentType to Edit</h1>
    <input
      v-if="selectedDocType"
      v-model="name"
      type="text"
    >
>>>>>>> c5820e0ac0d7dc34646f9ffaeec97315272d1c43

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
  </wl-crud>  
</template>

<script>
import {
  mapActions
  , mapGetters
} from 'vuex';
import WlCrud from "~/components/WlCrud.vue"
import WlButton from "~/components/WlButton.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud
    , WlButton
    , WlInput
  },
  computed: {
    ...mapGetters('admin/document-types', {
      selectedDocType: 'selected'
<<<<<<< HEAD
    }),
    name:{
      get(){
        return this.selectedDocType.name
      },
      set(value){
=======
    })
    , name: {
      get() {
        return this.selectedDocType.name
      }
      , set(value){
>>>>>>> c5820e0ac0d7dc34646f9ffaeec97315272d1c43
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