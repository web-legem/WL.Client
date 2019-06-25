<template>
  <div>
    <h1 class="left-form-title">
      {{ $t('search.search-filters.h-search-ava') }}
    </h1> 
    <div class="wl-search-filterss">
      <wl-select-filter
        v-if="entities && showEntityFilter"
        id="id_entites"
        :list="entities"
        param="entityId"
        :label="$t('search.search-filters.label-entity')"
        value-prop-name="id"
        label-prop-name="name"
      />      
      <wl-select-filter
        v-if="documentTypes"
        id="id_documents"
        :list="documentTypes"
        param="documentTypeId"
        :label="$t('search.search-filters.label-doc-type')"
        value-prop-name="id"
        label-prop-name="name"
      />
      <wl-number-filter />
      <wl-year-filter />
    </div>
  </div> 
</template>

<script>
import WlNumberFilter from '~/components/search/WlNumberFilter.vue'
import WlSelectFilter from '~/components/search/WlSelectFilter.vue'
import WlYearFilter from '~/components/search/WlYearFilter.vue'
import {mapGetters} from 'vuex'
import { removeLangExtension } from '~/helpers/routeManipulation'

export default {
  components: {
    WlNumberFilter,
    WlSelectFilter,
    WlYearFilter,
  },
  data() {
    return {
      selectedEntityId: null,
      isEntityFilterEnabled: false,
      selectedDocumentTypeId: null,
      isDocumentTypeFilterEnabled: false,
      publication: this.currentYear,
      isPublicationFilterEnabled: false,
    }
  },
  computed: {
    ...mapGetters('search', {
      entities: 'entities',
      documentTypes: 'documentTypes',
    }),
    ...mapGetters("login/login", {
      credential: "credential",      
    }), 
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
    showEntityFilter(){
      let containtSearch = this.$route.path.includes("search") ||  this.$route.path.includes("busqueda");
      if(containtSearch){
        return true;
      }
      return this.credential != null && !this.credential.entityId
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
    canActivateFilter(){
      let number = this.$refs.inputNumber.value
      return number.length > 0
    },
    enableNumberFilter(){
      let query = { ...this.$route.query }
      query.number = this.$refs.inputNumber.value
      if(this.canActivateFilter()){
        this.$router.push(this.localePath({
          name: removeLangExtension(this.$route.name),
          query,
        }))
      }
    },
    disableNumberFilter() {
      let query = { ...this.$route.query }
      delete query.number
      this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),
        query}))
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
.wl-search-filterss {
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  border: 1px solid var(--wl_border);
  padding: 16px;
}

.filter {
  width: 100%;
  margin-bottom: 16px;
}

</style>