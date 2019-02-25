<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :title="$t('admin.entitie-tab.title-name-entity')"
          :placeholder="$t('admin.entitie-tab.place-enter-name-entity')"
          :max="0"
          :disable="true"
        />
        <wl-input
          class="sm-space-top"
          :title="$t('admin.entitie-tab.title-email')"
          :placeholder="$t('admin.entitie-tab.place-enter-email')"
          :max="0"
          :disable="true"
        />
        <wl-select
          :id="'select'"
          v-model="entityTypeId"
          class="sm-space-top"
          :disable="true"
          :name="'select'"
          :title="$t('admin.entitie-tab.title-select-doc-type')"
          :list="emptyList"
          :value-prop-name="'id'"
          :label-prop-name="'name'"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSelect from "~/components/WlSelect.vue";
export default {
  components: {
    WlCrud,
    WlInput,
    WlSelect
  },
  data() {
    return {
      emptyList : [{id:1,name:""}],
      entityTypeId: ""
    }
  },
}
</script>

<style>

</style>
