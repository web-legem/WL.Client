<template>
  <form
    class="wl-search-bar"
    name="form-login"
    data-vv-scope="form1"            
    @submit.prevent=""
  >
    <div class="box_input_ico">
      <label 
        for="form1.search"         
        class="hide-text"
      >
        buscar
      </label>
      <wl-input
        id="form1.search"
        ref="form1.search"
        v-model="words"
        name="form1.search"
        type="search"     
        title="buscador"
        :max="100"
        :min="3"
        :hide-label="true"
      />

      <button 
        v-show="isVisible"
        :type="'button'"
        class="btn_cancel" 
        :title="$t('search.input-filter.title-rem-filt')"
        :aria-label="$t('search.input-filter.title-rem-filt')"
        @click="clearText()"
      >
        <span class="ico-plus" />
      </button>

      <wl-button 
        :type="'submit'"
        :only-icon="true"
        :title="$t('search.search-bar.title-search-bar')"
        ico="ico-search" 
        @click.native="searchWords()"
      />
    </div>
  </form>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlInput from '~/components/WlInput.vue'
import { removeLangExtension } from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton,
    WlInput,
  },
   data() {
    return {
      words:"",
    }
  },
  computed:{
    isVisible() {
      return this.words.length > 0;
    }
  },
  mounted(){
    this.words = this.$route.query.wordsToSearch ? decodeURI(this.$route.query.wordsToSearch) : ''
  },
  methods: {
    searchWords() {
      this.navigateWith(this.addOrRemoveWordsToQuery(this.words))
    },
    addOrRemoveWordsToQuery(val) {
      let query = this.getModifiableQueryParams()

      if(val.length > 0)
        query.wordsToSearch = val
      else 
        delete query.wordsToSearch

      return query
    },
    navigateWith(query) {
      console.log('search bar')
      this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),
        query
      }))
    },
    getModifiableQueryParams() {
      return { ...this.$route.query, page: 1 }
    },
    clearText() {
      this.words ="";
    },
  }
}
</script>

<style lang="scss" scoped>
.wl-search-bar {
  display: flex;
  flex-direction: row;
}

.wl-search-bar div {
  flex: 1;
}

.hide-text {
  font-size: 0em;  
}

</style>
