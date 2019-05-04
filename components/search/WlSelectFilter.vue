<template>
  <div>
    <div class="filter">
      <label 
        class="texto_labels"      
        for="select"
      >
        {{ label }}
      </label>
      <div class="box_input_ico">
        <wl-select
          :id="'select'"
          v-model="selectedItem"
          :list="list"
          :disable="existItem==true"
          :title="label"
          value-prop-name="id"
          :label-prop-name="labelPropName"
          :hide-label="true"
        />
        <wl-button
          :only-icon="true" 
          :title="existItem ? $t('search.select-filter.title-remove-filter'):$t('search.select-filter.title-add-filter')"
          :ico="existItem ? 'ico2-minus':'ico2-plus'"
          :remove="existItem==true"
          @click.native="actionFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlSelect from '~/components/WlSelect.vue'
import {removeLangExtension} from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton,
    WlSelect,
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
      selectedItem: "",
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
    },
    getItem: {
      get: function() {
        return this.selectedItem;
      },
      set: function(value) {return this.selectedItem = value}
    }
  },
  mounted() {
    if(!this.existItem && this.isFilterEnabled){
      this.disableFilter()
    }
  },
  mounted(){
    this.getItem = this.$route.query[this.param];
  },
  methods: {
    canActivateFilter() {
      return this.selectedItem != 0
    },
    findItem(){
      return this.list.find(x => x[this.valuePropName] == this.$route.query[this.param])
    },
    actionFilter(){
      if(this.existItem){
        this.disableFilter()
      }else{
        this.enableFilter()
      }
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
      this.getItem = ""
    },
    navigateWith(query){
      this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),
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
  width: 100%;
  margin-bottom: 16px;
}

</style>
