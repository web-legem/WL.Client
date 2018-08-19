<template>
  <div>
    <wl-landing-page
      :src="vipriImg">
      <wl-main-search-form />
    </wl-landing-page>

    <section id="recent-section">
      <wl-recent />
    </section>
  </div>
</template>

<script>
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlRecent from '~/components/WlRecent.vue'
import WlMainSearchForm from '~/components/WlMainSearchForm.vue'
import { imagesContext } from '~/helpers/imagesContext'

export default {
  components: { 
    WlLandingPage
    , WlMainSearchForm
    , WlRecent
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
