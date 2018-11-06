<template>
  <div class="wl-search-filters">
    <h3>Busqueda avanzada</h3> 
    <div class="active-filters">
      <div
        v-if="showSelectedEntityFilter"
        class="filter">
        <label for="entidad">Entidad</label>
        <div class="control">
          <input
            id="entidad"
            :value="selectedEntity.name"
            name="entidad"
            type="text"
            class="a_input"
            disabled
          >
          <wl-button
            :only-icon="true" 
            title="Agregar Filtro"
            ico="ico-arrow-circle-o-down"
            class="danger"
            @click.native="disableEntityFilter"
          />
        </div>
      </div>

      <div
        v-if="showSelectedDocumentTypeFilter"
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
      </div>

      <div
        v-if="showNumberFilter"
        class="filter">
        <label for="numero">
          Número de documento
        </label>
        <div class="control">
          <input
            id="numero"
            v-model="number"
            name="numero"
            type="text"
            class="a_input"
            disabled
          >
          <wl-button 
            :only-icon="true"
            title="Agregar Filtro"
            ico="ico-filter"
            class="danger"
            @click.native="disableNumberFilter"
          />
        </div>
      </div>

      <div
        v-if="showPublicationFilter"
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
      </div>
    </div>

    <div
      v-if="!showSelectedEntityFilter"
      class="filter">
      <label for="entidad">Entidad</label>
      <div class="control">
        <select 
          id="entidad"
          v-model="selectedEntityId"
          name="entidad" 
          class="a_input"
        >
          <option 
            v-for="entity in entities"
            :key="entity.id"
            :value="entity.id"
          >{{ entity.name }}</option>
        </select>
        <wl-button
          :only-icon="true" 
          title="Agregar Filtro"
          ico="ico-filter"
          @click.native="enableEntityFilter()"
        />
      </div>
    </div>

    <div 
      v-if="!showSelectedDocumentTypeFilter"
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
    </div>

    <div
      v-if="!showNumberFilter"
      class="filter">
      <label for="numero">
        Número de documento
      </label>
      <div class="control">
        <input
          id="numero"
          v-model="number"
          name="numero"
          type="text"
          class="a_input"
        >
        <wl-button 
          :only-icon="true"
          title="Agregar Filtro"
          ico="ico-filter"
          @click.native="enableNumberFilter"
        />
      </div>
    </div>

    <div
      v-if="!showPublicationFilter"
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
    </div>
  </div> 
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton,
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
      number: '',
      isNumberFilterEnabled: false,
      publication: this.currentYear,
      isPublicationFilterEnabled: false
    }
  },
  computed: {
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
    showNumberFilter(){
      return this.number != null && this.number.length > 0 && this.isNumberFilterEnabled
    },
    currentYear() {
      return new Date().getFullYear()
    },
    showPublicationFilter(){
      return this.publication != null && this.publication.length == 4 && this.isPublicationFilterEnabled
    }
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
    enableNumberFilter(){
      if(this.number == null || this.number.length == 0)
        return;
      this.isNumberFilterEnabled = true
    },
    disableNumberFilter() {
      this.isNumberFilterEnabled = false
    },
    enablePublicationFilter() {
      console.log('enable')
      if(this.publication == null || this.publication.length != 4)
        return;
      this.isPublicationFilterEnabled = true
    },
    disablePublicationFilter() {
      this.isPublicationFilterEnabled = false
    }
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