<template>
  <div class="document-controls">
    <div class="first-line">
      <h1 class="document-header">
        {{ documentTitle }} 
      </h1>
      <nuxt-link 
        class="ico-paper-plane icon" 
        :to="localePath({name: 'search-id-notify'})" 
      />
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
  height: 100%;
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
  background: blue;
  color: #00796b;
  padding: 10px;
}

.icon {
  font-size: 1.4rem;
  background-color: transparent;
  color: #00796b;
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
  background: #eee radial-gradient(circle, transparent 1%, #eee 1%) center/15000%;
  color: red;
}

.icon:active {
  background-color: #999;
  color:blue;
  background-size: 100%;
  transition: background 0s;
}
</style>
