<template>
  <div class="annotations">
    <wl-suggestion-group
      v-if="suggestions.length > 0"
      :annotations="suggestions"
      icon="ico-lightbulb-o"
      title="Anotaciones sugeridas"
      @show-annotation="select($event)"
    />
    <wl-annotation-group
      v-if="inAnnotations.length > 0"
      :annotations="inAnnotations"
      :selected="selectedId"
      icon="ico2-arrow-right"
      :title="$t('annotations.in-annotations')"
      @show-annotation="select($event)"
    />
    <wl-annotation-group
      v-if="outAnnotations.length > 0"
      :annotations="outAnnotations"
      :selected="selectedId"
      icon="ico2-arrow-left"
      :title="$t('annotations.out-annotations')"
      @show-annotation="select($event)"
    />
  </div>
</template>

<script>
import WlAnnotationGroup from '~/components/annotations/WlAnnotationGroup.vue'
import WlSuggestionGroup from '~/components/annotations/WlSuggestionGroup.vue'

export default {
  components: {
    WlAnnotationGroup,
    WlSuggestionGroup,
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
      suggestions: [
        { id: 1, annotationType: { id: 1, name: "Reglamenta"}, documentType: { id: 1, name: "Ley" } },
        { id: 2, annotationType: { id: 2, name: "Deroga"}, number: '015' },
        { id: 3, annotationType: { id: 3, name: "Aclara"}, documentType: { id: 2, name: "Ley" }, publicationDate: '11 de Mayo de 2014' },
      ],
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
.annotations {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>