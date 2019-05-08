<template>
  <div class="document-controls">
    <div class="first-line">
      <h1 class="document-header">
        {{ documentTitle }} 
      </h1>
      <slot name="controls" />
    </div>
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
  display: flex;
  flex-direction: column;
}

.first-line {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  box-shadow: 0 8px 10px -8px grey;
  z-index: 1;
}

.document-header {
  flex-grow: 1;
  font-size: 1.4rem;
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  padding: 10px;
}

.icon {
  font-size: 1.4rem;
  background-color: var(--wl_form_bg);
  color: var(--wl_primary);
  margin: 10px;
  padding: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 50%;
  background-position: center;
  transition: background 0.8s;
  text-decoration: none;
}

.icon:hover {
  background: var(--wl_tab_shw) radial-gradient(circle, var(--wl_form_bg) 1%, var(--wl_tab_shw) 1%) center/15000%;
  color: var(--wl_primary);
}

.icon:active {
  background-color: var(--wl_tab_shw);
  color: var(--wl_primary);
  background-size: 100%;
  transition: background 0s;
}
</style>
