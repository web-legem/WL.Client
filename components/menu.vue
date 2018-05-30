<template>
    <div>
        <div>Menu</div>        
        <nuxt-link to="/">Home</nuxt-link> &nbsp;
        <nuxt-link :to="{name: 'admin'}">Admin</nuxt-link>
    </div>
</template>

<script>
export default {}
</script>