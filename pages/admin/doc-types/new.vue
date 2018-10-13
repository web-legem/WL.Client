<template>
  <div>
    <wl-crud :obj-select="obj">
      <template slot="wl-form">
        <h1>DocumentType to Create</h1>
        <wl-input 
          v-model="name"
          :title="'Nombre del Tipo Documento'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo documento'" 
          :error-msg="'Este es un error'" 
          :error="true"/>
        esciribir
        <button
          type="button"
          @click="submit()">Aceptar</button>
        <button
          type="button"
          @click="cancel()">Cancelar</button>
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import WlCrud from "~/components/WlCrud.vue"
import WlButton from "~/components/WlButton.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud
    , WlButton
    , WlInput
  },
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