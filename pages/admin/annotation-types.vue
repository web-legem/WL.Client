<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list 
      slot="master" 
      :empty-list="annotationTypes != null && annotationTypes.length == 0"
      @add="create"
    >
      <wl-list-item
        v-for="annotationType in annotationTypes"
        :key="annotationType.id"
        route="admin-annotation-types-id"
        active-route="admin-annotation-types"
        :item-id="annotationType.id"
      >
        {{ annotationType.name }}
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
import { mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      title: this.$t("admin.annotation-types.module-name")
    };
  },
  nuxtI18n: {
    paths: { es: "tipos-anotacion", en: "annotation-types" }
  },
  components: {
    WlMasterDetailLayout,
    WlListItem,
    WlFilteredList
  },
  computed: {
    ...mapGetters("admin/annotation-types", {
      annotationTypes: "list",
      isCreating: "isCreating",
      isSelected: "isSelected",
      selected: "selected"
    })
  },
  methods: {
    create() {
      this.$router.push(this.localePath({ name: "admin-annotation-types-new" }));
    }
  },
  fetch({ store, params }) {
    return store.dispatch("admin/annotation-types/loadData");
  }
};
</script>

<style lang="scss" scoped>
.details {
  padding: calc(1em + 0.5vw);
}
</style>
