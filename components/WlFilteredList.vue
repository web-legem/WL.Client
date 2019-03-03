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
  flex-direction: column;
  align-items: center;  
  justify-content: center;
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
