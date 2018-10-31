<template>
  <div class="wl-search-filters">
    <h3>Busqueda avanzada</h3> 
    <div class="filter">
      <label for="entidad">Entidad</label>
      <div class="control">
        <select 
          id="entidad"
          name="entidad" 
          class="a_input"
        >
          <option value="1">Rectoria</option>
        </select>
        <wl-button
          :only-icon="true" 
          title="Agregar Filtro"
          ico="ico-filter"
        />
      </div>
    </div>

    <div class="filter">
      <label for="tipo-documento">Tipo Documento</label>
      <div class="control">
        <select 
          id="tipo-documento"
          name="tipo-documento" 
          class="a_input"
        >
          <option value="1">Ciruclar</option>
        </select>
        <wl-button
          :only-icon="true"
          title="Agregar filtro"
          ico="ico-filter"
        />
      </div>
    </div>

    <div class="filter">
      <label for="numero">
        Número de documento
      </label>
      <div class="control">
        <input
          id="numero"
          name="numero"
          type="text"
          class="a_input"
        >
        <wl-button 
          :only-icon="true"
          title="Agregar Filtro"
          ico="ico-filter"
        />
      </div>
    </div>

    <div class="filter">
      <label for="publicacion">
        Año de publicación
      </label>
      <div class="control">
        <input
          id="publicacion"
          :max="(new Date().getFullYear())"
          name="publicacion"
          type="number"
          min="1990"
          class="a_input"
        >
        <wl-button 
          :only-icon="true"
          title="Agregar Filtro"
          ico="ico-filter"
        />
      </div>
    </div>
  </div> 
</template>

<script>
import WlButton from '~/components/WlButton.vue'

export default {
  components: {
    WlButton
  }
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