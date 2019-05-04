<template>
  <nav class="annotation-nav">
    <wl-annotation-list-group
      v-if="inAnnotations.length > 0"
      :annotations="inAnnotations"
      :selected="selectedId"
      icon="ico2-arrow-right"
      :title="$t('search.annotation-list.title-annot-enter') "
      @show-annotation="select($event)"
    />
    <wl-annotation-list-group
      v-if="outAnnotations.length > 0"
      :annotations="outAnnotations"
      :selected="selectedId"
      icon="ico2-arrow-left"
      :title="$t('search.annotation-list.title-annot-go-out') "
      @show-annotation="select($event)"
    />
  </nav>
</template>

<script>
import WlAnnotationListGroup from '~/components/search/WlAnnotationListGroup.vue'

export default {
  components: {
    WlAnnotationListGroup,
  },
  props: {
    documentId: {
      type: Number,
      required: true,
    },
    annotations: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      selectedId: 0,
      showInAnnotations: true,
      showOutAnnotations: false
    }
  },
  computed: {
    inAnnotations() {
      return this.annotations.filter(x => x.direction == "IN")
    },
    outAnnotations() {
      return this.annotations.filter(x => x.direction == "OUT")
    },
    iconInAnnotations() {
      return this.selectGroupIcon(this.showInAnnotations)
    },
    iconOutAnnotations() {
      return this.selectGroupIcon(this.showOutAnnotations)
    }
  },
  methods: {
    select(selectedId) {
      console.log( 'selected', selectedId)
      if(this.selectedId != selectedId)
        this.selectedId = selectedId
      else
        this.selectedId = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.annotation-nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>