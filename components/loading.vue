<template lang="html">
  <div 
    v-if="loading"
    class="loading-page" 
  >
    <wl-load2 
      v-if="true" 
    />      
    <p class="">
      Procesando ... 
    </p>
  </div>
</template>

<script>
import WlLoad2 from "~/components/WlLoad2.vue";

export default {
  components: {
    WlLoad2,
  },

  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--wl_loading_bg);
  color: var(--wl_text);
  text-align: center;
  padding-top: 200px;
  font-size: 1.5em;
  font-family: 'Lato';
  z-index: 9999;
}

p{
  margin-top: 30px;
}
</style>
