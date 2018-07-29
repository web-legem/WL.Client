<template>
<nuxt-link class="tab" :to="to">
  <span class="ico">
      <slot></slot>
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
  }
}
</script>

<style>
/* .tab {
  flex: 1;
  display: flex;
  padding: 10px 25px;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  transition: ease-out .3s;
  position: relative;
  box-shadow: inset 0 -1px 0 0 #ccc, inset -1px 0 0 0 #ccc;
}

.tab:hover {
  background-color: rgba(0, 0, 0, 0.01);
  color: #2dbf85;
  transition: ease-in .3s;
}

.tab:after {
  content: '';
  background-color: #2dbf85;
  position: absolute;
  top: 0;
  left: 0;
}

.tab>.nuxt-link {
  display: flex;
  pointer-events: none;
}

.nuxt-link>ico {
  font-family: 'Lato-Bold';
  align-self: center;
  pointer-events: none;
} */

.tab {
  background-color: #fff;
  padding: 15px 25px;
  margin: 0;
  border: 2px solid #eee;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  color: #555;
  text-decoration: none;
  font-family: "Lato-Bold", Arial, Helvetica, sans-serif;
  font-size: .75rem;
  box-sizing: border-box;
}

.tab.nuxt-link-exact-active {
  color: #0f745b;
  border-top: solid #0f745b;
  border-top-width: 2px;
}
</style>
