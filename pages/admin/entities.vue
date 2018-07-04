<template>
    <div>
        <h1>{{ $t('admin.entities.module-name') }}</h1>
    </div>    
</template>

<script>
export default {
    head() {
        return {
            title: this.$t('admin.entities.module-name')
        }
    }
}
</script>
