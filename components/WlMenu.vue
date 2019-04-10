<template>
  <div
    :class="{small: $mq == 'sm'}"
    class="menu"
  >
    <button
      v-if="$mq == 'sm'"
      class="btn-menu"
      mq="md-"
      @click="toggleMenuPanel"
      @focusout="hideMenuPanel"
    >
      <span
        :class="[ showMenu ? 'ico2-cross' : 'ico-bars' ]"
        class="ico"
      />
    </button>

    <transition
      name="slide-border"
      appear
    >
      <wl-cinta-logo v-if="showBorder && showSsr" />
    </transition>

    <nav
      v-if="$mq !== 'sm' || showMenu"
      :class="{ small: $mq == 'sm' }"
      class="nav"
      @focusout="hideMenuPanel"
    >
      <ul
        :class="{small: $mq == 'sm'}"
        class="modules"
      >
        <li
          ref="submodulesContainer"
          :class="{small: $mq == 'sm'}"
          @focusout="checkIfFocusLost($event)"
        >
          <button
            :class="{small: $mq == 'sm'}"
            class="module"
            @click.stop="toggleSubModulesPanel"
            @keydown.enter="toggleSubModulesPanel"
            @keypress.enter.stop="toggleSubModulesPanel"
          >
            <div>
              <span
                class="ico ico-cubes"
              />
              {{ $t('components.menu.butt-module') }} 
            </div>
          </button>
          <ul
            v-show="showSubModules"
            :class="{small: $mq == 'sm'}"
            class="sub-modules"
          >
            <li
              v-for="(module, index) in modules"
              :key="index"
            >
              <nuxt-link
                :to="localePath({ name: module.link })"
                class="sub-module"
                @click.native="hideSubModulesPanel()"
              >
                <div> 
                  <span
                    :class="[ module.icon ]"
                    class="ico"
                  />
                  {{ module.label }}
                </div>
              </nuxt-link>
            </li>
          </ul>
        </li>
        <li 
          v-for="(menuItem, index) in menuItems"
          :key="index"
        >
          <nuxt-link
            v-show="menuItem.show"
            :to="localePath({ name: menuItem.link })"
            class="module" 
            @blur.native="hideMenuPanel"
            @focus.native="showMenuPanel"
            @click.native="hideMenuPanel"            
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
        <!-- Usuario--------------------------------------- -->        
        <no-ssr>
          <li
            v-if="loogedIn != undefined && loogedIn == true"          
            ref="userContainer"
            :class="{small: $mq == 'sm'}"
            @focusout="checkIfFocusLostUser($event)"
          >
            <button
              :class="{small: $mq == 'sm'}"
              class="module"
              @click.stop="toggleSubUserPanel"
              @keydown.enter="toggleSubUserPanel"
              @keypress.enter.stop="toggleSubUserPanel"
            >
              <div>
                <span
                  class="ico ico-user"
                />
                Usuarios
                <div class="avatar-usu">                  
                  <img 
                    alt="" 
                    :src="credential.photo"
                  >
                </div>
              </div>
            </button>
            <ul
              v-show="showSubUser"
              :class="{small: $mq == 'sm'}"
              class="sub-modules"
            >
              <li>
                <nuxt-link
                  :to="localePath({name:''})"
                  class="sub-module"                
                  @click.native="signOut()"
                >
                  <div>
                    <span
                      :class="'ico-sign-out'"
                      class="ico"
                    />
                    Cerrar sesion
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </li>
        </no-ssr>
        <!-- fin Usuario----------------------------------- -->
      </ul>
    </nav>
    <button
      class="accessibility"
      @click.stop="toggleA11yPanel"
      @keydown.13.native="toggleA11yPanel"
      @blur="hideA11yPanelOnBlur(true)"
    >
      <span class="ico ico-wheelchair" />
    </button> 
    <transition name="slide-fade-vertical">
      <wl-a11y-controls
        v-show="$store.state.showA11yPanel"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import WlCintaLogo from '~/components/home/WlCintaLogo.vue'
import WlA11yControls from '~/components/WlA11yControls.vue'

export default {
  components: {
    WlCintaLogo,
    WlA11yControls,
  },
  data() {
    return {
      showSubModules: false,
      showSubUser: false,      
      showMenu: false,

      modules: [
        {
          label: this.$t('components.menu.label-admin'),
          icon: 'ico-tasks',
          link: 'admin',
        },
        {
          label:  this.$t('components.menu.label-doc-man'),
          icon: 'ico-stack-overflow',
          link: 'doc-management',
        },
        {
          label:this.$t('components.menu.label-annot'),
          icon: 'ico-files-o',
          link: 'annotations',
        },
        {
          label: this.$t('components.menu.label-user'),
          icon: 'ico-users',
          link: 'persons',
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'mouseDownA11yPanel',
      'showBorder'
    ]),
    ...mapGetters("login/login", {
      loogedIn: "loogedIn",
      credential: "credential",      
    }), 
    menuItems(){
      return [
        {
          label:this.$t('components.menu.label-serch'),
          icon: 'ico-search',
          link: 'search',
          show: 'true',
        },
        {
          label: this.$t('components.menu.label-home'),
          icon: 'ico-home',
          link: 'index',
          show: 'true',
        },
        {
          label: this.$t('components.menu.label-login'),
          icon: 'ico-sign-in',
          link: 'login',
          show: this.loogedIn != undefined && this.loogedIn == false,
        }
      ]
    },
    showSsr() {
      return this.$options.filters.mq(this.$mq, { xs: false, mid: true })
    }
  },
  watch: {
    '$route'() {
      this.hideSubModulesPanel()
      this.hideSubUserPanel()
      this.hideA11yPanel()
      this.hideMenuPanel()
    },
    '$i18n.locale'(){
      this.$validator.locale = this.$i18n.locale;
    }
  },
  beforeMount(){
    this.$store.commit("login/login/initCredential");
  },
  mounted() {
    this.$validator.locale = this.$i18n.locale;
  },
  methods: {
    hideA11yPanelOnBlur(isLastElement) {
      if(isLastElement && !this.mouseDownA11yPanel){
        this.hideA11yPanel()
      }
      this.setMouseDownA11yPanel(false)
    },
    checkIfFocusLost(event) {
      if(!this.$refs.submodulesContainer.contains(event.relatedTarget)) {        
        console.log("focus m lost");
        this.hideSubModulesPanel()
      }       
    },
    checkIfFocusLostUser(event){
      if(!this.$refs.userContainer.contains(event.relatedTarget)) {
        console.log("focus lost");
        this.hideSubUserPanel()
      }
    },
    
    // menu modules-----------
    showSubModulesPanel($event) {this.showSubModules = true},
    hideSubModulesPanel() {this.showSubModules = false},
    toggleSubModulesPanel() {this.showSubModules = !this.showSubModules},
    // menu Users-----------
    showSubUserPanel($event) {this.showSubUser = true},
    hideSubUserPanel() {this.showSubUser = false},
    toggleSubUserPanel() {this.showSubUser = !this.showSubUser},
    signOut(){this.logout(this.credential.id)},
    // ---------------------
    
    showMenuPanel () {
      this.showMenu = true
    },
    hideMenuPanel() {
      this.showMenu = false
    }, 
    toggleMenuPanel(){
      this.showMenu = !this.showMenu
    },
    ...mapActions([
      'toggleA11yPanel',
      'hideA11yPanel',
      'setMouseDownA11yPanel',
      'displayBorder',
      'hideBorder',
    ]),
    ...mapActions("login/login", [
      "logout",
    ]),
  }
}
</script>

<style lang="scss" scoped>
.menu {
  --header-height: calc(25px + 4.5vh);
  position: fixed;
  width: 100%;
  height: var(--header-height);
  min-height: 45px;
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 1px solid #6c767d;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.menu.small {
  background: #11171e;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
  flex-grow: 1;
}

.nav.small {
  display: flex;
  position: fixed;
  top: var(--header-height);
  flex-direction: column;
  background: #11171e;
}

ul.modules {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin: 0;
}

ul.modules.small {
  flex-direction: column;
  align-content: flex-start;
  background: rgba(0, 0, 0, 0.9);
  width: 100vw;
}

ul.modules > li.small {
  display: flex;
  flex-direction: column;
  min-height: var(--header-height);
  height: 100%;
}

ul.modules.small button {
  width: 100vw;
  height: 100%;
}

ul.modules > li {
  padding: 0;
  height: var(--header-height);
}

ul.modules.small > li {
  align-content: flex-start;
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

button.module {
  background: inherit;
}

button.module.small {
  min-height: var(--header-height);
  height: 100%;
}

.sub-modules {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 0;
  position: absolute;
}

.sub-modules.small {
  position: unset;
  display: flex;
  position: inherit;
}

.sub-module {
  display: flex;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  cursor: pointer;
  height: 40px;
  text-decoration: none;
  align-items: center;
  padding: 10px;
}

.sub-module .ico {
  padding: 5px 10px 0 0;
  margin: 0;
}

button.accessibility {
  min-width: var(--header-height);
  min-height: var(--header-height);
  background: rgba(0, 0, 0, 0);
  border: none;
  padding: 0;
  align-self: flex-end;
}

button.accessibility:focus,
button.accessibility:hover {
  background: #23948a;
}

button .ico-wheelchair {
  width: var(--header-height);
  height: var(--header-height);
  background: rgba(0, 0, 0, 0);
  color: white;
  font-size: 16px;
}

.btn-menu {
  min-width: var(--header-height);
  background: rgba(0, 0, 0, 0);
  border: none;
  padding: 0;
  font-size: 1.5rem;
  color: white;
}

.avatar-usu{
  margin-left: 10px;  
  --header-height: calc(25px + 4.5vh);
  height: var(--header-height);
  width: auto;  
  background: #555;
}

.avatar-usu  > img{  
  width: 100%;
  height:100%;
}

@keyframes bajando {
  0% {margin-top: -100px;}
  100% {margin-top: 0px; }
}

@keyframes subiendo {
  0% { margin-top: 0px; }
  100% {margin-top: -120px;}
}

.slide-border-enter-active {
  animation: 1s bajando;
}

.slide-border-leave-active {
  animation: 1s subiendo;
}
</style>