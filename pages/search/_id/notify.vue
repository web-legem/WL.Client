<template>
  <wl-notify-entities
    v-if="entities && documentId"
    :entities="entities"
    :document-id="documentId"
    @notify="notify"
    @clean="clean"
  ></wl-notify-entities>
</template>

<script>
import WlNotifyEntities from '~/components/WlNotifyEntities.vue'

export default {
  components: {
    WlNotifyEntities
  },
  computed: {
    documentId() {
      return Number.parseInt(this.$route.params.id)
    }
  },
  asyncData(context) {
    const entitiesPromise = context.app.$axios.get(`/api/Annotation/entities`)
    return Promise.all([
        entitiesPromise,
      ])
      .then(response => ({ 
        entities: response[0].data,
      }))
  },
  methods: {
    notify(emails) {
      console.log(emails)
    },
    clean() {
      this.$router.replace(this.localePath({name: 'search-id'}))
    },
  },
}
</script>

<style>

</style>
