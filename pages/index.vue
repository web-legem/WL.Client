<template>
  <div>    
    <wl-landing-page
      :src="vipriImg"
    >
      <wl-main-search-form />
    </wl-landing-page>
    <wl-footer />
  </div>
</template>

<script>
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlMainSearchForm from '~/components/home/WlMainSearchForm.vue'
import WlFooter from '~/components/home/WlFooter.vue'
import {mapActions} from 'vuex'

export default {
  components: { 
    WlLandingPage,
    WlMainSearchForm,
    WlFooter,
  }
  , computed: {
    vipriImg() {
      if(!this.$store.state.highContrast)
        return '/img/vipri-light.jpg'
      return '/img/vipri-dark.jpg'
    }
  },
  beforeMount(){
    this.showBorder()
  },
  beforeDestroy() {
    this.hideBorder()
  },
  methods: {
    ...mapActions([
      'showBorder',
      'hideBorder',
    ]),
  }
}
</script>