<template>
  <div 
    class="a11y-ctrls"
    @mouseleave="hideA11yPanel"
    @blur="hideA11yPanel"
  >
    <label><span class="ico2-contrast" /> Contraste</label>
    <div>
      <button 
        :class="[!$store.state.highContrast ? 'selected' : '' ]"
        class="btn-a11y ico-sun-o" 
        @click="changeTheme('light')"
      />
      <button
        :class="[$store.state.highContrast ? 'selected' : '']"
        class="btn-a11y ico-moon-o"
        @click="changeTheme('dark')"
      />
    </div>
    <label><span class="ico2-earth" /> Idioma</label>
    <div>
      <nuxt-link
        v-for="locale in $i18n.locales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="btn-a11y lang"
      >
        {{ locale.name }}
      </nuxt-link>
    </div>
    <label><span class="ico2-font-size" /> Tamaño Fuente</label>
    <div>
      <button
        v-for="(size, index) in $store.state.fontSizes"
        :key="index"
        :style="{fontSize: size / 100 / 1.2 + 'em'}"
        :class="[ size == $store.state.fontSize ? 'selected': '' ]"
        class="btn-a11y ico-font"
        @click="setFontSize(size)"
      />
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  methods: {
    ...mapActions([
      'changeFontSize'
      , 'changeTheme'
      , 'hideA11yPanel'
    ])
    , test() {
      console.log('test')
    }
    , mounted() {
      this.setFontSize(100)
    }
    , setFontSize(fontSize) {
      document.documentElement.style.fontSize = fontSize + "%"
      this.changeFontSize(fontSize)
    }
  }
}
</script>

<style>
.a11y-ctrls {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: var(--header-height);
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 1em;
  overflow: hidden;
}

.btn-a11y {
  background: rgba(68, 81, 107, .24);
  border: 1px solid rgba(141, 164, 180, .57);
  padding: 0;
  width: 45px;
  height: 45px;
  color: white;
  font-size: large;
  margin-right: 10px;
  cursor: pointer;
  transition-duration: .4s;
}

.btn-ally:hover {
  cursor: pointer;
}

@keyframes bajando {
  0% {opacity: 0; max-height: 0;}
  100% {opacity: 1; max-height: 250px; }
}

@keyframes subiendo {
  0% { opacity: 1; max-height: 250px; }
  100% {opacity: 0; max-height: 0;}
}

.slide-fade-vertical-enter-active {
  animation: .5s bajando;
}
.slide-fade-vertical-leave-active {
  animation: .5s subiendo;
}

.a11y-ctrls > div {
  display: flex;
}

.a11y-ctrls > label {
  margin: .5em 0;
}

.a11y-ctrls > label:first-of-type {
  margin:  0 0 .5em 0;
}

.btn-a11y.lang {
  width: auto;
  padding: 0 .5em;
  height: 35px;
  font-size: .7em;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btn-a11y.lang.nuxt-link-exact-active {
  background: #23948a;
}

.btn-a11y.selected {
  background: #23948a;
}

.ico-font:last-of-type {
  margin: 0;
}
</style>
