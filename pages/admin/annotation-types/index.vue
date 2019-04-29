<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">
        <wl-input
          :name="'form1.name'"            
          :title="$t('admin.annotation-type.title-name-annotation-type')"
          :placeholder="$t('admin.annotation-type.place-enter-name-ta')"
          :disable="true"
          :max="0"
        />
        <wl-input
          :name="'form1.root'"
          :title="$t('admin.annotation-type.title-annotation-root')"
          :placeholder="$t('admin.annotation-type.place-enter-annotation-root')"
          :disable="true"
          :max="0"
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
