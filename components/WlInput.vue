<template>
  <div>
    <label 
      :for="name" 
      class="texto_labels" >{{ title }}
    </label>

    <input 
      :disabled="disable == true"             
      :type="'text'" 
      :name="name" 
      :id="id" 
      :placeholder="placeholder" 
      :maxlength="max"
      class="a_input">

    <div 
      v-show="error" 
      class="msj-error">
      <label>{{ errorMsg }}</label>
    </div>
  </div>
<!-- v-validate="(isRequired?'required|email':'')" -->
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    name: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    inverso: { type: Boolean, default: false },
    id: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },
    type: { type: String, default: "" },
    max: { type: Number, required: true },
    disable: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" }
  },
  computed: {}
};
</script>