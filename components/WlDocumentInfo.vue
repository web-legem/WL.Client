<template>
  <div class="wl-document-info">
    <wl-document-controls />
    <div class="annotation-list">
      <h2 class="component-title">
        Anotaciones del documento
      </h2>
      <nav class="annotation-nav">
        <ul class="document-info_ul">
          <li
            v-for="annotation in annotations"
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
    </div>
  </div>
</template>

<script>
import WlDocumentControls from '~/components/WlDocumentControls.vue'
import WlAnnotationInfo from '~/components/WlAnnotationInfo.vue'

export default {
  components: {
    WlDocumentControls,
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
    }
  },
  methods: {
    select(selectedId) {
      console.log( 'selected', selectedId)
      if(this.selectedId != selectedId)
        this.selectedId = selectedId
      else
        this.selectedId = 0
    }
  }
}
</script>

<style scoped>
.wl-document-info {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.component-title {
  padding: 16px;
  border-bottom: 1px solid grey;
}

.annotation-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;

}

.annotation-nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
