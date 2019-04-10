<template>
  <button 
    :disabled="disable" 
    :class="[btnStyle, btnInverso, btnDisable]" 
    :title="title"
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
    size() {
      return this.onlyIcon ? "" : "tamano_botones_1";
    },
  }
};
</script>

<style lang="scss" scoped>
.btn-normal {
  position: relative;
  background-color:var(--btn);
  font-family: "Century Gothic";
  font-size: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  color: var(--btn-c);
  border: 0;
  margin: auto 0;
  padding: 8px 5px 8px 40px;
  min-width: 110px;
  cursor: pointer;
}

.btn-normal::-moz-focus-inner {
  margin-top: -2px;
  margin-bottom: -2px;
}

.btn-normal.inverso {
  padding: 7px 0 7px 10px;
  text-align: left;
}

.btn-normal:hover {
  background-color: var(--btn-con);
}

.btn-normal:active {
  background-color: var(--btn-con-a);
}

.btn-normal:disabled {
  pointer-events: none;
  background: rgba(0, 0, 0, 0.4); /*falta variable  en colors*/
}

.btn-normal.azul {
  background-color: var(--btn-con-i);
}

.btn-normal.azul:hover {
  background-color: var(--btn-con-h);
}

.btn-normal.azul:active {
  background-color:var(--btn-con-ac);
}

.tamano_botones_1 {
  background: var(--botones-t);
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
  background-color:var(--btn-sin);
  font-family: "Century Gothic";
  font-size: 0.7em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
  color: var(--btn-sin-i);
  border: 0;
  margin: auto 0;
  padding: 8px 5px 8px 8px;
  min-width: 110px;
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

.btn_sin_ico:hover,
.btn-only-ico:hover {
  background-color: var(--btn-sin-h);
}

.btn_sin_ico:active,
.btn-only-ico:active {
  -webkit-transition: all 0.05s;
  -o-transition: all 0.05s;
  transition: all 0.05s;
  background-color: var(--bnt-sin-a);
}

.btn-only-ico {
  border: 0;
  background: var(--btn-in);
  cursor: pointer;
  min-height: 35px;
  min-width: 35px;
}

.btn-only-ico.disable {
  pointer-events: none;
  background: #555; /*falta variable en colors*/
}

.btn-only-ico.disable > span:before {
  color: #ebebeb;/*falta variable en colors*/
}

.btn-only-ico > span {
  display: flex;
}

.btn-only-ico > span:before {
  font-size: 20px;
  color: white;/*falta variable en colors*/
  width: 100%;
}

button.danger {
  background-color: tomato;
}

button.danger:hover {
  background: pink;
}
</style>
