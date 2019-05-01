<template>
  <div class="contenido_nombre_buscador">
    <div class="site-name">
      <h1 class="site-name">
        Legem 
      </h1>
    </div>
    <div class="contenedor_mini_search">
      <form
        class="mini_search"
        action=""
        @submit.prevent
      >
        <label 
          for="mini_search" 
          class="hide-text"
        >
          Search
        </label>
        <input
          id="mini_search" 
          v-model="wordsToSearch"
          type="text"
          aria-labelledby="search-button"
        >
        <button
          id="search-button"
          type="submit"
          @click="search()"
        >          
          <span class="ico2-search" />            
          <span class="hide-text">
            Search
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wordsToSearch: ''
    }
  },
  methods: {
    search() {
      var query = this.wordsToSearch != null && this.wordsToSearch.length > 0
        ? { wordsToSearch: encodeURI(this.wordsToSearch) }
        : {}
      this.$router.push(this.localePath({
        name: 'search',
        query
      }))
    }
  }
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
  box-shadow: 0 0 0 8px var(--wl_search_sha);
}

.mini_search input {
  font-size: 2em;
  padding: 17px;
  border: none;
  color: #111111;
  flex: 1;
  background: #ffffff;
  opacity: .8;
}

.mini_search input:focus {
  opacity: 1;
}

.mini_search button {
  border: none;
  background: var(--wl_primary);
  color:var(--wl_btn_content);
  position: absolute;
  height: 100%;
  width: 60px;
  right: 0;
  padding: 13px;
  cursor: pointer;
  transition: all .2s;
}

.mini_search button:hover {
  background: var(--wl_dark);
}

.mini_search button span:first-child {
  background: var(--wl_primary);
  color: var(--wl_btn_content);
  display: flex;
  justify-content: center;
  font-size: xx-large;
  height: 100%;
}

.mini_search:focus-within {
  animation: a_crecer .3s;
  box-shadow: 0 0 0 6px var(--wl_search_sha_foc);
}

@keyframes a_crecer {
  0% {transform: scale(1);}
  50% {transform: scale(1.05);}
  100% {transform: scale(1);}
}

@media only screen and (max-width : 320px) {
  .contenedor_mini_search{
    width:95%;
  } 

  .site-name {
    font-size: 2em;
  }
}

@media only screen and (min-width : 320px) {
  .contenedor_mini_search{
    width:90%;
  } 

  .site-name {
    font-size: 2.4em;
  }
}

@media only screen and (min-width : 480px) {
  .contenedor_mini_search{
    width:60%;
  }
}

@media only screen and (min-width : 768px) {
  .contenedor_mini_search{
    width:50%;
  }
}

.hide-text {
  font-size: 0em;  
  overflow: hidden;
}
</style>
