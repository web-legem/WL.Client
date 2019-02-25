<template>
  <div>
    <h1>{{ $t('doc-management.classify-doc.h-select-doc-no-classify-a-Classify') }}</h1>
    <nuxt-link :to="localePath({ name: 'doc-management-classify-document-id', params: { id: 2 } })">
      {{ $t('doc-management.classify-doc.first-doc') }}
    </nuxt-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
