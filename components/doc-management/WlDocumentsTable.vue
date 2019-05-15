<template>
  <div class="documents-table">
    <table class="table">
      <thead>
        <wl-table-order-controls />
      </thead>
      <tbody>
        <template v-if="documentTypes && entities">
          <tr 
            v-for="(document, index) in results"
            :key="document.id"
            class="row"
            :class="[ getRowClass(index) ]"
          >
            <td class="td"><span class="cell">{{ getDocumentTypeName(document)}}</span></td>
            <td class="td"><span class="cell">{{ getEntityName(document) }}</span></td>
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
        </template>
      </tbody>
    </table>
    <div class="table-paginator">
      <wl-table-page-controls class="bottom-pager" />
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlTableOrderControls from '~/components/WlTableOrderControls.vue'
import { mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import {removeLangExtension} from '~/helpers/routeManipulation'
import WlTablePageControls from '~/components/WlTablePageControls.vue'

export default {
  components: {
    WlButton,
    WlTableOrderControls,
    WlTablePageControls,
  },
  computed: {
    ...mapGetters('table', {
      entities: 'entities',
      documentTypes: 'documentTypes',
      results: 'searchResults',
      searching: 'searching',
      showNoResultsPage: 'showNoResultsPage',
      hasResults: 'hasResults',
      hasAnyResults: 'hasAnyResult',
      hasSearchError: 'hasSearchError',
      showInitial: 'showInitial'
    }),
    ...mapState('table', {
      loadingResults: 'loadingResults',
      loadingTotalCount: 'loadingTotalCount',
      error: 'error',
      totalCountError: 'totalCountError',
      searchError: 'searchError',
    }),
  },
  watch: {
    '$route'() {
      this.search({...this.$route.query})
    },
  },
  mounted() {
    this.navigateTo({...this.$route.query, page: 1})
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    getRowClass(index){
      return this.isOdd(index) ? 'odd': 'even'
    },
    isOdd(index){
      return index % 2 == 0
    },
    ...mapMutations('table',{
      clear: 'clear'
    }),
    ...mapActions('table', {
      search: 'search',
    }),
    navigateTo(query) {
      console.log('navigateTo')
      this.$router.push(this.localePath({ 
        name: removeLangExtension(this.$route.name),
        query
      }))
    },
    getEntityName(document){
      return this.entities.find(x => x.id == document.entityId).name
    },
    getDocumentTypeName(document) {
      return this.documentTypes.find(x => x.id == document.documentTypeId).name
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
