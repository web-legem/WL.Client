<template>
  <nav class="filtered-list">
    <label class="texto_labels">buscador</label>
    <div class="filter-add">
      <wl-input-filter />
      <wl-button 
        :disable="disable"
        :ico="'ico-plus'" 
        :only-icon="true" 
        :title="'Nuevo'"
        class="btn-filter-add"/>
    </div>
    <ul>
      <slot />
    </ul>
  </nav>
</template>

<script>
import WlInputFilter from "~/components/WlInputFilter.vue";
import WlButton from "~/components/WlButton.vue";

export default {
  components: {
    WlInputFilter,
    WlButton
  }
};
</script>

<style>
.filtered-list {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.filtered-list ul {
  list-style-type: none;
  padding: 0 0;
  flex-grow: 1;
  overflow-y: auto;
}

.filter-add {
  display: flex;
}

.btn-filter-add{
  margin-left: 4px;
}

</style>
