<template>
  <div>
    <wl-crud 
      :is-new="true"
      :error="error" 
      :is-loading="loading"
      @wlcancel="cancel"
      @wlcreate="submit"
      @wlclearerror="clearError"
    >
      <template slot="wl-form">        
        <wl-input 
          v-model="name"
          :mode="'titleCase'"
          :name="'form1.name'"
          :title="$t('admin.document-type.title-name-doc-type')"
          :max="50" 
          :placeholder="$t('admin.document-type.place-enter-name-td')" 
          :validate="{required:true}"
          :is-submit="isSubmit"
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
      name: '',
      isSubmit: false,
    }
  },

  computed:{
    ...mapGetters('admin/document-types',{
      error : 'error',
      loading: "loading",
    })
  },

  created(){this.isCreating()},  
  beforeDestroy() {this.clearSelection()},
  
  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: 'admin-doc-types'}))
    },
    submit() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.create(this.name)
          .then( _ => this.$router.push( this.localePath({ name: 'admin-doc-types' }) ));          
        }
      });      
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