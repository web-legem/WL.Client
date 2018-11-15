<template>
  <div class="wl-search-filters">
    <h3>Busqueda avanzada</h3> 
    <div class="active-filters">
      <wl-select-filter
        v-if="entities"
        :list="entities"
        param="entityId"
        label="Entidad"
        value-prop-name="id"
        label-prop-name="name"
      />

      <!-- <div
        v-show="showSelectedDocumentTypeFilter"
        class="filter">
        <label for="tipo-documento">Tipo Documento</label>
        <div class="control">
          <input
            id="tipo-documento"
            :value="selectedDocumentType.name"
            name="tipo-documento"
            type="text"
            class="a_input"
            disabled
          >
          <wl-button
            :only-icon="true" 
            title="Agregar Filtro"
            ico="ico-arrow-circle-o-down"
            class="danger"
            @click.native="disableDocumentTypeFilter"
          />
        </div>
      </div> -->

      <!-- <div
        v-show="showPublicationFilter"
        class="filter">
        <label for="publicacion">
          Año de publicación
        </label>
        <div class="control">
          <input
            id="publicacion"
            v-model="publication"
            name="publicacion"
            type="text"
            class="a_input"
            disabled
          >
          <wl-button 
            :only-icon="true"
            title="Agregar Filtro"
            ico="ico-filter"
            class="danger"
            @click.native="disablePublicationFilter"
          />
        </div>
      </div> -->
    </div>


    <!-- <div 
      v-show="!showSelectedDocumentTypeFilter"
      class="filter">
      <label for="tipo-documento">Tipo Documento</label>
      <div class="control">
        <select 
          id="tipo-documento"
          v-model="selectedDocumentTypeId"
          name="tipo-documento" 
          class="a_input"
        >
          <option 
            v-for="documentType in documentTypes"
            :key="documentType.id"
            :value="documentType.id">{{ documentType.name }}</option>
        </select>
        <wl-button
          :only-icon="true"
          title="Agregar filtro"
          ico="ico-filter"
          @click.native="enableDocumentTypeFilter"
        />
      </div>
    </div> -->

    <!-- <div
      v-show="!showPublicationFilter"
      class="filter">
      <label for="publicacion">
        Año de publicación
      </label>
      <div class="control">
        <input
          id="publicacion"
          v-model="publication"
          :max="currentYear"
          name="publicacion"
          type="number"
          min="1990"
          class="a_input"
        >
        <wl-button 
          :only-icon="true"
          title="Agregar Filtro"
          ico="ico-filter"
          @click.native="enablePublicationFilter"
        />
      </div>
    </div> -->
    <wl-number-filter />
  </div> 
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlNumberFilter from '~/components/WlNumberFilter.vue'
import WlSelectFilter from '~/components/WlSelectFilter.vue'

export default {
  components: {
    WlButton,
    WlNumberFilter,
    WlSelectFilter,
  },
  data() {
    return {
      entities: [
        { id: 1, name: 'Rectoria' },
        { id: 2, name: 'Facultad de Ingenieria' },
        { id: 3, name: 'Facultad de Derecho' },
        { id: 4, name: 'Facultad de Medicina' },
      ],
      selectedEntityId: null,
      isEntityFilterEnabled: false,
      documentTypes: [
        { id: 1, name: 'Circular' },
        { id: 2, name: 'Resolución'},
        { id: 3, name: 'Acuerdo' },
        { id: 4, name: 'Ley' },
      ],
      selectedDocumentTypeId: null,
      isDocumentTypeFilterEnabled: false,
      publication: this.currentYear,
      isPublicationFilterEnabled: false
    }
  },
  computed: {
    number() {
      return this.$route.query.number || ''
    },
    showSelectedEntityFilter() {
      return this.selectedEntityId != null && this.isEntityFilterEnabled
    },
    selectedEntity() {
      return this.entities.find(x => x.id == this.selectedEntityId)
    },
    showSelectedDocumentTypeFilter(){
      return this.selectedDocumentTypeId != null && this.isDocumentTypeFilterEnabled
    },
    selectedDocumentType() {
      return this.documentTypes.find(x => x.id == this.selectedDocumentTypeId)
    },
    currentYear() {
      return new Date().getFullYear()
    },
    showPublicationFilter(){
      return this.publication != null && this.publication.length == 4 && this.isPublicationFilterEnabled
    },
    showNumberFilter() {
      return this.$route.query && this.$route.query.number > 0
    },
  },
  methods: {
    unselectEntityId() {
      this.selectedEntityId = null
    },
    enableEntityFilter() {
      this.isEntityFilterEnabled = true
    },
    disableEntityFilter() {
      this.isEntityFilterEnabled = false
    },
    unselectDocumentTypeId() {
      this.selectedDocumentTypeId = null
    },
    enableDocumentTypeFilter() {
      this.isDocumentTypeFilterEnabled = true
    },
    disableDocumentTypeFilter() {
      this.isDocumentTypeFilterEnabled = false
    },
    canActivateFilter(){
      let number = this.$refs.inputNumber.value
      return number.length > 0
    },
    enableNumberFilter(){
      let query = { ...this.$route.query }
      query.number = this.$refs.inputNumber.value
      if(this.canActivateFilter()){
        this.$router.push(this.localePath({ name: 'search', query }))
      }
    },
    disableNumberFilter() {
      let query = { ...this.$route.query }
      delete query.number
      this.$router.push(this.localePath({name: 'search', query}))
    },
    enablePublicationFilter() {
      if(this.publication == null || this.publication.length != 4)
        return;
      this.isPublicationFilterEnabled = true
    },
    disablePublicationFilter() {
      this.isPublicationFilterEnabled = false
    },
  },
}
</script>

<style lang="scss" scoped>
.wl-search-filters {
  border: 1px solid gray;
  padding: 16px;
}

.wl-search-filters h3 {
  color: green;
  padding-bottom: 5px;
  border-bottom: 1px solid green;
  margin-bottom: 8px;
}

.filter {
  width: 100%;
  margin-bottom: 16px;
}

.control {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.control select {
  flex-grow: 1;
}
</style>