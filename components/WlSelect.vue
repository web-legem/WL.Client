<template>
  <div>
    <label 
      v-if="!hideLabel"
      :for="id === '' ? name: id" 
      class="texto_labels"
    >
      {{ title }}
      <span v-if="validate.required"> 
        *
      </span>
    </label>
    <div class="a_select">
      <select 
        :id="id === '' ? name: id"         
        v-validate="validate"
        :name="name" 
        :data-vv-as="title"
        :value="value"
        :disabled="disable == true"
        :title="title"
        @input="$emit('input',$event.target.value)"
      >
        <option 
          disabled 
          value=""
        >
          {{ emptyMsg }} 
        </option>
        <option 
          v-for="item in list"
          :key="item.id"
          :value="item[valuePropName]"
          lang="es-CO"
        >
          {{ item[labelPropName] }}
        </option>      
      </select> 
    </div>

    <div 
      v-show="errors.has(name) && isSubmit"
      class="msj-error"
    >
      <strong>{{ errors.first(name) }}</strong>
    </div>      
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    name: { type: String, default: "" },
    id: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" },
    emptyMsg: { type: String, default: "Seleccione un Elemento" },
    list: { type: Array, required: true },
    valuePropName: { type: String,required: true },
    labelPropName: { type: String, required: true },
    value: { type: String, default: ""  },
    validate: { type: Object, default: function(){ return{} } },
    isSubmit: { type: Boolean, default: false },
    hideLabel: { type: Boolean, default: false },
  },
  data() {
    return {     
    };
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.a_select {
  display: flex;
  border-right: none;
  position: relative;
  margin-bottom: 2px;
  overflow: hidden;
}

.a_select select:disabled {
  pointer-events: none;
  background: var(--wl_gray_light);
  color: var(--wl_input_text_ph);
}

.a_select input:disabled {
  pointer-events: none;
}

.a_select select,
.a_select input {
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  height: 35px;
  overflow: hidden;
  border: 1px solid var(--wl_gray);
  padding: 0 10px;
  background: var(--wl_input_bg);
  color: var(--wl_input_text);
}

.a_select:before {
  font-family: "iconos-legem";
  font-size: x-large;
  font-weight: 900;
  background: transparent;
  color: var(--wl_gray);
  content: "\71";
  position: absolute;
  top: 4px;
  right: 0;
  width: 30px;
  height: 35px;
  pointer-events: none;
}

.a_select select:hover {
  border: 1px solid var(--wl_primary);
}

.a_select > select:focus {
  outline: 0;
  border-color: var(--wl_light);
  background: var(--wl_subtle);
  color: var(--wl_input_text);  
  border-width: 2px;
}

.a_select select option {
  padding: 0 10px;
  background: var(--wl_form_bg);
  color:var(--wl_text);
}

.msj-error {
  margin-top: 8px;
}

.a_select select:-moz-focusring {
    background: var(--wl_subtle);
    color: transparent;
    text-shadow: 0 0 0 var(--wl_text);
}
.a_select select option:not(:checked) {
  background:  var(--wl_form_bg);
  color: var(--wl_text); /* prevent <option>s from becoming transparent as well */
}

</style>
