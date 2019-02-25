<template>
  <div>
    <h1>{{ $t('persons.permission.h-update-permissions') }}</h1>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
}
</script>

<style>

</style>
