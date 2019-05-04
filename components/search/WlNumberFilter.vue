<template>
  <div class="wl-number-filter">
    <div class="filter">
      <label 
        class="texto_labels"
        for="numero" 
      >
        {{ $t('search.number-filter.label-num-doc') }}
      </label>
      <div class="box_input_ico">
        <wl-input
          id="numero"
          ref="inputNumber"
          v-model="getNumber"
          :disable="showNumberFilter"
          :title=" $t('search.number-filter.label-num-doc')"
          :max="20"
          :min="1"
          :placeholder=" $t('persons.users-s.place-enter-id')"
          :hide-label="true"
        />
        <wl-button 
          :only-icon="true"
          :title="showNumberFilter? $t('search.number-filter.title-remove-fil'): $t('search.number-filter.title-add-fil')"
          :ico="showNumberFilter? 'ico2-minus':'ico2-plus'"
          :remove="showNumberFilter"
          @click.native="actionFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlInput from '~/components/WlInput.vue'
import {removeLangExtension} from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton,
    WlInput,
  },
  data() {
    return {
      number: "",
    }
  },  
  computed: {
    showNumberFilter() {
      return this.$route.query.number && this.$route.query.number.length > 0
    },
    getNumber: {
      get: function() {
        return this.number;
      },
      set: function(value) {return this.number = value}
    }
  },
  mounted(){
    this.getNumber = this.$route.query.number;
  },
  methods: {
    canActivateFilter(){
      let number = this.$refs.inputNumber.value
      return number.length > 0
    },
    actionFilter(){
      if(this.showNumberFilter){
        this.disableNumberFilter();
      }else{
        this.enableNumberFilter();
      }    
    },

    enableNumberFilter(){
      if(this.canActivateFilter()){
        this.navigateWith(this.getEnabledFilterQueryParams())
      }
    },
    disableNumberFilter() {
      this.navigateWith(this.getDisabledFilterQueryParams())
      this.getNumber = ''
    },
    
    getEnabledFilterQueryParams() {
      const queryParams = this.getModifiableQueryParams()
      queryParams.number = this.$refs.inputNumber.value
      return queryParams
    },
    getDisabledFilterQueryParams(){
      const queryParams = this.getModifiableQueryParams()
      delete queryParams.number
      return queryParams
    },
    getModifiableQueryParams() {
      return {...this.$route.query, page: 1}
    },
    navigateWith(query) {
      this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),
        query
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  margin-bottom: 16px;
}
</style>
