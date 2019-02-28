<template>
  <div>
    <label 
      :for="name" 
      class="texto_labels"
    >
      {{ title }}
    </label>

    <div class="box_input_ico">
      <input 
        :id="id" 
        :name="name" 
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
      v-show="error" 
      class="msj-error"
    >
      <label>{{ errorMsg }}</label>
    </div>
  </div>
<!-- v-validate="(isRequired?'required|email':'')" -->
</template>

<script>
export default {
  props: {
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
  },
  computed: {}
};
</script>
