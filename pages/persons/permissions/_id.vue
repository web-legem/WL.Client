<template>
  <div>
    <h1>Update Permissions</h1>
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
