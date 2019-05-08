<template>
  <div class="documents-table">
    <table>
      <thead>
        <tr>
          <th>
            <div class="column-title selected">
              <span>{{ $t('search.search-filters.label-doc-type') }}</span>
              <span class="ico ico-sort-alpha-asc" />
            </div>
          </th>
          <th>
            <div class="column-title">
              <span>{{ $t("admin.entities.module-name") }}</span>
            </div>
          </th>
          <th>
            <div class="column-title">
              <span>{{ $t('search.number-filter.label-num-doc') }}</span>
            </div>
          </th>
          <th>
            <div class="column-title">
              <span>{{ $t('search.year-filter.label-year-publ') }}</span>
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
          <td><span class="cell">{{ document.documentType.name }}</span></td>
          <td><span class="cell">{{ document.entity.name }}</span></td>
          <td><span class="cell number">{{ document.number }}</span></td>
          <td><span class="cell number">{{ document.publicationYear }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
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
.row > td,
tr > th {
  padding: .6em .8em;
}

.even {
  background: var(--wl_gray_light);
}

.odd {
  background: var(--wl_form_bg);
}

.documents-table {
  display: flex;
  justify-content: center;
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

table {
  border: 1px solid var(--wl_gray_light);
  border-collapse: collapse;
}

td {
  border: 1px solid var(--wl_gray_light);
}
</style>
