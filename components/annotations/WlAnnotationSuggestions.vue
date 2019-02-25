<template>
  <div class="annotation-suggestions">
    <ul class="suggestion-list">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        class="list-item"
      >
        <div class="annotationType">
          {{ suggestion.tipoAnotacion.name }}
        </div>
        <div
          v-if="suggestion.entidad || suggestion.tipoDocumento"
          class="info"
        >
          <span>
            Entidad:
            {{ suggestion.entidad.name }}
          </span>
          <span>
            Tipo documento:
            {{ suggestion.tipoDocumento.name }}
          </span>
        </div>
        <div
          v-if="suggestion.number || suggestion.publicationDate"
          class="info"
        >
          <span>
            Número de documento:
            {{ suggestion.number }}
          </span>
          <span>
            Año publicación:
            {{ suggestion.publicationDate | date($store.state.i18n.locale, 'YYYY') }}
          </span>
        </div>
        <div
          v-if="hasNoInfo(suggestion)"
          class="no-info"
        >
          No se encontro mas información
        </div>
        <div class="controls">
          <span class="ico-download" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      suggestions: [
        { id: 1,
          tipoAnotacion: { id: 1, name: 'Deroga' },
          entidad: { id: 2, name: 'Facultad de Ingeniería de la universidad de nariño'},
          tipoDocumento: { id: 2, name: 'Circular'},
          number: '30',
          publicationDate: new Date('2018-02-25')
        },
        { id: 2,
          tipoAnotacion: { id: 2, name: 'Reglamenta' },
          entidad: { id: 2, name: 'Facultad de Ingeniería'},
          tipoDocumento: { id: 2, name: 'Circular'},
          number: '31',
          publicationDate: new Date('2018-02-25')
        },
        { id: 3,
          tipoAnotacion: { id: 1, name: 'Deroga' },
          entidad: { id: 3, name: 'Facultad de Medicina'},
          tipoDocumento: { id: 3, name: 'Acuerdo'},
          number: '32',
          publicationDate: new Date('2018-02-25')
        },
        { id: 4,
          tipoAnotacion: { id: 2, name: 'Reglamenta' },
        },
        { id: 5,
          tipoAnotacion: { id: 1, name: 'Deroga' },
          entidad: { id: 1, name: 'Rectoría'},
          tipoDocumento: { id: 2, name: 'Acuerdo'},
          number: '34',
          publicationDate: new Date('2018-02-25')
        },
        { id: 6,
          tipoAnotacion: { id: 2, name: 'Reglamenta' },
          entidad: { id: 1, name: 'Rectoría'},
          tipoDocumento: { id: 3, name: 'Circular'},
          number: '35',
          publicationDate: new Date('2018-02-25')
        },
        { id: 7,
          tipoAnotacion: { id: 1, name: 'Deroga' },
          entidad: { id: 4, name: 'Departamento de Sistemas'},
          tipoDocumento: { id: 3, name: 'Circular'},
          number: '36',
          publicationDate: new Date('2018-02-25')
        },
        { id: 8,
          tipoAnotacion: { id: 2, name: 'Reglamenta' },
          entidad: { id: 4, name: 'Departamento de Sistemas'},
          tipoDocumento: { id: 1, name: 'Ley'},
          number: '37',
          publicationDate: new Date('2018-02-25')
        },
        { id: 9,
          tipoAnotacion: { id: 1, name: 'Deroga' },
          entidad: { id: 1, name: 'Rectoría'},
          tipoDocumento: { id: 1, name: 'Ley'},
          number: '38',
          publicationDate: new Date('2018-02-25')
        },
        { id: 10,
          tipoAnotacion: { id: 1, name: 'Deroga' },
          entidad: { id: 1, name: 'Rectoría'},
          tipoDocumento: { id: 1, name: 'Ley'},
          number: '38',
          publicationDate: new Date('2018-02-25')
        },
      ],
    }
  },
  methods: {
    hasNoInfo(suggestion) {
      return !(suggestion.entidad || suggestion.tipoDocumento 
        || suggestion.number || suggestion.publicationDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.annotation-suggestions {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.suggestion-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.list-item {
  border-bottom: 1px solid grey;
  max-width: 650px;
  width: 70%;
  display: block;
  padding: 8px;
  font-size: .9rem;
}

.info {
  display: flex;
  flex-direction: row;
}

.info > span {
  width: 50%;
}

.info > span:first-child {
  margin-right: 16px;
}

</style>
