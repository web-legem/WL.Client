<template>
  <div>
    <label 
      :for="name" 
      class="texto_labels"
    >
      {{ title }}
      <span v-if="validate.required"> 
        *
      </span>
    </label>

    <div>
      <textarea 
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
        class="a_text_area"
        cols="30"
        rows="5"
        :class="{'disable':disable, 'validate_error':validateError}"
        :autocomplete="autocomplete?'on':'off'"
        @input="onInput"
        @blur="onBlur"
      />
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
}
</script>

<style lang="scss" scoped>
.a_text_area
{
  padding: 0 10px;
  border: 1px solid var(--wl_gray);
  width: 100%;
  background: var(--wl_input_bg);
  color: var(--wl_input_text);
  font-family: 'Lato';
  resize: vertical;
}

.a_text_area:hover {
  border-color: var(--wl_primary);
}

.a_text_area::placeholder {
  background: transparent;
  color: var(--wl_input_text_ph);
}

.a_text_area.disable::placeholder {
  background: transparent;
  color: var(--wl_input_text)
}

.msj-error {
  margin-top: 8px;
}

.a_text_area:focus {
  outline: 0;
  border-color: var(--wl_light);
  border-width: 2px;
  background: var(--wl_subtle);
  color:var(--wl_input_text);
}

.a_text_area.disable {
  pointer-events: none;
  background: var(--wl_gray_light);
  color: var(--wl_input_text_ph);
}

.a_text_area.disable:hover {
  pointer-events: none;
  border-color:  var(--wl_gray);  
}

.a_text_area.validate_error {
  border-color: var(--wl_text_error);
}

.a_text_area.validate_error:focus {
  background: var(--wl_bg_error);
  color: var(--wl_input_text);
}
</style>
