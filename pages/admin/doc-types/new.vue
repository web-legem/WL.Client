<template>
  <div>
    <wl-crud 
      :obj-select="obj"
      :is-new="true"
      @wlcancel="cancel"
      @wlcreate="submit"
    >
      <template slot="wl-form">
        <wl-input 
          v-model="name"
          :title="'Nombre del Tipo Documento'"
          :max="20" 
          :placeholder="'Escriba el nombre del tipo documento'" 
          :error-msg="'Este es un error'" 
          :error="true"
        />
        error:{{ error }}
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
    }),
  },
}
</script>