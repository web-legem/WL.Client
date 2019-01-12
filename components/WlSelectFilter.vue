<template>
  <div class="wl-select-filter">
    <div
      v-if="existItem"
      class="filter">
      <label for="entidad">{{ label }}</label>
      <div class="control">
        <input
          id="entidad"
          :value="findItem()[labelPropName]"
          name="entidad"
          type="text"
          class="a_input"
          disabled
        >
        <wl-button
          :only-icon="true" 
          title="Agregar Filtro"
          ico="ico2-minus"
          class="danger"
          @click.native="disableFilter"
        />
      </div>
    </div>

    <div
      v-if="!existItem"
      class="filter">
      <label for="entidad">{{ label }}</label>
      <div class="control">
        <select 
          id="entidad"
          ref="select"
          v-model="selectedItem"
          name="entidad" 
          class="a_input"
        >
          <option 
            v-for="item in list"
            :key="item.id"
            :value="item[valuePropName]"
          >{{ item[labelPropName] }}</option>
        </select>
        <wl-button
          :only-icon="true" 
          title="Agregar Filtro"
          ico="ico2-plus"
          @click.native="enableFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton,
  },
  props: {
    param: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    list: { 
      type: Array,
      required: true
    },
    valuePropName: {
      type: String,
      required: true
    },
    labelPropName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      selectedItem: 0,
    }
  },
  computed: {
    existItem() {
      let item =  this.findItem()
      return item != null && item != undefined
    },
    isFilterEnabled() {
      const filter = this.$route.query[this.param];
      return filter != null && filter != undefined
    }
  },
  mounted() {
    if(!this.existItem && this.isFilterEnabled){
      this.disableFilter()
    }
  },
  methods: {
    canActivateFilter() {
      return this.selectedItem != 0
    },
    findItem(){
      return this.list.find(x => x[this.valuePropName] == this.$route.query[this.param])
    },
    enableFilter() {
      let query = this.getModifiableQueryParams()
      query[this.param] = this.selectedItem
      if(this.canActivateFilter()) {
        this.navigateWith(query)
      }
    },
    disableFilter() {
      let query = this.getModifiableQueryParams()
      delete query[this.param]
      this.navigateWith(query)
    },
    navigateWith(query){
      this.$router.push(this.localePath({
        name: 'search',
        query
      }))
    },
    getModifiableQueryParams() {
      return {...this.$route.query, page: 1}
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 992px) {
  .wl-select-filter {
    min-width: 270px;
  }
}

.filter {
  margin-bottom: 16px;
}

.control {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.control select {
  flex-grow: 1;
}

.wl-select-filter h3 {
  color: green;
  padding-bottom: 5px;
  border-bottom: 1px solid green;
  margin-bottom: 8px;
}
</style>
