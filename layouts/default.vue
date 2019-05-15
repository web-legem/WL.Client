<template>
  <div :class="{'high-contrast': highContrast }">
    <a 
      id="a_top"
      class="to_top" 
      href="#main-content"      
    >
      {{ $t('components.menu.to-top') }}
    </a>
    <div 
      id="top" 
      name="top"
    >
      <wl-menu />
      <div 
        id="main-content"
        class="nuxt"
      >
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import WlMenu from '@/components/WlMenu.vue'

export default {
  components: {
    WlMenu
  }, 
  computed: {
    highContrast() {
      if(typeof(document) != 'undefined'){
        document.getElementsByTagName('body')[0].className =
          this.$store.state.highContrast
            ? "high-contrast"
            : ""
      }
      return this.$store.state.highContrast
    }
  },
  created () {
    if (process.browser) { 
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed () {
    if (process.browser) { 
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  methods: {
    handleScroll (event) {
      if (process.browser) { 
        if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
          document.getElementById("a_top").style.display = "block";
        } else {
          document.getElementById("a_top").style.display = "none";
        }
      }
    }
  },

}
</script>

<style>
.nuxt {
  height: 100vh;
}
</style>
