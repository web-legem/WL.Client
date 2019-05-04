<template>
  <div class="tarjeta_busqueda">    
    <div class="titulo_tarjeta">
      <nuxt-link 
        v-if="documentTypes && documentTypes.length > 0"
        :to="localePath({ name: routeName, params: {id: document.id} })"
        class="link-bold"
        lang="es-CO"
      >        
        {{ documentTypeName }}
        {{ document.number }}
        {{ $t('search.search-result.a-del') }} {{ document.publicationDate | date($store.state.i18n.locale, 'YYYY') }}
      </nuxt-link>
    </div>

    <div 
      v-if="document.issue"
      class="contenido_tarjeta" 
      lang="es-CO"
    >
      {{ document.issue | limit(400) }}
    </div>

    <div 
      v-if="entities && entities.length > 0"
      class="subcontenido_tarjeta"
    >
      <a>{{ $t('search.search-result.a-entity') }}<i>{{ entityName }} </i> | </a>
      <a>{{ $t('search.search-result.a-date') }} <i>{{ document.publicationDate | date($store.state.i18n.locale, 'LL') }} </i> | </a>
    </div>

    <div class="control_tarjeta">
      <a 
        :href="$axios.defaults.baseURL + 'api/Document/download/' + document.id"
        download
        :title="$t('search.search-result.title-down')"
      >
        <span class="ico-download" />{{ $t('search.search-result.download') }}
      </a>
      <slot />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    document: {
      type: Object,
      required: true
    },
    routeName: {
      type: String,
      default: 'search-id'
    },
  },
  computed: {
    ...mapGetters('search', {
      entities: 'entities',
      documentTypes: 'documentTypes',
    }),
    entityName(){
      return this.entities.find(x => x.id == this.document.entityId).name
    },
    documentTypeName() {
      return this.documentTypes.find(x => x.id == this.document.documentTypeId).name
    }
  }
}
</script>

<style>
.tarjeta_busqueda {
  overflow:hidden;  
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-self:center;
  position:relative;
  padding:15px;
  font-family: 'Lato';
}

.titulo_tarjeta {
  display:flex; 
  font-size:.9rem;
  line-height:normal;
  padding-bottom:5px;
}

.titulo_tarjeta a {
  background: transparent;
  color:var(--wl_primary);
  -moz-text-decoration-color:var(--wl_primary);
  text-decoration-color: var(--wl_primary);
  cursor:pointer;
}

.contenido_tarjeta {
  background: transparent;
  color: var(--wl_text_dark);
  font-size: .8rem;
  text-align:justify;
}

.subcontenido_tarjeta {
  padding-top:5px;
  background: transparent;
  color:var(--wl_text);
  font-size: .8rem;
  text-align:justify;
}

.control_tarjeta {
  width:100%;
  display:flex;
  flex-grow:1;
  justify-content:flex-end;
  align-self:flex-end;
  align-items:flex-end;
  transition:all .6s;
  padding-top:5px;   
  padding-bottom:10px;
  margin-bottom:-10px;
  border-bottom:1px solid var(--wl_gray);
}

.control_tarjeta > a {
  background: transparent;
  color: var(--wl_primary);
  text-decoration:none;
  cursor:pointer;
  font-size: .8rem;
  position:relative;
  padding-left:5px;
}

.control_tarjeta > a:first-child {
  margin-right:20px;
}

.control_tarjeta a > span {
    position:absolute;
    left:-10px;
    top:2px;
}

.control_tarjeta > a:hover {
    text-decoration:underline;
}

.tarjeta_anotacion {
  padding:10px;
  margin-bottom:10px;
  background:#fefefe;
  color:red;
  box-shadow: 0 0 0 1px #ddd,1px 1px 1px rgba(0, 0, 0, 0.44)  ;
  display:flex;
}

.tarjeta_anotacion > div:first-child {
  margin-right:10px;
}

.tarjeta_anotacion > div:first-child span:before {
  font-size:45px;        
  color:#2c77ba;
  background: red;
  height:100%;
  display:flex;
  align-items:center;
}

.tarjeta_anotacion > div:last-child {
  flex:1;
}

.tarjeta_anotacion:hover {
  background:#C6E2EE;
  color:red;
  cursor:pointer;
}

.documento_actual {
  margin:5px 0;
  display:flex;
  padding:10px;
  background:#fff;
  color:blue;
  border:1px solid #dde;
}

.documento_actual > div:first-child {
  margin-right:10px;
  display:flex;
  align-items:center;
  align-self:stretch;
}

.documento_actual > div:first-child span:before {
  font-size:45px;  
  height:100%;
  display:flex;
  color:#27ae60;
  background: blue;
  align-items:center;
}


.documento_actual > div:last-child {
  margin-bottom:3px;
}

.documento_actual > div:last-child > p:first-child {
  font-size: .8rem;
  color:#27ae60;
  background: blue;
}

.documento_actual p {
  color:#555;
  background: blue;
  font-size: .8rem;
  font-family: 'Lato';
}

.documento_actual  p  i {
  font-style:normal;
  font-family: 'Lato';
}

.titulo_tarjeta.anotacion {
  padding:0;
  margin:0;
}

.titulo_tarjeta.anotacion  a {
  font-family: 'Lato';
  padding:0;
  margin:0;
  font-size: .8rem;
  color:#2c77ba;
  background: red;
}

.subcontenido_tarjeta.anotacion {
  padding:0;
  color:#34495e; 
  background: red;
  font-family: 'Lato';
}
.subcontenido_tarjeta.anotacion i {
  font-style:normal;
  font-family: 'Lato';
}

.tipo_anotacion p {
  text-decoration:none;
  color:#34495e;
  background: red;
  font-size: .8rem;
  font-family: 'Lato';
}
.tipo_anotacion p i {
  font-family: 'Lato';
  font-style: normal;
}

@media only screen and (min-width : 0)  {
  .tarjeta_anotacion > div:first-child,
  .documento_actual > div:first-child {           
    display:none;
  }
}

@media only screen and (min-width : 480px)  {
  .tarjeta_anotacion > div:first-child,
  .documento_actual > div:first-child {     
    display:unset;
  }
}

.link-bold {
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;
}

.tarjeta-busqueda {
  font-size: .8rem;
}
</style>
