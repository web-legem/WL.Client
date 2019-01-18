<template>
  <wl-master-detail-layout :has-detail="isSelected || isCreating">
    <wl-filtered-list
      slot="master"
      @add="create"
    >
      <wl-list-item
        v-for="entity in entities" 
        :key="entity.id"
        route="admin-entities-id"
        active-route="admin-entities"
        :item-id="entity.id"
      >
        <div>
          {{ entity.name }}
        </div>
        <div class="entity-type-label">
          {{ entity.entityTypeId }}
        </div>
      </wl-list-item>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  head() {
    return {
      title: this.$t('admin.entities.module-name')
    };
  }
  , nuxtI18n: {
    paths: {
      es: 'entidades'
      , en: 'entities'
    }
  }
  , components: {
    WlMasterDetailLayout
    , WlListItem
    , WlFilteredList
  }
  , computed: {
    ...mapGetters('admin/entities', {
      entities: 'list'
      , isCreating: 'isCreating'
      , isSelected: 'isSelected'
      , selected: 'selected'
    })
  }
  , methods: {
    create() {
      this.$router.push(this.localePath({name: 'admin-entities-new'}))
    }
    , activateRoute(actualIdSelected) {
      if(this.isSelected && actualIdSelected == this.selected.id) {
        this.$router.push(this.localePath({name: 'admin-entities'}))
      }
    }
  }
  , fetch({store, params}) {
    return store.dispatch('admin/entities/loadData')
  }
}
</script>

<style lang="scss">
.entity-type-label {
  color: #2dbf85;
}

.details {
  padding: calc(1em + .5vw);
}
</style>