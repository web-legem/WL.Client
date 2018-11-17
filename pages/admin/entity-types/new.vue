<template>
  <div>
    <wl-crud 
      :obj-select="objSelected"
      :is-new="true"
      @wlcancel="cancel"
      @wlcreate="submit"
    >
      <template slot="wl-form">
        <wl-input 
          v-model="name"
          :title="'Nombre del Tipo Entidad'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo entidad'" 
          :error-msg="'Este es un error'"                     
          :error="true"
        />    
        <div class="cards">
          <div
            v-for="docType in docTypes"
            :key="docType.id"            
          >
            <div class="block">              
              <input
                :name="docType.id"
                :id="docType.id"
                :value="docType.id"
                v-model="checked"
                type="checkbox"
              >
              <label 
                :for="docType.id"
                class="note checked"
              >
                <div>
                  <div class="ico-container">
                    <span class="ico-file-text-o ico-note"/>
                  </div>
                  <div class="name-container">                  
                    <p class="note-name">{{ docType.name }}</p>                  
                  </div>
                </div>
              </label>
            </div>                  
          </div>
        </div>        

        <p>Selected: {{ checked }}</p>
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import WlCrud from "~/components/WlCrud.vue";
import WlButton from "~/components/WlButton.vue";
import WlInput from "~/components/WlInput.vue";

export default {
  components: {
    WlCrud,
    WlButton,
    WlInput
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
      , docTypes: []
      , checked: []
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
      this.$router.push(this.localePath({name: 'admin-entity-types'}))
    }
    , submit() {
      this.create({ name: this.name, supportedDocumentTypesIds: this.checked })
        .then(_ => this.$router.push(this.localePath({name: 'admin-entity-types'})))
    }
    , ...mapActions('admin/entity-types', {
      create: 'create'
      , isCreating: 'isCreating'
      , clearSelection: 'clearSelection'
    })
  }
  , asyncData(context) {
    console.log(context)
    return context.app.$axios.get('/api/DocumentType')
      .then(response => ({ docTypes: response.data }))
      .catch(e => console.log('error', e))
  }
}
</script>