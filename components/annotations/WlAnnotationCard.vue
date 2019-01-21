<template>
  <div class="annotation-info">
    <div class="title">
      <h3 class="document-title">
        <nuxt-link
          :to="localePath({ name: 'search-id', params: { id: 2 }})"
          class="title-link"
        >
          {{ annotation.document }}
        </nuxt-link>
      </h3>
    </div>
    <div class="type">
      Tipo de Anotación:
      {{ annotation.annotationType.name }}
    </div>
    <div class="control">
      <button
        title="Ver mas"
        class="button-control"
        @click="showDetails(annotation.id)"
      >
        Ver más
      </button>
    </div>
    <div
      v-if="isSelected"
      class="description"
    >
      <div>Descriptión:</div>
      <div>
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
  border-bottom: 1px solid lightgray;
  font-size: 1rem;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-size: 1em;
}

.document-title {
  flex-grow: 1;
  color: #00796b;
  font-size: 1em;
}

.title-link {
  text-decoration: none;
  color:#0f745b;
  text-decoration-color: #0f745b;
  cursor:pointer;
  font-size: 1em;
}

.direction-icon {
  font-size: .9em;
  color:#555;
}

.type {
  color: #555;
  font-size: .9em;
}

.control {
  align-self: flex-end;
  font-size: 1em;
}

.description {
  font-size: .9em;
  color: #555;
}

.button-control {
  color: #0f745b;
  background: white;
  cursor: pointer;
}

.button-control:hover {
  text-decoration: underline;
}
</style>
