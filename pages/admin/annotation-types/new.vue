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
          :mode="'noSpace|titleCase'"
          :name="'form1.name'"
          :title="$t('admin.annotation-type.title-name-annotation-type')"
          :max="100"
          :placeholder="$t('admin.annotation-type.place-enter-name-ta')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <wl-input
          v-model="root"
          :mode="'noSpace|titleCase'"
          :name="'form1.root'"
          class="sm-space-top"
          :title="$t('admin.annotation-type.title-annotation-root')"
          :max="5"
          :placeholder="$t('admin.annotation-type.place-enter-annotation-root')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />        
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import WlCrud from "~/components/WlCrud.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud,
    WlInput,
  },
  nuxtI18n: {
    paths: {es: "nuevo",en: "new",}
  },
  data() {
    return {
      name: "",
      root: "",
      isSubmit: false,
    };
  },
  computed: {
    ...mapGetters("admin/annotation-types", {
      error: "error",
    })
  },

  created() {this.isCreating();},
  beforeDestroy() {this.clearSelection();},  

  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-annotation-types" }));
    },
    submit() {
      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.create({ name: this.name, root: this.root }).then(_ =>
            this.$router.push(this.localePath({ name: "admin-annotation-types" }))
          );      
        }
      }); 
    },
    ...mapActions("admin/annotation-types", {
      isCreating: "isCreating",
      clearSelection: "clearSelection",
      create: "create",
      clearError: "clearError",
    })
  }
};
</script>