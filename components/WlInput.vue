<template>
<div>
    <label class="texto_labels" :for="name">{{title}}</label>

    <input class="a_input" :disabled="disable == true" :type="'text'" :name="name" :id="id" :placeholder="placeholder" :maxlength="max" />

    <div v-show="error" class="msj-error">
        <label>{{errorMsg}}</label>
    </div>
</div>
<!-- v-validate="(isRequired?'required|email':'')" -->
</template>

<script>
export default {
  props: {
    title: String,
    name: String,
    placeholder: String,
    inverso: Boolean,
    id: String,
    isRequired: Boolean,
    type: String,
    max: Number,
    disable: false,
    error: false,
    errorMsg: String
  },
  computed: {}
};
</script>

<style>

</style>
