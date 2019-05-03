<template>
  <div class="document-controls">
    <h1 class="document-title">
      {{ documentTitle }} 
    </h1>
    <span class="ico ico-upload" />
  </div>
</template>

<script>
export default {
  props: {
    documentTitle: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.document-controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid var(--wl_gray);
}

.document-title {
  font-size: 1.4rem;
  background: transparent;
  color: var(--wl_primary);
}
</style>
