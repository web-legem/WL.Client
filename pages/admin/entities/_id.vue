<template>
  <div>
    <h1>Entity to Update</h1>

    <input
      v-if="selected"
      :value="selected.name"
      type="text"
      @input="changeName($event.target.value)"
    >
      
    <input
      v-if="selected"
      :value="selected.email"
      type="email"
      @input="changeEmail($event.target.value)"
    >

    <select
      v-if="selected"
      id="select"
      v-model="entityTypeId"
      name="select" 
    >
      <option
        value=""
        disabled
      >
        Por favor, seleciona uno
      </option>
      <option
        v-for="entityType in entityTypes"
        :key="entityType.id"
        :value="entityType.id"
      >
        {{ entityType.name }}
      </option>
    </select>
    <p>Selected: {{ entityTypeId }}</p>
    <button
      type="button"
      @click="update"
    >
      Update
    </button>
    <button
      type="button"
      @click="cancel"
    >
      Cancel
    </button>
    <button
      type="button"
      @click="drop"
    >
      Delete
    </button>
  </div>
</template>

<script>
import {
  mapGetters
  , mapActions
} from 'vuex';

export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  computed: {
    entityTypeId: {
      get() {
        return this.$store.state.admin.entities.selected
          ? this.$store.state.admin.entities.selected.entityType
          : 0
      }
      , set(value) {
        this.$store.commit('admin/entities/changeEntityTypeId', value)
      }
    }
    , ...mapGetters('admin/entities', { 
      selected: 'selected'
    })
  }
  , watch: {
    '$route'() {
      this.select(this.$route.params.id)
    }
  }
  , mounted() {
    this.select(this.$route.params.id)
  }
  , beforeDestroy() {
    this.clearSelection()
  }
  , methods: {
    cancel() {
      this.$router.push(this.localePath({name: 'admin-entities'}))
    }
    , drop() {
      this.delete()
        .then(_ => this.cancel())
    }
    , update() {
      this.save(this.selected)
        .then(_ => this.cancel())
    }
    , ...mapActions('admin/entities', [
      'select'
      , 'clearSelection'
      , 'changeName'
      , 'changeEmail'
      , 'changeEntityTypeId'
      , 'save'
      , 'delete'
    ])
  }
  , asyncData(context) {
    return context.app.$axios.get('/api/EntityType')
      .then(response => ({ entityTypes: response.data}))
      .catch(e => console.log(e))
  }
}
</script>