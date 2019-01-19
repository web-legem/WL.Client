<template>
  <div class="figura_logo">
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      width="100%"
      height="100%"
    >
      <defs>
        <defs>
          <radialGradient
            id="rgrad"
            cx="50%"
            cy="50%"
            r="75%"
          >
            <stop
              offset="0%"
              style="stop-color:rgb(0,133,99);stop-opacity:1"
            />
            <stop
              offset="16%"
              style="stop-color:rgb(0,133,99);stop-opacity:1"
            />
            <stop
              offset="100%"
              style="stop-color:rgb(7,48,33);stop-opacity:1"
            />
          </radialGradient>
        </defs>
      </defs>
      <polygon
        id="svg_image"
        points="0,0 1000,0 1000,500 500,1000 0,500"
        fill="url(#rgrad)"
      />
    </svg>
    <div class="contenedor_nombre_escudo">
      <span
        class="escudo-udenar"
        style="fill:white; color:white; font-size:90px; top:10px;position:absolute; left:30px;"
      />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.figura_logo{
  height: 125px;
  width: 150px;
  position: absolute;
  left: 5px; 
  top: -5px; 
  z-index: 1;    
  filter: drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.85));
}

.escudo-udenar:before {
  content: "\10ffff";
}
</style>
