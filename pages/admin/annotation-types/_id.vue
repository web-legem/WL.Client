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
        <wl-input
          v-if="objSelected"
          v-model="name"
          :mode="'noSpace|titleCase'"
          :name="'form1.name'"
          :disable="!isEdit"
          :title="$t('admin.annotation-type.title-name-annotation-type')"
          :max="100"
          :placeholder="$t('admin.annotation-type.place-enter-name-ta')"
          :validate="{required:true}"
          :is-submit="isSubmit"
        />
        <wl-input
          v-if="objSelected"
          v-model="root"
          :mode="'noSpace|titleCase'"
          :name="'form1.root'"
          class="sm-space-top"
          :disable="!isEdit"
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
import { mapGetters, mapActions } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: {
    WlCrud,
    WlInput
  },
  data() {
    return {
      isEdit : false,
      isSubmit: false,
    }
  },
  computed: {
    ...mapGetters("admin/annotation-types", {
      objSelected: "selected",
      error: "error",
    }),
    name: {
      get() {
        return this.objSelected.name;
      },
      set(value) {
        this.changeName(value);
      }
    },
    root: {
      get() {
        return this.objSelected.root;
      },
      set(value) {
        this.changeRoot(value);
      }
    }
  },
  watch: {
    $route() {
      this.select(this.$route.params.id);
    }
  },

  mounted() {
    this.select(this.$route.params.id);
  },
  beforeDestroy() {
    this.clearSelection();
  },

  methods: {
    cancel() {
      this.$router.push(this.localePath({ name: "admin-annotation-types" }));
      this.clearError();
    },
    drop() {
      this.delete().then(this.cancel);
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
    ...mapActions("admin/annotation-types", [
      "select",
      "clearSelection",
      "changeName",
      "changeRoot",
      "save",
      "delete",
      "clearError",
    ])
  }
};
</script>
