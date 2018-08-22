<template>
  <div>
    <wl-landing-page
      :src="vipriImg">
      <wl-main-search-form />
    </wl-landing-page>
    <wl-footer />
  </div>
</template>

<script>
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlMainSearchForm from '~/components/WlMainSearchForm.vue'
import WlFooter from '~/components/WlFooter.vue'
import { imagesContext } from '~/helpers/imagesContext'

export default {
  components: { 
    WlLandingPage
    , WlMainSearchForm
    , WlFooter
  }
  , computed: {
    vipriImg() {
      if(!this.$store.state.highContrast)
        return imagesContext('./vipri-light.jpg')
      return imagesContext('./vipri-dark.jpg')
    }
  }
}
</script>

<style>
</style>
