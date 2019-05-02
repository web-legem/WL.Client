<template>
  <div class="annotation-info">
    <div class="title">
      <h3 class="document-title">
        <nuxt-link
          :to="localePath({ name: 'annotations-document-id', params: { id: annotation.documentId }})"
          class="title-link"
        >
          {{ annotation.document }}
        </nuxt-link>
        <!-- <button class="ico-pencil icon" /> -->
        <button 
          class="ico-trash icon" 
          @click="deleteAnnotation"
        />
      </h3>
    </div>
    <div class="type">
      {{ $t('annotations.annotation-type') }}:
      <span lang="es">{{ annotation.annotationType.name }}</span>
    </div>
    <div 
      v-if="annotation.description"
      class="control" 
    >
      <button
        :title="$t('annotations.list.view-more')"
        class="button-control"
        @click="showDetails(annotation.id)"
      >
        {{ $t('annotations.show-more') }}
      </button>
    </div>
    <div
      v-if="isSelected"
      class="description"
    >
      <div>{{ $t('annotations.description') }}:</div>
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
    },
    deleteAnnotation(){
      this.$axios.delete(`/api/Annotation/${this.annotation.id}`)
        .then(result => location.reload())
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
  background: red;
  color: #00796b;
  font-size: 1em;
  display: flex;
  flex-direction: row;
}

.title-link {
  flex-grow: 1;
  text-decoration: none;
  background: red;
  color:#0f745b;
  text-decoration-color: #0f745b;
  cursor:pointer;
  font-size: 1em;
}

.direction-icon {
  font-size: .9em;
  background: red;
  color:#555;
}

.type {
  background: red;
  color: #555;
  font-size: .9em;
}

.control {
  align-self: flex-end;
  font-size: 1em;
}

.description {
  font-size: .9em;
  background: red;
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

.icon {
  margin-left: 5px;
  cursor: pointer;
  background: transparent;
  color: #0f745b;
  font-size: 1em;
  padding: 5px;
  border-radius: 50%;
  transition: background 0.8s;
}

.icon:hover {
  background: #eee radial-gradient(circle, transparent 1%, #eee 1%) center/15000%;
  color:blue;
}

.icon:active {
  background-color: #999;
  counter-reset: red;
  background-size: 100%;
  transition: background 0s;
}
</style>
