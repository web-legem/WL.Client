<template>
  <div>
    <wl-landing-page
      :src="img"
      background-color="#8f956f"
    >
      <wl-login-form />
    </wl-landing-page>
  </div>
</template>

<script>
import { imagesContext } from '~/helpers/imagesContext'
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlLoginForm from '~/components/login/WlLoginForm.vue'

export default {
  components: {
    WlLandingPage
    , WlLoginForm
  }
  , nuxtI18n: {
    paths: {
      es: '/ingreso'
      , en: '/login'
    }
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
