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
        :id="id" 
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
        @input="$emit('input',$event.target.value)"
      >
      <div 
        v-if="!(inputIco === '')"
        class="ico_input_text"
      >
        <span :class="inputIco" />
      </div>
    </div>

    <div 
      v-show="errors.has(name) && isSubmit"
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
  },
};
</script>
