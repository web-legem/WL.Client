<template>
  <div class="documents-table">
    <table class="table">
      <thead>
        <tr>
          <th class="td">
            <div class="column-title selected">
              <span>{{ $t('search.search-filters.label-doc-type') }}</span>
              <span class="ico ico-sort-alpha-asc" />
            </div>
          </th>
          <th class="td">
            <div class="column-title">
              <span>{{ $t("admin.entities.module-name") }}</span>
            </div>
          </th>
          <th class="td">
            <div class="column-title">
              <span class="cell-number">{{ $t('search.number-filter.label-num-doc') }}</span>
            </div>
          </th>
          <th class="td">
            <div class="column-title cell-number">
              <span>{{ $t('search.year-filter.label-year-publ') }}</span>
            </div>
          </th>
          <th class="td">
            <div class="column-title cell">
              <span>{{ 'Cargar' }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(document, index) in results"
          :key="document.id"
          class="row"
          :class="[ getRowClass(index) ]"
        >
          <td class="td"><span class="cell">{{ document.documentType.name }}</span></td>
          <td class="td"><span class="cell">{{ document.entity.name }}</span></td>
          <td class="td"><span class="cell-number number">{{ document.number }}</span></td>
          <td class="td"><span class="cell-number number">{{ document.publicationYear }}</span></td>
          <td class="td-small">
            <wl-button
              :only-icon="true"
              :title="'Subir archivo'"
              ico="ico-file-pdf-o"
              class="button-upload table-button"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="table-paginator">
      <nav class="table-paginator">
        <span class="page">Anterior</span>
        <span class="selected">1</span>
        <span class="page">2</span>
        <span class="page">3</span>
        <span class="page">Siguiente</span>
      </nav>
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
      results: [
        { id: 1, documentType: { name: 'Acuerdo' }, entity: { name: 'Rectoría' }, number: '027', publicationYear: 2015 },
        { id: 2, documentType: { name: 'Acuerdo' }, entity: { name: 'Consejo Superior' }, number: '002', publicationYear: 2011 },
        { id: 3, documentType: { name: 'Acuerdo' }, entity: { name: 'Facultad de Ingeniería de la universidad de nariño' }, number: '058', publicationYear: 2018 },
        { id: 4, documentType: { name: 'Circular' }, entity: { name: 'Rectoría' }, number: '013', publicationYear: 2019 },
        { id: 5, documentType: { name: 'Circular' }, entity: { name: 'Rectoría' }, number: '042', publicationYear: 2008 },
        { id: 6, documentType: { name: 'Circular' }, entity: { name: 'Rectoría' }, number: '036', publicationYear: 2006 },
        { id: 7, documentType: { name: 'Circular' }, entity: { name: 'Consejo Superior' }, number: '007', publicationYear: 2015 },
        { id: 8, documentType: { name: 'Circular' }, entity: { name: 'Rectoría' }, number: '014', publicationYear: 2014 },
        { id: 9, documentType: { name: 'Resolución' }, entity: { name: 'Facultad de Ingeniería' }, number: '023', publicationYear: 2017 },
        { id: 10, documentType: { name: 'Resolución' }, entity: { name: 'Rectoría' }, number: '185', publicationYear: 2013 },
      ]
    }
  },
  methods: {
    getRowClass(index){
      return this.isOdd(index) ? 'odd': 'even'
    },
    isOdd(index){
      return index % 2 == 0
    }
  },
}
</script>

<style lang="scss">
.td {
  padding: .6em ;
  border: 1px solid var(--wl_gray_light);
}

.td-small {
  padding: 0;
  border: 1px solid var(--wl_gray_light);
  text-align: center;
}

.even {
  background: var(--wl_gray_light);
  color: var(--wl_text);
}

.odd {
  background: var(--wl_form_bg);
  color: var(--wl_text);
}

.documents-table {
  justify-content: center;
  max-width: 100%;
  padding: 32px;
}

.cell {
  display: block;
  max-width: 200px;
}

.column-title {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  color: var(--wl_form_bg);
  text-decoration: none;
  font-weight: normal;
}

.ico{
  margin-left: 5px;
  display: inline;
}

.number {
  text-align: right;
}

thead {
  background: var(--wl_primary);
  border-color: var(--wl_primary);
  font-size: 1em;
}

.table {
  width: 100%;
  border: 1px solid var(--wl_gray_light);
  border-collapse: collapse;
}

.table-paginator {
  width: 100%;
  display: flex;
  margin-top: 8px;
  flex-direction: row;
  justify-content: flex-end;
}

.page {
  padding: .4em;
  background: var(--wl_form_bg);
  color: var(--wl_text);
  border: 1px solid var(--wl_gray_light);
  display: block;
}

.selected {
  padding: .4em;
  background: var(--wl_primary);
  color: var(--wl_form_bg);
  border: 1px solid var(--wl_primary);
}

.button-upload {
  margin: 0;
}

.cell-number {
  max-width: 100px;
}
</style>
