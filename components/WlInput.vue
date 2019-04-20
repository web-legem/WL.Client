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
        :class="{'disable':disable}"
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
      <label>{{ errors.first(name) }}</label>
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
    max: { type: Number, required: true },
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

};
</script>
