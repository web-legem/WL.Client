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
  padding: 0 0;
  overflow-y: auto;
}

.filter {
  width: 100%;
}

.filter-add {
  display: flex;
  height: 100%;
}

.box-filter {
  flex-wrap: wrap;
}

.btn-filter-add{
  margin-left: 4px;
  margin: 0;
  padding-left: 4px;
  height: 100%;
}

.link-list {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
}
</style>
