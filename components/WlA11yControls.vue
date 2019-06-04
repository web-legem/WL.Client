<template>
  <div 
    class="a11y-ctrls"
    @click.stop="focusFirstButton()"
    @mousedown.stop="reportMouseDown()"
    @focusout="hideA11yPanelOnBlur(true)"
  >
    <div 
      role="group" 
      aria-labelledby="contrast-label" 
      class="vertical"
    >
      <div 
        id="contrast-label" 
        class="label"
      >
        <span class="ico2-contrast" /> {{ $t('components.controls-la.label-contrast') }}
      </div>
      <div>
        <button 
          id="btn-light"
          :class="[!$store.state.highContrast ? 'selected' : '' ]"
          class="btn-a11y ico-sun-o" 
          @click.stop="changeTheme('light')"
          @focus="showA11yPanel"
        >
          <span class="hide-text">{{ $t('normalMode') }}</span>
        </button>
        <button
          :class="[$store.state.highContrast ? 'selected' : '']"
          class="btn-a11y ico-moon-o"
          @click.stop="changeTheme('dark')"
          @focus="showA11yPanel"
        >
          <span class="hide-text">{{ $t('highContrastMode') }}</span>
        </button>
      </div>
    </div>

    <div 
      role="group" 
      aria-labelledby="lang-label" 
      class="vertical"
    >
      <div 
        id="lang-label" 
        class="label"
      >
        <span class="ico2-earth" /> 
        {{ $t('components.controls-la.label-language') }}
      </div>
      <div class="link-container">
        <nuxt-link
          v-for="locale in $i18n.locales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="btn-a11y lang"
          @focus.native="showA11yPanel"
          @click.native.stop
        >
          {{ locale.name }}
        </nuxt-link>
      </div>
    </div>

    <div 
      role="group" 
      aria-labelledby="font-label" 
      class="vertical"
    >
      <div 
        id="font-label" 
        class="label"
      >
        <span class="ico2-font-size" /> 
        {{ $t('components.controls-la.label-font-size') }}
      </div>
      <div class="ico-fonts">
        <button
          v-for="(sizeAndLabel, index) in $store.state.fontSizes"
          :key="index"
          :style="{fontSize: sizeAndLabel.size / 100 / 1.2 + 'em'}"
          :class="[ sizeAndLabel.size == $store.state.fontSize.size ? 'selected': '' ]"
          class="btn-a11y ico-font"
          @focus.stop="showA11yPanel"
          @click.stop="setFontSize(sizeAndLabel.size)"
        >
          <span class="hide-text">{{ $t(sizeAndLabel.label) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'mouseDownA11yPanel'
    ])
  }
  , methods: {
    hideA11yPanelOnBlur(isLastElement) {
      if(isLastElement && !this.mouseDownA11yPanel){
        this.hideA11yPanel()
      }

      this.setMouseDownA11yPanel(false)
    }
    , reportMouseDown() {
      this.setMouseDownA11yPanel(true)
    }
    , focusFirstButton() {
      document.getElementById('btn-light').focus()
    }
    , ...mapActions([
      'changeFontSize'
      , 'changeTheme'
      , 'hideA11yPanel'
      , 'showA11yPanel'
      , 'setMouseDownA11yPanel'
    ])
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

<style lang="scss" scoped>
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
  color: white;
  border: 1px solid rgba(141, 164, 180, .57);
  padding: 0;
  width: 45px;
  height: 45px;
  font-size: large;
  margin-right: 10px;
  cursor: pointer;
  transition-duration: .4s;
}

.btn-a11y:focus{
  outline: #FF0D99 dotted 2px;
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

.label {
  margin: .5em 0;
}

.label:first-of-type {
  margin:  0 0 .5em 0;
}

.btn-a11y.lang {
  width: auto;
  padding: 10px .5em;
  height: 35px;
  font-size: .7em;
  text-decoration: none;
}

.btn-a11y.lang.nuxt-link-exact-active {
  background: var(--wl_primary);
  color: var(--wl_btn_content);
}

.btn-a11y.selected {
  background: var(--wl_primary);
  color: var(--wl_btn_content);
}

.ico-fonts {
  display: flex;
  flex-direction: row;
}

.ico-font {
  align-self: flex-end;
}

.ico-font:last-of-type {
  margin: 0;
}

.hide-text {
  height: 1px;
  left: -900em;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;
}

.vertical {
  display: flex;
  flex-direction: column;
  padding: 5px 0;
}

.link-container {
  display: flex;
  flex-direction: row;
  justify-self: center;
}

</style>