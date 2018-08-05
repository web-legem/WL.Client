<template>
  <div>
    <nav>
      <ul>
        <slot />
      </ul>
    </nav>
    <hr>
    <div>
      <slot name="details" />
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
