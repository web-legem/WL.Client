<template>
  <div class="document-controls">
    <div class="first-line">
      <button
        class="go_back" 
        :title="$t('search.go-back')"
        @click="$router.back()"      
      >
        <span class=" ico-arrow-left" />
      </button>
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
  }
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

.controls {
  display: flex;
  flex-direction: row;
  align-content: center;
}

.go_back{
  font-size: 1.3em;
  background: var(--wl_gray_light);
  color: var(--wl_primary);
  height: 100%;
  width: 35px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}

.go_back:hover{
  background: var(--wl_primary);
  color: var(--wl_btn_content);
}

/* fin botonera controls left */
</style>
