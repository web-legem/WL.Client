<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list
      slot="master"
      :list="entityTypes"
      @add="create"
    >
      <template
        slot="list"
        slot-scope="{ filteredList }"
      >
        <wl-list-item
          v-for="entityType in filteredList"
          :key="entityType.id"
          route="admin-entity-types-id"
          active-route="admin-entity-types"
          :item-id="entityType.id"
        >
          {{ entityType.name }}
        </wl-list-item>
      </template>
    </wl-filtered-list>
    
    <div
      slot="details"
      class="details"
    >
      <nuxt-child />
    </div>
  </wl-master-detail-layout>
</template>

<script>
import WlMasterDetailLayout from '~/components/WlMasterDetailLayout.vue'
import WlListItem from '~/components/WlListItem.vue'
import WlFilteredList from '~/components/WlFilteredList.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  head() {
    return {
      title: this.$t('admin.entity-types.module-name')
    }
  },
  nuxtI18n: {
    paths: {
      es: 'tipos-entidad',
      en: 'entity-types',
    }
  },
  components: {
    WlMasterDetailLayout,
    WlListItem,
    WlFilteredList,
  },
  computed: {
    ...mapGetters('admin/entity-types', {
      entityTypes: 'list',
      isCreating: 'isCreating',
      isSelected: 'isSelected',
      selected: 'selected',
    })
  },
  fetch({store, params}) {
    return store.dispatch('admin/entity-types/loadData')
  },
  methods: {
    create() {
      this.$router.push(this.localePath({name: 'admin-entity-types-new'}))
    },
    activateRoute(actualIdSelected) {
      if(this.isSelected && actualIdSelected == this.selected.id) {
        this.$router.push(this.localePath({name: 'admin-entity-types'}))
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.details {
  padding: calc(1em + .5vw);
}
</style>
