<template>
  <div>
    <div class="before" />
    <div class="landing-page">
      <div class="contenido_nombre_buscador">
        <div class="site-name">
          <div class="status">            
            <h1 class="ico-hand-paper-o" /><h1>401</h1>
          </div>
          <h2>Lo sentimos, pero usted no esta autorizado para visitar este sitio</h2>
          <div class="link">
            <nuxt-link
              :to="localePath({ name: 'index' })"
            >
              Ir a inicio
            </nuxt-link>
          </div>
        </div>
      </div>
      <wl-institutional-simbols />
    </div>
  </div>
</template>

<script>
import WlInstitutionalSimbols from '~/components/home/WlInstitutionalSimbols.vue'
export default {
  components: {
    WlInstitutionalSimbols
  },
}
</script>

<style lang="scss" scoped>
.contenido_nombre_buscador {
  padding-bottom: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.landing-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.before {
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  background-color:#1C2D38;
}

.site-name {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  align-self: center;
  padding-top: 20px;
  padding-bottom: 30px;
  font-family: 'Lato';
  color: white;
  font-size: 1.5em;
  cursor: default;
}


h1,h2,h3,h4,h5{
  text-align: center;
}

h1{
  margin-bottom: 10px;
}

h2{
  font-size: .9em;
}

a,h2{
  margin-top: 20px;
}

a:link, a:visited {
  background-color: #1C2D38;
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

a:hover, a:active {
  background-color:#0B1216;
  color: white;
}

.status{
  display: flex;
}

.status > h1{
  display: flex;
  margin-right: 10px;
}

</style>
