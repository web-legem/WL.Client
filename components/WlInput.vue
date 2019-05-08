<template>
  <div>
    <label 
      v-if="!hideLabel"
      :for="name" 
      class="texto_labels"
    >
      {{ title }}
      <span v-if="validate.required"> 
        *
      </span>
    </label>

    <div class="box_input_ico">
      <input 
        :id="id === '' ? name: id" 
        :ref="refName"
        v-validate="validate"
        :name="name" 
        :data-vv-as="title"
        :value="value"
        :disabled="disable"
        :type="type" 
        :placeholder="placeholder" 
        :maxlength="max"
        class="a_input"
        :class="{'disable':disable, 'validate_error':validateError}"
        :autocomplete="autocomplete?'on':'off'"
        @input="onInput"
        @blur="onBlur"
      >
      <div 
        v-if="!(inputIco === '')"
        class="ico_input_text"
      >
        <span :class="inputIco" />
      </div>
    </div>

    <div 
      v-show="validateError"
      class="msj-error"
    >
      <strong>{{ errors.first(name) }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    refName: { type: String, default: "" },
    value: { type: String, default: "" },
    title: { type: String, default: "" },
    name: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    inverso: { type: Boolean, default: false },
    id: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },
    type: { type: String, default: "text" },
    min: {type: [Number, String], required: false, default: 1 },
    max: { type: Number, required: false, default: Number.MAX_SAFE_INTEGER },
    disable: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" },
    inputIco: { type: String, default: "" },
    validate: { type: Object, default: function(){ return{} } },
    isSubmit: { type: Boolean, default: false },
    mode: { type: String, default: "" },
    autocomplete: { type: Boolean, default: false },    
    hideLabel: { type: Boolean, default: false },
  },
  computed:{    
    functionModes(){
      return {
        onlyNumber: value => {
          value = value.toLowerCase();
          value = value.replace(/[^0-9]+$/g, function(str){ return '' } );   
          return value 
        },
        noSpace: value => {
          value = value.toLowerCase();
          value = value.replace(/[^\S+]+$/g, function(str){ return '' } );   
          return value 
        },
        titleCase: value => {
          value = value.toLowerCase();
          value = value.replace(/(^\w|\s+\w){1}/g, function(str){ return str.toUpperCase() } );   
          return value 
        }
      }
    },
    validateError(){
      return this.errors.has(this.name) && this.isSubmit
    },
  },
  methods: {
     onInput(event) {
      let value = event.target.value;
      let modes = this.mode.split('|'); 
      if( this.mode.length != 0 ){
        modes = modes.filter(x => x =='onlyNumber' || x =='noSpace');
        let fn = (valorAnterior, modoActual) => this.functionModes[modoActual](valorAnterior)
        value = modes.reduce( fn, value)
      }
      this.$emit('input',value.trimStart());
    },

    onBlur(event) {
      let value = event.target.value.trimEnd();
      let modes = this.mode.split('|'); 
      if( this.mode.length != 0 ){
        modes.filter(x => x =='titleCase');
        let fn = (valorAnterior, modoActual) => this.functionModes[modoActual](valorAnterior)
        value = modes.reduce( fn, value)
      }
      this.$emit('input',value.trimStart());
    },
  }

};
</script>

<style lang="scss" scoped>

/* input */

/*════════════════════════════════════════════════════════════════════════════════════════════════════════════*/

/*estilos genrales input text*/

.a_input,/*input normal*/
.input_text_ico/*Input con icono como en filtros busqueda ó como el de login*/
  {
  padding: 0 10px;
  border: 1px solid var(--wl_gray);
  width: 100%;
  height: 35px;
  background: var(--wl_input_bg);
  color: var(--wl_input_text);
}

.a_input {
  display: flex;
  /* margin-bottom: 8px */
}

.input_text_ico {
  display: block;
  border-right: none
}

.input_text_ico.busqueda {
  height: 40px;
}

/*════════════════════════════════════════════════════════════════════════════════════════════════════════════*/

/*Eventos de los inputs*/

.input_text_ico:focus~button:active {
  border-color: var(--wl_light);  
}

/*------ hover para los input -------*/

.a_input:hover,
.input_text_ico:hover{
  border-color: var(--wl_primary);
}

/*---- placeholder en mozilla y chrome ----*/

.a_input::placeholder,
.input_text_ico::placeholder {
  background: transparent;
  color: var(--wl_input_text_ph);
}

.a_input.disable::placeholder,
.input_text_ico.disable::placeholder {
  background: transparent;
  color: var(--wl_input_text)
}


/* ---FIN placeholder en mozilla y chrome----*/

.a_input:-webkit-autofill, {
  outline: 0;
  box-shadow: 0 0 0px 1000px white inset;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}

/*Input con evento FOCUS .......................................*/

.a_input:focus,
.input_text_ico:focus{
  outline: 0;
  border-color: var(--wl_light);
  border-width: 2px;
  background: var(--wl_subtle);
  color:var(--wl_input_text);
}

/*Input con evento ERROR .......................................*/

:invalid {
  box-shadow: none
}

:-moz-submit-invalid {
  box-shadow: none
}

:-moz-ui-invalid {
  box-shadow: none
}

/*Input con icono .......................................*/

.ico_input_text {
  background: var(--wl_primary);
  color: var(--wl_btn_content);
  display: flex;
  justify-content: center;
  font-size: x-large;
  height: 100%;
}

.ico_input_text>span {
  height: 100%;
  display: flex;
}

.ico_input_text>span:before {
  align-self: center
}

/*════════════════════════════════════════════════════════════════════════════════════════════════════════════*/

.a_input.disable,
.input_text_ico.disable {
  pointer-events: none;
  background: var(--wl_gray_light);
  color: var(--wl_input_text_ph);
}

.a_input.disable:hover,
.input_text_ico.disable:hover{
  pointer-events: none;
  border-color:  var(--wl_gray);  
}

/***************************************************************************************************************/

/*menesajes de validacion*/

.a_input.validate_error,
.input_text_ico.validate_error{  
  border-color: var(--wl_text_error);
}

.a_input.validate_error:focus,
.input_text_ico.validate_error:focus{  
  background: var(--wl_bg_error);
  color: var(--wl_input_text);
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}

</style>
