<template>
    <div>
        <nuxt-link :to="{name: 'admin-doc-types'}">Document Types</nuxt-link> &nbsp;
        <nuxt-link :to="{name: 'admin-annotation-types'}">Annotation Types</nuxt-link>
        <nuxt-child />
    </div>
</template>

<script>
export default {}
</script>