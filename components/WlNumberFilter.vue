<template>
  <div class="wl-number-filter">
    <div
      v-if="showNumberFilter"
      class="filter">
      <label for="numero">
        Número de documento
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
          title="Agregar Filtro"
          ico="ico-filter"
          class="danger"
          @click.native="disableNumberFilter"
        />
      </div>
    </div>

    <div
      v-show="!showNumberFilter"
      class="filter">
      <label for="numero">
        Número de documento
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
          title="Agregar Filtro"
          ico="ico-filter"
          @click.native="enableNumberFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton
  },
  computed: {
    number() {
      return this.$route.query.number || ''
    },
    showNumberFilter() {
      return this.$route.query && this.$route.query.number > 0
    },
  },
  methods: {
    canActivateFilter(){
      let number = this.$refs.inputNumber.value
      return number.length > 0
    },
    enableNumberFilter(){
      let query = { ...this.$route.query }
      query.number = this.$refs.inputNumber.value
      if(this.canActivateFilter()){
        this.$router.push(this.localePath({ name: 'search', query }))
      }
    },
    disableNumberFilter() {
      let query = { ...this.$route.query }
      delete query.number
      this.$router.push(this.localePath({name: 'search', query}))
    },
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
