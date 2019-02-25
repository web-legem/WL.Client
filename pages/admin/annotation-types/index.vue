<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :title="$t('admin.annotation-type.title-name-annotation-type')"
          :placeholder="$t('admin.annotation-type.place-enter-name-ta')"
          :max="0"
          :disable="true"
        />
        <wl-input
          :title="$t('admin.annotation-type.title-annotation-root')"
          :placeholder="$t('admin.annotation-type.place-enter-annotation-root')"
          :max="0"          
          :disable="true"
          class="sm-space-top"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
export default {
  components: {
    WlCrud,
    WlInput
  },
}
</script>

<style>

</style>
