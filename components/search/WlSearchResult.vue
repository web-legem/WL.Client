<template>
  <div class="tarjeta_busqueda">    
    <div class="titulo_tarjeta">
      <nuxt-link 
        :to="localePath({ name: routeName, params: {id: document.documentId} })"
        class="link-bold"
      >        
        {{ documentTypeName }}
        {{ document.number }}
        {{ $t('search.search-result.a-del') }} {{ document.publicationDate | date($store.state.i18n.locale, 'YYYY') }}
      </nuxt-link>
    </div>

    <div class="contenido_tarjeta" v-if="document.issue">
      {{ document.issue | limit(400) }}
    </div>

    <div class="subcontenido_tarjeta">
      <a>{{ $t('search.search-result.a-entity') }}<i>{{ entityName }} </i> | </a>
      <a>{{ $t('search.search-result.a-date') }} <i>{{ document.publicationDate | date($store.state.i18n.locale, 'LL') }} </i> | </a>
    </div>

    <div class="control_tarjeta">
      <a 
        :href="$axios.defaults.baseURL + 'api/File/' + document.documentId"
        download
        :title="$t('search.search-result.title-down')"
      >
        <span class="ico-download" />{{ 'Descargar' }}
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
  display: -webkit-flex;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-self:center;
  position:relative;
  padding:15px;
}

.titulo_tarjeta {
  display:flex; 
  font-family: 'Lato';
  font-size:.9rem;
  line-height:normal;
  padding-bottom:5px;
}

.titulo_tarjeta a {
  color:#0f745b;
  -moz-text-decoration-color: #0f745b;
  text-decoration-color: #0f745b;
  cursor:pointer;
}

.contenido_tarjeta {
  color:#222;
  font-size: .8rem;
  font-family: 'Lato';
  text-align:justify;
}

.subcontenido_tarjeta {
  padding-top:5px;
  color:#666;
  font-size: .8rem;
  font-family: 'Lato';
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
  border-bottom:1px solid #ccc;
}

.control_tarjeta > a {
  color:#0f745b;
  text-decoration:none;
  cursor:pointer;
  font-size: .8rem;
  font-family: 'Lato';
  position:relative;
  padding-left:5px;
}

.link_tarjeta {
  color:#0f745b;
  text-decoration:none;
  cursor:pointer;
  font-size: .8rem;
  font-family: 'Lato';
  position:relative;
}

.link_tarjeta:hover {
  color:#444;
}

.link_tarjeta > span {
  position:absolute;
  left:-14px;
  top:1px;
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
  box-shadow: 0 0 0 1px #ddd,1px 1px 1px rgba(0, 0, 0, 0.44)  ;
  display:flex;
}

.tarjeta_anotacion > div:first-child {
  margin-right:10px;
}

.tarjeta_anotacion > div:first-child span:before {
  font-size:45px;        
  color:#2c77ba;
  height:100%;
  display:flex;
  align-items:center;
}

.tarjeta_anotacion > div:last-child {
  flex:1;
}

.tarjeta_anotacion:hover {
  background:#C6E2EE;
  cursor:pointer;
}

.documento_actual {
  margin:5px 0;
  display:flex;
  padding:10px;
  background:#fff;
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
  align-items:center;
}


.documento_actual > div:last-child {
  margin-bottom:3px;
}

.documento_actual > div:last-child > p:first-child {
  font-size: .8rem;
  color:#27ae60;
}

.documento_actual p {
  color:#555;
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
}

.subcontenido_tarjeta.anotacion {
  padding:0;
  color:#34495e; 
  font-family: 'Lato';
}
.subcontenido_tarjeta.anotacion i {
  font-style:normal;
  font-family: 'Lato';
}

.tipo_anotacion p {
  text-decoration:none;
  color:#34495e;
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
