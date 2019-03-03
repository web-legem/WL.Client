<template>
  <div>
    <div class="container-circulo">
      <div class="load_list" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-circulo{
  display:flex;
  justify-content:center;
}
.load_list {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  border: 5px solid #e1e1e1;
  border-radius: 50%;
  margin: 15px 0 0 -30px;
  border-top: 5px solid #0f745b;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
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
