<template>
  <div>
    <wl-landing-page
      :src="img"
    >
      <wl-login-form />
    </wl-landing-page>
  </div>
</template>

<script>
import { imagesContext } from '~/helpers/imagesContext'
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlLoginForm from '~/components/WlLoginForm.vue'

export default {
  components: {
    WlLandingPage
    , WlLoginForm
  }
  , data() {
    return {
      img: imagesContext('./entrada.jpg')
    }
  }
}
</script>

<style>

</style>
