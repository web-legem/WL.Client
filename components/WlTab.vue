<template>
  <nuxt-link
    :to="to"
    class="tab">
    <span :class="[icon, 'ico']" />
    <span class="tab-name">
      <slot />
    </span>
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

<style>
.tab {
  background-color: #fff;
  padding: 15px 25px;
  margin: 0;
  border-top: 2px solid #eee;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  color: #555;
  text-decoration: none;
  font-family: "Lato-Bold", Arial, Helvetica, sans-serif;
  font-size: .75rem;
  justify-content: center;
  transition: ease-out .3s;
}

.tab:hover {
  background-color: rgba(0, 0, 0, .01);
  box-shadow: inset 0 1px 0 0 #ccc, inset -1px 0 0 0 #ccc;
  color: #2dbf85;
}

.tab.nuxt-link-exact-active {
  color: #2dbf85;
  border-top: solid #2dbf85;
  border-top-width: 2px;
  border-bottom: 1px solid #fff;
}

.ico {
  font-size: 1rem;
}
</style>
