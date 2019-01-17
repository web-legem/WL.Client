<template>
  <div>
    <wl-crud 
      :is-new="true"
      :error="error" 
      @wlcancel="cancel"
      @wlcreate="submit"
      @wlclearerror="clearError"
    >
      <template slot="wl-form">
        <wl-input 
          v-model="name"
          :title="'Nombre del Tipo Documento'"
          :max="50" 
          :placeholder="'Escriba el nombre del tipo documento'" 
          :error-msg="'Este es un error'" 
          :error="true"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import WlCrud from "~/components/WlCrud.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud,
    WlInput,
  },
  nuxtI18n: {
    paths: {
      es: 'nuevo',
      en: 'new',
    }
  },
  data() {
    return {
      name: ''
    }
  },

  computed:{
    ...mapGetters('admin/document-types',{
      error : 'error'
    })
  },

  created(){this.isCreating()},  
  beforeDestroy() {this.clearSelection()},
  
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: 'admin-doc-types'}))
    },
    submit() {
      this.create(this.name)
        .then( _ => this.$router.push( this.localePath({ name: 'admin-doc-types' }) ));      
    },
    ...mapActions('admin/document-types', {
      isCreating: 'isCreating',
      clearSelection: 'clearSelection',
      create: 'create',
      clearError: "clearError",
    }),
  },
}
</script>