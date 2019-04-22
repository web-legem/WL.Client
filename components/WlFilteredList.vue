<template>
  <nav class="filtered-list">
    <div class="box-filter">
      <div class="filter-add">
        <wl-input-filter
          v-model="filter"
          class="filter"
        />
        <div>
          <wl-button 
            :disable="disable"
            :only-icon="true" 
            :title="$t('components.filtere-list.title-new')"
            ico="ico-plus" 
            @click.native="add"
          />
        </div>
      </div>
    </div>
    <div class="link-list"> 
      <div class="list-content">
        <ul class="link-u-list">
          <slot
            name="list" 
            :filtered-list="filtered"
          />
        </ul>
        <div 
          v-if="isEmpty"
          class="empty-list"
        >
          <span class="ico2-files-empty" />
          <p>
            {{ $t('components.filtere-list.title-press-butt') }}  
          </p>    
        </div>
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
    list: { type: Array, default: () => [] },
    filterCondition: { 
      type: Function, 
      default: filter => x => filter.length < 0
        ? true
        : x.name.toLowerCase().search(filter.toLowerCase()) >= 0
    },
  },
  data() {
    return {
      disable: false,
      filter: "",
    }
  },
  computed: {
    isEmpty() {
      return this.list == null || this.list.length == 0 
    },
    filtered() {
      return this.list.filter(this.filterCondition(this.filter))
    },
  },
  methods: {
    add() {
      this.$emit('add')
    },
  }
}
</script>

<style lang="scss" scoped>
.filtered-list {
  display: flex;
  flex-direction: column;
  padding: calc(1em + .5vw); // TODO- mandar padding para que se pueda sobreescribir y dejar en 0 desde el padre
  height: 100%;
}

.filtered-list ul {
  list-style-type: none;
}

.list-content {
  position: absolute;
  overflow: auto;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
}

.filter {
  width: 100%;
  margin-right: 5px;
}

.filter-add {
  display: flex;
}

.link-list {
  flex-grow: 1;
  border: 1px solid var(--wl_border);
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
}

.empty-list{
  display: flex;
  height: 80%;  
  min-height: 80% !important;
  flex-direction: column;
  align-items: center;  
  justify-content: center;
  padding: 20px;
}

.empty-list span{
  margin-bottom: 10px;
  font-size: 3em;
  color: var(--wl_gray);
}

.empty-list p{
  color: var(--wl_text);
  text-align: center;
}

</style>
