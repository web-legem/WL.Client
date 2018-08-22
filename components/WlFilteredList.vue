<template>
  <nav class="filtered-list">
    <div class="box-filter">
      <div class="filter-add">
        <wl-input-filter class="filter" />
        <wl-button 
          :disable="disable"
          :ico="'ico-plus'" 
          :only-icon="true" 
          :title="'Nuevo'"
          class="btn-filter-add"/>
      </div>
    </div>
    <div class="link-list">
      <ul>
        <slot />
      </ul>
    </div>
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
  overflow-y: auto;
}

.filter {
  width: 100%;
}

.filter-add {
  display: flex;
}

.btn-filter-add{
  padding-left: 4px;
}

.link-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  height: calc(100% - 43px);
}
</style>
