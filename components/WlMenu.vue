<template>
  <div class="menu">
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
            <span
              :class="[ menuItem.icon ]"
              class="ico"
            />
            {{ menuItem.label }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
    <!-- <nuxt-link
      :to="localePath({name: 'index'})">
      Home
    </nuxt-link>
    &nbsp;
    <nuxt-link :to="localePath({name: 'admin'})">
      {{ $t('admin.module-name') }}
    </nuxt-link>
    &nbsp;
    <nuxt-link :to="localePath({name: 'persons'})">
      {{ $t('persons.module-name') }}
    </nuxt-link>

    <button @click="changeTheme()">{{ $t("changeTheme") }}</button>

    <button
      v-for="(size, index) in $store.state.fontSizes"
      :key="index"
      @click="setFontSize(size)">
      {{ size }}%
    </button>
    <div>
      <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
      <nuxt-link :to="switchLocalePath('es')">Español</nuxt-link>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      menuItems: [
        {
          label: 'Componentes'
          , icon: 'ico-cubes'
          , link: 'admin'
          , show: 'true'
        }
        , {
          label: "Busqueda"
          , icon: "ico-search"
          , link: "search"
          , show: "true"
        }
        , {
          label: "Inicio"
          , icon: "ico-home"
          , link: "index"
          , show: "true"
        }
        , {
          label: "Ingresar"
          , icon: "ico-sign-in"
          , link: "login"
          , show: "!vm.session.loggeado"
        }
      ]
    };
  }
  , mounted() {
    this.setFontSize(100);
  }
  , methods: {
    changeLanguage(lang) {
      this.$store.dispatch("changeLanguage", lang);
    },
    ...mapActions(["changeTheme", "changeFontSize"]),
    setFontSize(fontSize) {
      document.documentElement.style.fontSize = fontSize + "%";
      this.changeFontSize(fontSize);
    }
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
  height: inherit;
  font-family: "Lato", sans-serif;
  font-size: medium;
  color: #fff;
  text-decoration: none;
  align-items: center;
  padding: 0 10px;
}

.module > .ico {
  padding: 5px 10px 0 0;
  margin: 0;
}

</style>
