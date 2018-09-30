<template>
  <li class="list-item-container">
    <nuxt-link
      :to="to"
      class="list-item">
      <div>
        <slot />
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    to: {
      type: [Object, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item-container {
  display: block;
}

.list-item {
  background-color: white;
  color: #555;
  border-bottom: 1px solid #ccc;
  min-height: 2.5em;
  margin: auto 0;
  text-decoration: none;
  display: flex;
  position: relative;
}

.list-item:hover
, .list-item:active {
  background-color: #ccc;
}

.list-item > div {
  align-self: center;
  padding: .5em 1em;
}

.list-item > div::after {
  content: '✓';
  display: block;
  font-size: 1.2em;
  color: #fff;
  right: 50%;
  opacity: 0;
  width: 2em;
  transition: linear .3s;
  background-color: #2dbf85;
  position: absolute;
  text-align: center;
  top: 0;
  bottom: 0;
  line-height: 2.4em;
}

.list-item.list-item.nuxt-link-active {
  background-color: #daefdf;
}

.list-item.nuxt-link-active > div::after {
  opacity: 1;
  right: 0;
}
</style>