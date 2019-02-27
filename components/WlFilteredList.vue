<template>
  <nav class="filtered-list">
    <div class="box-filter">
      <div class="filter-add">
        <wl-input-filter class="filter" />
        <div>
          <wl-button 
            :disable="disable"
            :only-icon="true" 
            :title="$t('search.filtere-list.title-new')"
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
      <div 
        v-if="emptyList"
        class="empty-list"
      >
        <span class="ico2-files-empty" />
        <p>
          {{ $t('search.filtere-list.title-press-butt') }}  
        </p>    
      </div>
    </div>
  </nav>
</template>

<script>
import WlInputFilter from "~/components/search/WlInputFilter.vue"
import WlButton from "~/components/WlButton.vue"

export default {
  components: {
    WlInputFilter
    , WlButton
  },
  props: {
    emptyList: { type: Boolean, default: false }
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

.empty-list{
  display: flex;
  height: 80%;  
  min-height: 80% !important;
  align-items: center;  
  justify-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.empty-list span{
  margin-bottom: 10px;
  font-size: 3em;
  color: #888;
}

.empty-list p{
  color: #555;
  text-align: center;
}

</style>
