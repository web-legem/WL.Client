<template>
  <div>
    <wl-crud
      :obj-select="objSelected"
      :error="error"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >
      <template slot="wl-form">
        <form 
          name="form-doc-types"
          data-vv-scope="form1"
          @submit.prevent
        >
          <wl-input
            v-if="objSelected"
            v-model="name"
            :mode="'titleCase'"
            :name="'form1.name'"
            :disable="!isEdit"
            :title="$t('admin.document-type.title-name-doc-type')"
            :max="50"
            :placeholder="$t('admin.document-type.place-enter-name-td')"
            :validate="{required:true}"
            :is-submit="isSubmit"
          />
        </form>
      </template>
    </wl-crud>
  </div>
</template>

<script>
  import {mapActions,mapGetters,} from 'vuex';
  import WlCrud from "~/components/WlCrud.vue"
  import WlInput from "~/components/WlInput.vue"

  export default {
    validate({ params }) {
      return /^\d+$/.test(params.id)
    },
    components: {
      WlCrud,
      WlInput,
    },
    data() {
      return {
        isEdit : false,
        isSubmit: false,
      }
    },
    computed: {
      ...mapGetters('admin/document-types', {
        objSelected: 'selected',
        error: "error",
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
        this.$validator.validate('form1.*').then(valid => {
          this.isSubmit = true;
          if (valid) {
            this.save(this.objSelected).then(this.cancel);      
          }
        });
      },
      startEdit(){
        this.isEdit = true;
      },
      ...mapActions('admin/document-types', [
        'select',
        'clearSelection',
        'changeName',
        'save',
        'delete',
        "clearError",
      ])
    }
  }
</script>
