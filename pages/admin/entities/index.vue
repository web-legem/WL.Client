<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">        
        <wl-input
          :name="'form1.name'"
          :title="$t('admin.entitie-tab.title-name-entity')"
          :placeholder="$t('admin.entitie-tab.place-enter-name-entity')"
          :max="0"
          :disable="true"
        />
        <wl-input
          :name="'form1.email'"
          class="sm-space-top"
          :title="$t('admin.entitie-tab.title-email')"
          :placeholder="$t('admin.entitie-tab.place-enter-email')"
          :max="0"
          :disable="true"
        />
        <wl-select
          v-model="entityTypeId"
          :name="'form1.select'"
          class="sm-space-top"
          :disable="true"
          :title="$t('admin.entitie-tab.title-select-entity-type')"
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
      emptyList : [{id:"",name:"Seleccione un elemento"}],
      entityTypeId: ""
    }
  },
}
</script>
