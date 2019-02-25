<template>
  <div class="wl-number-filter">
    <div
      v-if="showNumberFilter"
      class="filter"
    >
      <label for="numero">
        {{ $t('components.number-filter.label-num-doc') }}
      </label>
      <div class="control">
        <input
          id="numero"
          :value="number"
          name="numero"
          type="text"
          class="a_input"
          disabled
        >
        <wl-button 
          :only-icon="true"
          :title="$t('components.number-filter.title-add-fil')"
          ico="ico2-minus"
          class="danger"
          @click.native="disableNumberFilter"
        />
      </div>
    </div>

    <div
      v-show="!showNumberFilter"
      class="filter"
    >
      <label for="numero">
        {{ $t('components.number-filter.label-num-doc') }}
      </label>
      <div class="control">
        <input
          id="numero"
          ref="inputNumber"
          :value="number"
          name="numero"
          type="text"
          class="a_input"
        >
        <wl-button 
          :only-icon="true"
          :title="$t('components.number-filter.title-add-fil')"
          ico="ico2-plus"
          @click.native="enableNumberFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import {removeLangExtension} from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton
  },
  computed: {
    number() {
      return this.$route.query.number || ''
    },
    showNumberFilter() {
      return this.$route.query.number && this.$route.query.number.length > 0
    },
  },
  methods: {
    canActivateFilter(){
      let number = this.$refs.inputNumber.value
      return number.length > 0
    },
    enableNumberFilter(){
      if(this.canActivateFilter()){
        this.navigateWith(this.getEnabledFilterQueryParams())
      }
    },
    disableNumberFilter() {
      this.navigateWith(this.getDisabledFilterQueryParams())
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

.control {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.control select {
  flex-grow: 1;
}

.wl-number-filter h3 {
  color: green;
  padding-bottom: 5px;
  border-bottom: 1px solid green;
  margin-bottom: 8px;
}
</style>
