<template>
  <h1 class="title">
    {{ text }}
  </h1>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  text-decoration: underline;
  font-size: 2rem;
  margin-bottom: 8px;
  width: 100%;
}
</style>
