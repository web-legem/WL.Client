<template>
  <div>
    <nuxt-link :to="localePath({ name: 'persons-users' })">
      {{ $t("persons.users.module-name") }}
    </nuxt-link>
    <nuxt-link :to="localePath({ name: 'persons-permissions' })">
      {{ $t("persons.permissions.module-name") }}
    </nuxt-link>

    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
}
</script>
