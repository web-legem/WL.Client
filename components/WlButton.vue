<template>
  <button 
    :disabled="disable" 
    :class="[btnStyle, btnInverso, btnDisable, btnRemove]" 
    :title="title"
    :aria-label="onlyIcon ? title : '' "
    @click="$emit('click', $event)"
  >
    <span :class="[ico,size,icoInverso]" />
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    ico: { type: String, default: "" },
    onlyIcon: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    inverso: { type: Boolean, default: false },
    remove: { type: Boolean, default: false }
  },
  computed: {
    btnInverso() {
      return this.inverso ? "inverso" : "";
    },
    icoInverso() {
      return this.inverso ? "derecha" : "";
    },
    btnStyle() {
      return this.onlyIcon ? "btn-only-ico" : "btn-normal";
    },
    btnDisable() {
      return  this.disable ? "disable": "";
    },
    btnRemove() {
      return  this.remove ? "remove": "";
    },    
    size() {
      return this.onlyIcon ? "" : "tamano_botones_1";
    },
  }
};
</script>

<style lang="scss" scoped>
.btn-normal {
  position: relative;
  background-color: var(--wl_primary);
  font-family: "Century Gothic";
  font-size: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  color: var(--wl_btn_content);
  border: 0;
  margin: auto 0;
  padding: 8px 5px 8px 40px;
  min-width: 8rem;
  cursor: pointer;
}

.btn-normal > span {
  display:inline-block;
  vertical-align:middle;
  height: 100%;
}

.btn-normal > span:before {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: large;
}

.btn-normal::-moz-focus-inner {
  margin-top: -2px;
  margin-bottom: -2px;
}

.btn-normal.inverso {
  padding: 7px 0 7px 10px;
  text-align: left;
}

.btn-normal:disabled {
  pointer-events: none;
  background: var(--wl_btn_disable);
  color: var(--wl_btn_content);
}

.btn-normal.azul {
  background: var(--wl_btn_blue);
  color: var(--wl_btn_content);
}

.tamano_botones_1 {
  background: var(--wl_btn_bg_ico);
  color: var(--wl_btn_content);
  height: 100%;
  width: 35px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 140%;
  line-height: 2.3;
}

.tamano_botones_1.derecha {
  left: unset;
  right: 0;
  text-align: center;
}

.btn_sin_ico {
  position: relative;
  font-family: "Century Gothic";
  font-size: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  background: var(--wl_primary);
  color: var(--wl_btn_content);
  border: 0;
  margin: auto 0;
  padding: 8px 5px 8px 8px;
  min-width: 8rem;
  cursor: pointer;
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
}

.btn_sin_ico::-moz-focus-inner {
  margin-top: -2px;
  margin-bottom: -2px;
}

.btn_sin_ico.inverso {
  padding: 7px 0 7px 10px;
  text-align: left;
}

.btn-only-ico {
  position: relative;
  border: 0;
  background: var(--wl_primary);
  color: var(--wl_btn_content);
  cursor: pointer;
  min-height: 35px;
  min-width: 35px;
}

.btn-only-ico.disable {
  pointer-events: none;
  background: var(--wl_btn_disable);
  color: var(--wl_btn_content);
}

.btn-only-ico > span {
  display:inline-block;
  vertical-align:middle;
  height: 100%;
}

.btn-only-ico > span:before {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  font-size: large;
}

.btn-normal:before,
.btn_sin_ico:before,
.btn-only-ico:before,
{
  content:'';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  height: 100%;
}

.btn-normal:focus,
.btn_sin_ico:focus,
.btn-only-ico:focus,
{
  outline: #FF0D99 dotted 2px;
}

.btn-normal:hover:before,
.btn_sin_ico:hover:before,
.btn-only-ico:hover:before {
  background:var(--wl_primary_hover);
  color: var(--wl_btn_content);
  width: 100%;
}

.btn-normal:active:before,
.btn_sin_ico:active:before,
.btn-only-ico:active:before {
  background:var(--wl_primary_active);
  color: var(--wl_btn_content);
  width: 100%;
}

.btn-only-ico.remove{
  background: var(--wl_text_error);
  color:white;
}

</style>
