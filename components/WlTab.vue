<template>
  <nuxt-link
    :to="to"
    class="tab"
  >
    <span :class="[icon, 'ico']" />
    <h1 class="tab-name">
      <slot />
    </h1>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: [Object, String]
      , required: true
    }
    , icon: {
      type: [String]
      , required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  padding: .8em 1.6em;
  margin: 0;
  border-top: 3px solid var(--wl_tab_color);
  border-right: 1px solid var(--wl_form_bg);
  border-left: 1px solid var(--wl_form_bg);
  border-bottom: 1px solid var(--wl_border);
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  font-family: "Lato-Bold", Arial, Helvetica, sans-serif;
  font-size: .75rem;
  justify-content: center;
  display: flex;
  flex-direction: row;
  min-width: 10em;
  max-width: 12.5em;
  box-shadow: 1px -1px 4px 1px var(--wl_tab_shw);
  background: var(--wl_tab_color);
  color: var(--wl_text);
}

.tab:first-child {
  flex-grow: 1;
}

.tab:hover {
  border-right: 1px solid var(--wl_border);
  border-left: 1px solid var(--wl_border);
  border-top: 3px solid var(--wl_form_bg);
  background: var(--wl_form_bg);  
  color: var(--wl_tab_text);
}

.tab.nuxt-link-active {
  border-top: 3px solid var(--wl_tab_text);
  border-bottom: 1px solid transparent;
  box-shadow: 0 0px 7px 2px var(--wl_tab_shw);
  background: var(--wl_form_bg);
  color: var(--wl_tab_text);
  z-index: 1;
}

.ico {
  font-size: 1.2rem;
  align-self: center;
  margin: auto 8px;
}

.tab-name {
  align-self: center;
  text-align: start;
  font-size: .75rem;
}
</style>
