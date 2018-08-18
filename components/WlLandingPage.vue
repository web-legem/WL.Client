<template>
  <div>
    <div
      :style="{ backgroundImage: 'url(' + src + ')' }"
      class="before"
    />

    <div class="landing-page">
      <slot />
      <wl-institutional-simbols />
    </div>
  </div>
</template>

<script>
import WlInstitutionalSimbols from '~/components/WlInstitutionalSimbols.vue'

export default {
  components: {
    WlInstitutionalSimbols
  }
  , props: {
    src: {
      type: String
      , required: true
    }
  }
}
</script>

<style>
.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.before {
  background-size: 100%;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>
