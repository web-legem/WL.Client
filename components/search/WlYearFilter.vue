<template>
  <div>
    <div
      v-show="showPublicationFilter"
      class="filter"
    >
      <label for="publicacion">
        {{ $t('search.year-filter.label-year-publ') }}
      </label>
      <div class="control">
        <input
          id="publicacion"
          :value="publicationDate"
          name="publicacion"
          type="text"
          class="a_input"
          disabled
        >
        <wl-button 
          :only-icon="true"
          :title="$t('search.select-filter.title-add-filter')"
          ico="ico2-minus"
          class="danger"
          @click.native="disablePublicationFilter"
        />
      </div>
    </div>

    <div
      v-show="!showPublicationFilter"
      class="filter"
    >
      <label for="publicacion">
        {{ $t('search.year-filter.label-year-publ') }}
      </label>
      <div class="control">
        <input
          id="publicacion"
          ref="inputDate"
          :max="max"
          :min="min"
          name="publicacion"
          type="number"
          class="a_input"
        >
        <wl-button 
          :only-icon="true"
          :title="$t('search.select-filter.title-add-filter')"
          ico="ico2-plus"
          @click.native="enablePublicationFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import { removeLangExtension } from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton,
  },
  computed: {
    publicationDate() {
      return this.$route.query.publicationDate || this.currentYear
    },
    showPublicationFilter(){
      return Number.parseInt(this.$route.query.publicationDate)
        && this.$route.query.publicationDate >= this.min 
        && this.$route.query.publicationDate <= this.max
    },
    min() {
      return 1999
    },
    max() {
      return new Date().getFullYear()
    }
  },
  methods: {
    canActivateFilter() {
      let number = this.$refs.inputDate.value
      return number >= this.min && number <= this.max
    },
    enablePublicationFilter() {
      let query = { ...this.$route.query }
      query.publicationDate = this.$refs.inputDate.value
      if(this.canActivateFilter()){
        this.$router.push(this.localePath({
          name: removeLangExtension(this.$route.name),
          query }))
      }
    },
    disablePublicationFilter() {
      let query = { ...this.$route.query }
      delete query.publicationDate
      this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),
        query }))
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
  background: red;
  color: green;
  padding-bottom: 5px;
  border-bottom: 1px solid green;
  margin-bottom: 8px;
}
</style>
