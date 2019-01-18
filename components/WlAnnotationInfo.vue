<template>
  <div class="annotation-info">
    <div class="title">
      <h3 class="document-title">
        <nuxt-link :to="localePath({ name: 'search-id', params: { id: 2 }})">
          {{ annotation.document }}
        </nuxt-link>
      </h3>
      <div title="Dirección de la anotación">
        <span :class="[icon]" />{{ direction }}
      </div>
    </div>
    <div class="type">
      Tipo de Anotación:
      {{ annotation.annotationType.name }}
    </div>
    <div class="control">
      <button
        title="Ver mas"
        @click="showDetails(annotation.id)"
      >
        <span class="ico2-eye" />
        Ver más
      </button>
    </div>
    <div
      v-if="isSelected"
      class="description"
    >
      {{ annotation.description }}
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
}

.title {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}

.document-title {
  flex-grow: 1;
}

.control {
  align-self: flex-end;
}
</style>