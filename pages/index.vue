<template>
  <div class="main">
    <div class="contenido_nombre_buscador">
      <div class="site-name">
        <p>Legem</p>
      </div>
      <div class="contenedor_mini_search">
        <form class="mini_search">
          <input
            id="mini_search" 
            type="text">
          <button class="ico2-search" />
        </form>
      </div>
    </div>

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

  </div>
</template>

<script>
export default {}
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.main::before {
  content: ''; 
  background-image: url(~/assets/img/vipri-light.jpg);
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
}

.contenido_nombre_buscador {
  padding-bottom: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.site-name {
  align-self: center;
  padding-top: 20px;
  padding-bottom: 30px;
  font-family: 'Abril Fatface', cursive;
  color: white;
  text-shadow: 1px 1px 2px rgba(140, 140, 140, .6), -1px -1px 3px rgba(0, 0, 0, .67);
  cursor: default;
}

.site-name p {
  margin: 0;
}

.contenedor_mini_search {
  align-self: center;
}

.mini_search {
  width: 100%;
  height: 60px;
  position: relative;
  overflow: hidden;
  display: flex;
  transition: all .4s;
  box-shadow: 0 0 0 8px rgba(17, 21, 21, .3);
}

.mini_search input {
  font-size: x-large;
  padding: 17px;
  border: none;
  color: #444;
  flex: 1;
  background: white;
  opacity: .8;
}

.mini_search input:focus {
  opacity: 1;
}

.mini_search button {
  border: none;
  background: rgb(24, 156, 100);
  color: #fff;
  position: absolute;
  font-size: 35px;
  right: 0;
  padding: 13px;
  cursor: pointer;
  transition: all .2s;
}

.mini_search button:hover {
  background: rgb(20, 108, 71);
}

.mini_search:focus-within {
  animation: a_crecer .3s;
  box-shadow: 0 0 0 6px rgba(25, 156, 100, .6);
}

@keyframes a_crecer {
  0% {transform: scale(1);}
  50% {transform: scale(1.05);}
  100% {transform: scale(1);}
}

@media only screen and (max-width : 320px) {/* < 320*/
    .contenedor_mini_search{
          width:95%;
      } 
}

@media only screen and (min-width : 320px) {/* > 320*/
      .contenedor_mini_search{
          width:90%;
      } 
}

@media only screen and (min-width : 480px) {
    .contenedor_mini_search{width:60%;}
}

@media only screen and (min-width : 768px) {
     .contenedor_mini_search{width:50%;}
}

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

/* Custom, iPhone Retina */ 
@media only screen and (max-width : 320px) {/* < 320*/

    .contenedor_simbolos > div  > div:first-child,
    .contenedor_simbolos > div  > div:last-child
    {display:none;}

    .contenedor_simbolos div div img{height:70px;}
    .site-name {font-size:70px;}
    .logo-wl1 img{display:none;}
    .logo-wl1 p{margin-left:10px;}
}

@media only screen and (min-width : 320px) {/* > 320*/
    
    .contenedor_simbolos div div img{height:70px;}
    .site-name {font-size:70px;}

}

/* Extra Small Devices, Phones */ 
@media only screen and (min-width : 480px) {
    .site-name {font-size:100px;}
}

/* Small Devices, Tablets */
@media only screen and (min-width : 768px) {
}

/* Medium Devices, Desktops */
@media only screen and (min-width : 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width : 1200px) {
}
</style>
