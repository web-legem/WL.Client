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
  background: var(--wl_form_bg);
  color: var(--wl_primary);
}

.first-line {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--wl_gray);
  box-shadow: 0 0px 3px 1px var(--wl_gray);
  z-index: 1;
}

.document-header {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  font-size: 1.4rem;
  pointer-events: none;
}

/* botonera controls left */

.ico_cl {
  font-size: 1.4rem;
  background: var(--wl_gray_light);
  color: var(--wl_primary);
  width: 35px;
  height: 35px;
  margin: 10px 0px;
  margin-right: 10px;
  cursor: pointer;
  transition: background 0.5s;
  text-decoration: none;
}

.ico_cl:hover {  
  background: var(--wl_primary);
  color: var(--wl_btn_content);  
}

.ico_cl:active {
  transition: background 0s;
  background: var(--wl_dark);
  color: var(--wl_btn_content);  
}

/* fin botonera controls left */
</style>
