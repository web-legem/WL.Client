<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list 
      slot="master" 
      :empty-list="documentTypes != null && documentTypes.length == 0"
      @add="create"
    >
      <wl-list-item
        v-for="documentType in documentTypes"
        :key="documentType.id"
        route="admin-doc-types-id"
        active-route="admin-doc-types"
        :item-id="documentType.id"
      >
        {{ documentType.name }}
      </wl-list-item>
    </wl-filtered-list>

    <div 
      slot="details" 
      class="details"
    >
      <nuxt-child/>
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from "~/components/WlMasterDetailLayout.vue";
import WlListItem from "~/components/WlListItem.vue";
import WlFilteredList from "~/components/WlFilteredList.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  head() {
    return {
      title: this.$t("admin.doc-types.module-name")
    };
  },
  nuxtI18n: {
    paths: { es: "tipos-documento", en: "document-types" }
  },
  components: {
    WlMasterDetailLayout,
    WlListItem,
    WlFilteredList
  },
  computed: {
    ...mapGetters("admin/document-types", {
      documentTypes: "list",
      selected: "selected",
      isSelected: "isSelected",
      isCreating: "isCreating"
    })
  },
  methods: {
    activateRoute(actualIdSelected) {
      if (this.isSelected && actualIdSelected == this.selected.id) {
        this.$router.push(this.localePath({ name: "admin-doc-types" }));
      }
    },
    create() {
      this.$router.push(this.localePath({ name: "admin-doc-types-new" }));
    }
  },
  fetch({ store, params }) {
    return store.dispatch("admin/document-types/loadData");
  }
};
</script>

<style lang="scss" scoped>
.details {
  padding: calc(1em + 0.5vw);
}
</style>
