<template>
  <wl-master-detail-layout :has-detail="false">
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
  , data() {
    return {
      entities: [
        {id: 1, name: 'Rectoría', entityTypeId: 1}
        , {id: 2, name: 'Facultad de Ingeneiría', entityTypeId: 2}
        , {id: 3, name: 'Facultad de Derecho', entityTypeId: 2}
        , {id: 4, name: 'Departamento de Ingenería de Sistemas', entityTypeId: 3}
        , {id: 5, name: 'Departamento de Ingenería Civil', entityTypeId: 3}
        , {id: 6, name: 'Departamento de Derecho', entityTypeId: 3}
        , {id: 7, name: 'Programa de Ingeniería de Sistemas', entityTypeId: 4}
        , {id: 8, name: 'Programa de Tegnología en Computación', entityTypeId: 4}
        , {id: 9, name: 'Programa de Derecho', entityTypeId: 4}
      ]
    }
  }
  , computed: {
    ...mapGetters('admin/entities', {
      entities: 'entities'
    })
  }
  , methods: {
    ...mapActions('admin/entities', {
      loadData: 'loadData'
    })
  }
  // , fetch({store, params}) {
  //   return store.dispatch('admin/entities/loadData')
  // }
};
</script>

<style lang="scss">
.entity-type-label {
  color: #2dbf85;
}
</style>
