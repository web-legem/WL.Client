<template>
  <div>
    <wl-crud 
      :obj-select="null"
      :disable-buttons="true"
    >
      <div slot="wl-form">
        <wl-input 
          :name="'form1.name'"
          :title="$t('admin.document-type.title-name-doc-type')"
          :placeholder="$t('admin.document-type.place-enter-name-td')" 
          :max="0"
          :disable="true"
        />
      </div>
    </wl-crud>
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue"
import WlInput from "~/components/WlInput.vue"

export default {
  components: {
    WlCrud,
    WlInput,
  }
}
</script>

<style>
</style>
