<template>
  <div class="annotation-info">
    <div class="info-title">
      <h3 class="document-title">
        <nuxt-link
          :to="localePath({ name: 'search-id', params: { id: annotation.documentId }})"
          class="title-link"
        >
          {{ annotation.document }}
        </nuxt-link>
      </h3>
    </div>
    <div class="type">
      {{ $t('search.annotation-inf.div-annot-type') }}
      {{ annotation.annotationType.name }}
    </div>
    <div class="control">
      <button
        :title="$t('search.annotation-inf.title-see-more') "
        class="button-control"
        @click="showDetails(annotation.id)"
      >
        {{ $t('search.annotation-inf.butt-see-more') }}
      </button>
    </div>
    <div
      v-if="isSelected"
      class="description"
    >
      <div> {{ $t('search.annotation-inf.div-desc') }}</div>
      <div lang="es-CO">
        {{ annotation.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    annotation: {
      type: Object,
      required: true,
    },
    selected: {
      type: Number,
      default: 0
    }
  },
  computed: {
    isDirectionIn() {
      return this.annotation.direction == "IN"
    },
    icon() {
      return this.isDirectionIn
        ? "ico2-arrow-right"
        : "ico2-arrow-left"
    },
    direction() {
      return this.isDirectionIn
        ? "Fuente"
        : "Destino"
    },
    isSelected() {
      return this.selected == this.annotation.id
    }
  },
  methods: {
    showDetails(annotationId) {
      this.$emit('show-annotation', annotationId)
    }
  }
}
</script>

<style lang="scss" scoped>
.annotation-info {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid var(--wl_gray);
  font-size: 1rem;
}

.info-title {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-size: 1em;
}

.document-title {
  flex-grow: 1;
  background: transparent;
  color: greenyellow;
  font-size: 1em;
}

.title-link {
  text-decoration: none;
  background: transparent;
  color: var(--wl_primary);
  text-decoration-color:var(--wl_primary);
  cursor:pointer;
  font-size: 1em;
}

.direction-icon {
  font-size: .9em;
  background: greenyellow;
  color: var(wl_gray);
}

.type {
  background: transparent;
  color: var(wl_text);
  font-size: .9em;
}

.control {
  align-self: flex-end;
  font-size: 1em;
}

.description {
  font-size: .9em;
  background: transparent;
  color: var(--wl_text);
}

.button-control {  
  background: transparent;
  color: var(--wl_primary);
  cursor: pointer;
}

.button-control:hover {
  text-decoration: underline;
}
</style>