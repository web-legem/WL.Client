<template>
  <div>
    <wl-crud 
      :obj-select="objSelected"
      :is-new="false"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
    >
      
      <template slot="wl-form">
        <wl-input 
          v-if="objSelected"
          :title="'Nombre del Tipo Documento'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo documento'" 
          :error-msg="'Este es un error'"                     
          :error="true"
          v-model="name"
        />       

      </template>
    </wl-crud>
  </div>
</template>

<script>
  import {mapActions,mapGetters,} from 'vuex';
  import WlCrud from "~/components/WlCrud.vue"
  import WlButton from "~/components/WlButton.vue"
  import WlInput from "~/components/WlInput.vue"

  export default {
    components: {
      WlCrud,
      WlButton,
      WlInput,
    },
    computed: {
      ...mapGetters('admin/document-types', {
        objSelected: 'selected'
      }),
      name: {
        get() {return this.objSelected.name},
        set(value){this.changeName(value)},
      },
    },
    watch: {
      '$route.params.id'(){
        this.select(this.$route.params.id)
      }
    },
    mounted() {this.select(this.$route.params.id)},
    
    beforeDestroy() {this.clearSelection()},
    
    methods: {
      cancel() {
        this.$router.push( this.localePath({ name: 'admin-doc-types'}))
      },
      drop () {      
        this.delete().then( this.cancel )
      }, 
      update() {
        this.save(this.objSelected).then( this.cancel )
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