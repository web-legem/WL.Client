<template>
  <nav class="annotation-nav">
    <h2>
      <button @click="toggleInAnnotations">
        Anotaciones Entrantes
      </button>
    </h2>
    <ul
      v-if="showInAnnotations"
      class="document-info_ul"
    >
      <li
        v-for="annotation in inAnnotations"
        :key="annotation.id"
        class="document-info_li"
      >
        <wl-annotation-info
          :annotation="annotation"
          :selected="selectedId"
          @show-annotation="select($event)"
        />
      </li>
    </ul>
    <h2>
      <button @click="toggleOutAnnotations">
        Anotaciones Salientes
      </button>
    </h2>
    <ul
      v-if="showOutAnnotations"
      class="document-info_ul"
    >
      <li
        v-for="annotation in outAnnotations"
        :key="annotation.id"
        class="document-info_li"
      >
        <wl-annotation-info
          :annotation="annotation"
          :selected="selectedId"
          @show-annotation="select($event)"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import WlAnnotationInfo from '~/components/WlAnnotationInfo.vue'

export default {
  components: {
    WlAnnotationInfo,
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
      showInAnnotations: false,
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
  },
  methods: {
    select(selectedId) {
      console.log( 'selected', selectedId)
      if(this.selectedId != selectedId)
        this.selectedId = selectedId
      else
        this.selectedId = 0
    },
    toggleInAnnotations() {
      console.log('toggleInAnnotations')
      this.showInAnnotations = !this.showInAnnotations
    },
    toggleOutAnnotations() {
      console.log('toggleOutAnnotations')
      this.showOutAnnotations = !this.showOutAnnotations
    },
  },
}
</script>

<style>
.annotation-nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
a