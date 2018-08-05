<template>
  <div>
    <h1>{{ $t('admin.entities.module-name') }}</h1>
    <div>
      <nuxt-link :to="localePath({ name: 'admin-entities-new' })">New</nuxt-link>
    </div>

    <master-detail-layout>
      <li
        v-for="entity in entities" 
        :key="entity.id">
        <nuxt-link :to="localePath({ name: 'admin-entities-id', params: {id: entity.id} })">
          <div>{{ entity.name }}</div>
        </nuxt-link>
      </li>

      <div slot="details">
        <nuxt-child />
      </div>
    </master-detail-layout>
  </div>    
</template>

<script>
import MasterDetailLayout from "~/components/MasterDetailLayout.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      title: this.$t("admin.entities.module-name")
    };
  },
  components: {
    MasterDetailLayout
  },
  computed: {
    ...mapGetters("admin/entities", {
      entities: "entities"
    })
  },
  methods: {
    ...mapActions("admin/entities", {
      loadData: "loadData"
    })
  }
  // , fetch({store, params}) {
  //   return store.dispatch('admin/entities/loadData')
  // }
};
</script>
