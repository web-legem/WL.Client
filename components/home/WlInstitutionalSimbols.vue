<template>
  <div class="contenedor_simbolos">
    <div>
      <div>
        <div class="acreditacion" />
      </div>
      <div>
        <div class="planeacion" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>

<style lang="scss" scoped>
.contenedor_simbolos {
  background: rgba(0, 0, 0, .6);
  color:white;
  align-items: flex-end;
  justify-content: flex-end;
  width: 100%;
}

.contenedor_simbolos div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

@media only screen and (max-width : 320px) {/* < 320*/
  .contenedor_simbolos > div  > div:first-child,
  .contenedor_simbolos > div  > div:last-child
  {display:none;}

  .contenedor_simbolos div div img{height:70px;}
  .logo-wl1 img{display:none;}
  .logo-wl1 p{margin-left:10px;}
}

@media only screen and (min-width : 320px) {/* > 320*/
  .contenedor_simbolos div div img{height:70px;}
}

.planeacion {
  background-image: url('/img/planeacion.png');
  height: 70px;
  width: 120px;
  background-size: 100% 100%;
  background-repeat:   no-repeat;
  background-position: center center;
}

.acreditacion {
  background-image: url('/img/acreditacion.png');
  height: 70px;
  width: 40px;
  background-size: 100% 100%;
  background-repeat:   no-repeat;
  background-position: center center;
}
</style>
