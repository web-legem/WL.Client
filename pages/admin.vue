<template>
    <div>
        <nuxt-link :to="{name: 'admin-doc-types'}">
            {{ $t("admin.doc-types.module-name") }}
        </nuxt-link> &nbsp;
        <nuxt-link :to="{name: 'admin-annotation-types'}">
            {{ $t("admin.annotation-types.module-name") }}
        </nuxt-link> &nbsp;
        <nuxt-link :to="{name: 'admin-entity-types'}">
            {{ $t('admin.entity-types.module-name') }}
        </nuxt-link> &nbsp;
        <nuxt-link :to="{name: 'admin-entities'}">
            {{ $t("admin.entities.module-name") }}
        </nuxt-link>

        <nuxt-child />
    </div>
</template>

<script>
export default {}
</script>