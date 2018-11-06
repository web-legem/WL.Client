<template>
  <div>
    <wl-crud 
      :obj-select="obj"
      @cancel="wlcancel">
      
      <div slot="wl-form">
        <wl-input 
          v-if="selectedDocType"
          :title="'Nombre del Tipo Documento'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo documento'" 
          :error-msg="'Este es un error'"                     
          :error="true"
          v-model="name"
        />       
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
    </wl-crud>
  </div>
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
    validate({ params }) {
      return /^\d+$/.test(params.id)
    },
    components: {
      WlCrud
      , WlButton
      , WlInput
    },
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
      },
      wlcancel() {
        this.$router.push( this.localePath({ name: 'admin-doc-types'}))
      },
      drop () {
        this.delete()
          .then( _ => this.cancel() )
      }, 
      update() {
        this.save(this.selectedDocType)
          .then( _ => this.cancel() )
      }, 
      ...mapActions('admin/document-types', [
        'select'
        , 'clearSelection'
        , 'changeName'
        , 'save'
        , 'delete'
      ])
    }
  }
</script>