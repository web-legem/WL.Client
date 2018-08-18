<template>
  <div class="contenedor_simbolos">
    <div>
      <div>
        <img src="~/assets/img/acreditacion.png" >
      </div>
      <div>
        <img src="~/assets/img/planeacion.png" >
      </div>
      <div>
        <img src="~/assets/img/years-111.png" >
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.contenedor_simbolos {
  background: rgba(0, 0, 0, .6);
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
</style>
