<template>
  <div>
    <div class="container-circulo">
      <div 
        class="load_list" 
        :class="{'error':error}"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Boolean, default: false },
  }
}
</script>

<style lang="scss" scoped>
.container-circulo{
  display:flex;
  align-items: center;
  justify-content: center;
}
.load_list {
  display: flex;
  z-index: 1;
  border: 5px solid var(--wl_gray);
  border-radius: 50%;
  border-top: 5px solid var(--wl_tab_text);
  width: 60px;
  height: 60px;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}

.load_list.error{
  border: 5px solid var(--wl_text_error);
  border-top: 5px solid var(--wl_text_error);
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
