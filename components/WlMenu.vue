<template>
  <div class="menu">

    <!-- <wl-cinta-logo /> -->

    <nav class="nav">
      <ul class="modules">
        <li 
          v-for="(menuItem, index) in menuItems"
          :key="index"
        >
          <nuxt-link
            :to="localePath({ name: menuItem.link })"
            class="module" 
          >
            <div>
              <span
                :class="[ menuItem.icon ]"
                class="ico"
              />
              {{ menuItem.label }}
            </div>
          </nuxt-link>
        </li>
      </ul>

      <button
        class="accesibility"
        @click="toggleA11yPanel"
        @keypress.enter="toggleA11yPanel"
        @blur="hideA11yPanel"
      >
        <span class="ico ico-wheelchair" />
      </button> 

      <transition name="slide-fade-vertical">
        <wl-a11y-controls
          v-if="$store.state.showA11yPanel"
        />
      </transition>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import WlCintaLogo from '~/components/WlCintaLogo.vue'
import WlA11yControls from '~/components/WlA11yControls.vue'

export default {
  components: {
    WlCintaLogo
    , WlA11yControls
  }
  , data() {
    return {
      menuItems: [
        {
          label: 'Componentes'
          , icon: 'ico-cubes'
          , link: 'admin'
          , show: 'true'
        }
        , {
          label: 'Busqueda'
          , icon: 'ico-search'
          , link: 'search'
          , show: 'true'
        }
        , {
          label: 'Inicio'
          , icon: 'ico-home'
          , link: 'index'
          , show: 'true'
        }
        , {
          label: 'Ingresar'
          , icon: 'ico-sign-in'
          , link: 'login'
          , show: 'true'
        }
      ]
    };
  }
  , methods: {
    ...mapActions([
      'toggleA11yPanel'
      , 'hideA11yPanel'
    ])
  }
};
</script>

<style>
.menu {
  --header-height: calc(25px + 4.5vh);
  position: fixed;
  width: 100%;
  height: var(--header-height);
  min-height: 45px;
  background: rgba(0, 0, 0, 0.75);
  border-bottom: 1px solid #6c767d;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.nav {
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

ul.modules {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin: 0;
}

ul.modules > li {
  padding: 0;
  height: var(--header-height);
}

.module {
  display: flex;
  flex-direction: column;
  height: inherit;
  font-family: "Lato", sans-serif;
  font-size: 1em;
  color: #fff;
  text-decoration: none;
  align-items: center;
}

.module > div {
  display: flex;
  flex-grow: 1;
  align-content: center;
  vertical-align: center;
  align-items: center;
  padding: 0 10px;
}

.module .ico {
  padding: 5px 10px 0 0;
  margin: 0;
}

.module:after {
  content: "";
  width: 0;
  height: 4px;
  background: white;
  left: 50%;
  bottom: 0;
  transition: all .5s;
}

.module:hover:after {
  width: 100%;
  left: 0;
}

button.accesibility {
  min-width: var(--header-height);
  background: rgba(0, 0, 0, 0);
  border: none;
  padding: 0;
}

button:focus,
button:hover {
  background: #23948a;
}

button .ico-wheelchair {
  width: var(--header-height);
  height: var(--header-height);
  background: rgba(0, 0, 0, 0);
  color: white;
  font-size: 16px;
  position: relative;
  cursor: pointer;
}
</style>
