<template>
  <div>
    <div class="container-circulo">
           <div class="circulo_carga mediano"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-circulo{
  display:flex;
  justify-content:center;
}
.circulo_carga{
    position:relative;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
    border-radius: 50%;
    border:2px solid var(--wl_gray_light);
}
.circulo_carga:after{
    content: "";
    position: absolute;
    border-radius:50%;
    background: var(--wl_primary);
}

.circulo_carga:before{
    content:"\e02f";
    font-family:"iconos-legem";
    display:flex;
    justify-content:center;
    align-items:center;
    align-items:center;
    width:100%;
    height:100%;
}
/*-----------------------------------------*/

.circulo_carga.grande{
    border-width: 3px;
    width: 100px;
    height: 100px;
}
.circulo_carga.grande:after{
    top:0;
    height:30px;
    width:30px;
}
.circulo_carga.grande:before{
    font-size:40px;    
}


/*-----------------------------------------*/
.circulo_carga.mediano{
    border-width: 2px;
    width: 80px;
    height: 80px;
}
.circulo_carga.mediano:after{
    top:0;
    height:20px;
    width:20px;
}

.circulo_carga.mediano:before{
    font-size:30px;    
}


/*-----------------------------------------*/
.circulo_carga.pequeno{
    border-width: 1px;
    width: 40px;
    height: 40px;
}
.circulo_carga.pequeno:after{
    top:0;
    height:10px;
    width:10px;
}
.circulo_carga.pequeno:before{
    font-size:15px;    
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
