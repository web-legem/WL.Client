<template>
  <nav class="annotation-nav">
    <wl-annotation-list-group
      :annotations="inAnnotations"
      :selected="selectedId"
      icon="ico2-arrow-right"
      title="Anotaciones Entrantes"
      @show-annotation="select($event)"
    />

    <wl-annotation-list-group
      :annotations="outAnnotations"
      :selected="selectedId"
      icon="ico2-arrow-left"
      title="Anotaciones Salientes"
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
  data() {
    return {
      annotations: [
        { id: 1, direction: "IN", annotationType: { id: 1, name: "Reglamenta"}, document: "Ley 30 del 1999", description: "Fue reglamentada la norma actual"},
        { id: 2, direction: "IN", annotationType: { id: 2, name: "Deroga" }, document: "Circular 29 del 1997", description: "Fue deroagada la norma actual" },
        { id: 3, direction: "IN", annotationType: { id: 3, name: "Invailda" }, document: "Acuerdo 10 del 2007", description: "Fue Invalidada la norma actual" },
        { id: 4, direction: "OUT", annotationType: { id: 1, name: "Reglamenta" }, document: "Decreto 189 del 2017", description: "Reglamentó al documento mencionado" },
        { id: 5, direction: "OUT", annotationType: { id: 2, name: "Deroga" }, document: "Resolucion 10 del 2018", description: "Derogó al documento mencionado"  },
        { id: 6, direction: "OUT", annotationType: { id: 3, name: "Invailda" }, document: "Decreto 132 del 2012", description: "Invalidó al documento mencionado" },
      ],
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