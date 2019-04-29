<template>
  <div class="document-annotations">
    <div class="first-line">
      <h1 class="document-header">
        <!-- TODO - formar el titulo del documento -->
        Document Title
      </h1>
      <nuxt-link 
        class="ico2-plus icon" 
        :to="localePath({name: 'annotations-document-id-new'})" 
      />
      <slot name="controls" />
    </div>
    <wl-annotations
      :document-id="1"
    />
  </div>
</template>

<script>
import WlAnnotations from '~/components/annotations/WlAnnotations.vue'

export default {
  components: {
    WlAnnotations,
  },
}
</script>

<style lang="scss" scoped>
.document-annotations {
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
  color: #00796b;
  padding: 10px;
}

.icon {
  font-size: 1.4rem;
  color: #00796b;
  margin: 10px;
  padding: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  margin-left: 5px;
  background-color: transparent;
  border-radius: 50%;
  background-position: center;
  transition: background 0.8s;
  text-decoration: none;
}

.icon:hover {
  background: #eee radial-gradient(circle, transparent 1%, #eee 1%) center/15000%;
}

.icon:active {
  background-color: #999;
  background-size: 100%;
  transition: background 0s;
}
</style>