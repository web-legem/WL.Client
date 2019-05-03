<template>
  <li class="list-item-container">
    <nuxt-link
      :to="localePath(params)"
      class="list-item"
      lang="es-Co"
      :title="$t('show-record')"
    >
      <div>
        <slot />
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true,
    },
    activeRoute: {
      type: String,
      required: true,
    },
    itemId: {
      type: Number,
      required: true
    }
  },
  computed: {
    params() {
      return this.$route.params.id == this.itemId
        ? { name: this.activeRoute }
        : { name: this.route, params: { id: this.itemId }}
    },
  }
}
</script>

<style lang="scss" scoped>
.list-item-container {
  display: block;
  width: 100%;
}

.list-item {
  background-color: var(--wl_form_bg);
  color: var(--wl_input_text);  
  border-bottom: 1px solid var(--wl_border);
  min-height: 2.5em;
  margin: auto 0;
  text-decoration: none;
  display: flex;
  position: relative;
}

.list-item:hover,
.list-item:active {
  background: var(--wl_gray_light);
  color: var(--wl_input_text);
}

.list-item > div {
  align-self: center;
  padding: .5em 1em;
}

.list-item > div::after {
  content: '✓';
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  right: 50%;
  opacity: 0;
  width: 2em;
  transition: linear .3s;
  background-color: var(--wl_light);
  color: var(--wl_btn_content);
  position: absolute;
  top: 0;
  bottom: 0;
  line-height: 2.4em;
}

.list-item.list-item.nuxt-link-active {
  background-color: var(--wl_subtle);
  color: var(--wl_input_text);
}

.list-item.nuxt-link-active > div::after {
  opacity: 1;
  right: 0;
}
</style>