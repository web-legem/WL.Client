<template>
  <div class="annotation-info">
    <div class="suggestion my-class">
      <h1 class="document-title">
        <nuxt-link
          :to="localePath({ name: 'annotations-document-id', params: { id: annotation.documentId }})"
          class="title-link"
        >
          <div class="type">
            {{ $t('annotations.annotation-type') }}:
            <span lang="es">{{ annotation.annotationType.name }}</span>
          </div>
        </nuxt-link>
        <button class="ico-pencil icon" />
        <button 
          class="ico-trash icon" 
          @click="deleteAnnotation"
        />
      </h1>
    </div>
    <div 
      class="type"
    >
      {{ 'Tipo de documento' }}:
      <span lang="es">{{ annotation.documentType ? annotation.documentType.name : 'Pendiente' }}</span>
    </div>
    <div 
      class="type"
    >
      {{ 'Número' }}:
      <span>{{ annotation.number || 'Pendiente' }}</span>
    </div>
    <div 
      class="type"
    >
      {{ 'Fecha de publicación' }}:
      <span>{{ annotation.publicationDate || 'Pendiente' }}</span>
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

.document-title {
  flex-grow: 1;
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  font-size: 1em;
  display: flex;
  flex-direction: row;
}

.title-link {
  flex-grow: 1;
  text-decoration: none;
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  text-decoration-color: var(--wl_pimary);
  cursor:pointer;
  font-size: 1em;
}

.direction-icon {
  font-size: .9em;
  background: var(--wl_form_bg);
  color: var(--wl_primary);
}

.type {
  background: var(--wl_form_bg);
  color: var(--wl_text);
  font-size: .9em;
}

.control {
  align-self: flex-end;
  font-size: 1em;
}

.description {
  font-size: .9em;
  background: var(--wl_form_bg);
  color: var(--wl_text);
}

.button-control {
  background: var(--wl_form_bg);
  color: var(--wl_primary);
  cursor: pointer;
}

.button-control:hover {
  text-decoration: underline;
}

.icon {
  margin-left: 5px;
  cursor: pointer;
  background: transparent;
  color: var(--wl_primary);
  font-size: 1em;
  padding: 5px;
  border-radius: 50%;
  transition: background 0.8s;
}

.icon:hover {
  background: var(--wl_tab_shw) radial-gradient(circle, transparent 1%, var(--wl_tab_shw) 1%) center/15000%;
  color:var(--wl_primary);
}

.icon:active {
  background-color: var(--wl_tab_shw);
  color: var(--wl_text);
  background-size: 100%;
  transition: background 0s;
}

.suggestion {
  background: var(--wl_form_bg);
  color: var(--wl_text);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  font-size: 1em;
}
</style>
