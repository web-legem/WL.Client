<template>
  <nav class="filtered-list">
    <div class="box-filter">
      <div class="filter-add">
        <wl-input-filter class="filter" />
        <div>
          <wl-button 
            :disable="disable"
            :only-icon="true" 
            title="Nuevo"
            ico="ico-plus" 
            @click.native="add"
          />
        </div>
      </div>
    </div>
    <div class="link-list">
      <ul class="link-u-list">
        <slot />
      </ul>
    </div>
  </nav>
</template>

<script>
import WlInputFilter from "~/components/WlInputFilter.vue"
import WlButton from "~/components/WlButton.vue"

export default {
  components: {
    WlInputFilter
    , WlButton
  }
  , data() {
    return {
      disable: false
    }
  }
  , methods: {
    add() {
      this.$emit('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.filtered-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: calc(1em + .5vw); // TODO- mandar padding para que se pueda sobreescribir y dejar en 0 desde el padre
}

.filtered-list ul {
  list-style-type: none;
}

.filter {
  width: 100%;
  margin-right: 5px;
}

.filter-add {
  display: flex;
}

.link-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border: 1px solid #ccc;
  height: calc(100% - 43px);
  widows: 100%;
}

.link-u-list {
  width: 100%;
}
</style>
