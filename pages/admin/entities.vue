<template>
  <wl-master-detail-layout :has-detail="isSelected">
    <wl-filtered-list slot="master">
      <wl-list-item
        v-for="entity in entities" 
        :to="localePath({ name: 'admin-entities-id', params: {id: entity.id} })"
        :key="entity.id"
      >
        <div>
          {{ entity.name }}
        </div>
        <div class="entity-type-label">{{ entity.entityTypeId }}</div>
      </wl-list-item>
    </wl-filtered-list>

    <div slot="details">
      <nuxt-child />
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue';
import WlListItem from '~/components/WlListItem.vue'
import WlFilteredList from '~/components/WlFilteredList.vue'
import { mapGetters, mapActions } from 'vuex';

export default {
  head() {
    return {
      title: this.$t('admin.entities.module-name')
    };
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , computed: {
    ...mapGetters('admin/entities', {
      entities: 'entities'
      , selected: 'selected'
    })
  }
  , methods: {
    ...mapActions('admin/entities', {
      loadData: 'loadData'
    })
  }
  , fetch({store, params}) {
    return store.dispatch('admin/entities/loadData')
  }
};
</script>

<style lang="scss">
.entity-type-label {
  color: #2dbf85;
}
</style>
