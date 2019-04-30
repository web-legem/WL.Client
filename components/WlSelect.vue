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
    <div class="a_select">
      <select 
        :id="id === '' ? name: id"         
        v-validate="validate"
        :name="name" 
        :data-vv-as="title"
        :value="value"
        :disabled="disable == true"
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
    emptyMsg: { type: String, default: "Seleccione una Opción" },
    list: { type: Array, required: true },
    valuePropName: { type: String,required: true },
    labelPropName: { type: String, required: true },
    value: { type: String, default: ""  },
    validate: { type: Object, default: function(){ return{} } },
    isSubmit: { type: Boolean, default: false },
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
  background: var(--wl_input_bg);
  width: 100%;
  height: 35px;
  overflow: hidden;
  border: 1px solid var(--wl_gray);
  padding: 0 10px;
  color: var(--wl_input_text);
}

.a_select:before {
  font-family: "iconos-legem";
  font-size: 25px;
  font-weight: 900;
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
  border-width: 2px;
}

.a_select select option {
  padding: 0 10px;
  color:var(--wl_text);
  background: var(--wl_form_bg);
}

.msj-error {
  margin-top: 8px;
}
</style>
