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

<style lang="scss" scoped>
.tab {
  background-color: #fff;
  padding: .8em 1.6em;
  margin: 0;
  border-top: 3px solid white;
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
  display: flex;
  flex-direction: row;
  min-width: 10em;
  max-width: 12.5em;
}

.tab:first-child {
  flex-grow: 1;
}

.tab:hover {
  background-color: rgba(0, 0, 0, .01);
  color: #2dbf85;
  border-top: 3px solid rgba(0, 0, 0, .01);
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  transition: ease-out .3s;
}

.tab.nuxt-link-active {
  color: #2dbf85;
  border-top: 3px solid #2dbf85;
  border-bottom: 1px solid #fff;
  /* border-left: 1px solid #ccc;
  border-right: 1px solid #ccc; */
}

.ico {
  font-size: 1.2rem;
  align-self: center;
  margin: auto 8px;

}

.tab-name {
  align-self: center;
  text-align: start;
}
</style>
