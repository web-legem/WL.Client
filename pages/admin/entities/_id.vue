<template>
  <div>
    <h1>Entity to Update</h1>

    <wl-crud 
      :obj-select="selected"
      :is-new="false"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
    >

      <template slot="wl-form">
        <wl-input 
          v-if="selected"
          :value="selected.name"
          :title="'Nombre de la Entidad'"
          :max="10" 
          :placeholder="'Escriba el nombre de la entidad'" 
          :error-msg="'Este es un error'"                     
          :error="true"
          @input="changeName"
        />

        <wl-input 
          v-if="selected"
          :value="selected.email"          
          :title="'Email'"
          :max="10" 
          :placeholder="'Escriba Email'" 
          :error-msg="'Este es un error'"                     
          :error="true"
          @input="changeEmail"
        />    

        <wl-select 
          v-model="entityTypeId"
          :id="'select'"
          :name="'select'"
          :title="'Seleccione del Tipo Documento'"
          :error-msg="'Este es un error'" 
          :error="true"
          :list="entityTypes"
          :value-prop-name="'id'"
          :label-prop-name="'name'"
        />

        <p>Selected: {{ entityTypeId }}</p>

      </template>
    </wl-crud>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import WlCrud from "~/components/WlCrud.vue";
import WlButton from "~/components/WlButton.vue";
import WlInput from "~/components/WlInput.vue";
import WlSelect from "~/components/WlSelect.vue";

export default {
  components:{
    WlCrud,
    WlButton,
    WlInput,
    WlSelect,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  computed: {    
    ...mapGetters('admin/entities', {
      selected: 'selected'
    }),
    entityTypeId: {
      get() {
        return this.$store.state.admin.entities.selected
          ? this.$store.state.admin.entities.selected.entityType
          : 0
      }
      , set(value) {
        this.$store.commit('admin/entities/changeEntityTypeId', value)
      }
    },     
  },

  watch: {
    '$route'() {this.select(this.$route.params.id)}
  },
  mounted() {
    this.select(this.$route.params.id)
  },
  beforeDestroy() {
    this.clearSelection()
  },
  methods: {
    cancel() {
      this.$router.push(this.localePath({name: 'admin-entities'}))
    },
    drop() {
      this.delete()
        .then(_ => this.cancel())
    },
    update() {
      this.save(this.selected)
        .then(_ => this.cancel())
    },
    ...mapActions('admin/entities', [
      'select',
      'clearSelection',
      'changeName',
      'changeEmail',
      'changeEntityTypeId',
      'save',
      'delete',
    ])
  },
  asyncData(context) {
    return context.app.$axios.get('/api/EntityType')
      .then(response => ({ entityTypes: response.data}))
      .catch(e => console.log(e))
  }
}
</script>