<template>
  <div class="module-layout">
    <div class="module-layout-container">
      <nav class="tabs-container">
        <a 
          class="skip" 
          href="#module-content" 
          tabindex="0"
        >
          {{ $t('go-to-module') }}
        </a>
        <slot name="tabs" />
      </nav>

      <div
        id="module-content"
        class="content" 
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.module-layout {
  height: 100%;
  padding-top: calc(25px + 4.5vh);
}

.module-layout-container {
  border: 1px solid transparent;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tabs-container {
  display: flex;
  min-height: 45px;
  overflow-x: auto;
  background-color: var(--wl_tab_bg);
  color: var(--wl_text);  
  box-shadow: inset 0 -3px 6px -3px var(--wl_gray);
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: var(--wl_form_bg);
  color: var(--wl_text);
  height: 100%;
}

.skip {
  display: none;
}
</style>