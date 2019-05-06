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
      <a>{{ $t('search.search-result.a-entity') }}<span>{{ entityName }} </span> | </a>
      <a>{{ $t('search.search-result.a-date') }} <span>{{ document.publicationDate | date($store.state.i18n.locale, 'LL') }} </span> | </a>
    </div>

    <div class="control_tarjeta">
      <a 
        :href="$axios.defaults.baseURL + 'api/Search/file/download/' + document.id"
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
}


.subcontenido_tarjeta span {
  font-style: italic;
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

.link-bold {
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;
}

</style>
