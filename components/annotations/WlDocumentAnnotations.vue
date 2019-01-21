<template>
  <div class="document-annotations">
    <div class="first-line">
      <h1 class="document-header">
        Document Title
      </h1>
      <span class="ico2-eye icon" />
      <span class="ico2-plus icon" />
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
  padding: 10px;
  cursor: pointer;
  margin-left: 5px;
}
</style>