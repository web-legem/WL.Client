<template>
  <div>
    <wl-crud      
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">        
        <wl-input
          :name="'form1.name'"
          :placeholder="$t('persons.permission.place-enter-name')"            
          :title="$t('persons.permission.title-name')"
          :disable="true"
          :max="100"
        />

        <wl-switch-button 
          :id="'rr1'"
          :name="'form1.configSystem'"       
          :type="'checkbox'" 
          :title=" $t('persons.permission.title-config-system')"
          :label=" $t('persons.permission.label-allow')"
          :disable="true"
        />
        <wl-switch-button 
          :id="'rr2'"
          :name="'form1.createDocuments'"       
          :type="'checkbox'" 
          :title=" $t('persons.permission.title-create-doc')"
          :label=" $t('persons.permission.label-allow')"
          :disable="true"
        />
        <wl-switch-button 
          :id="'rr3'"
          :name="'form1.deleteDocuments'"       
          :type="'checkbox'" 
          :title=" $t('persons.permission.title-delete-doc')"
          :label=" $t('persons.permission.label-allow')"
          :disable="true"
        />
      </template>
    </wl-crud>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSwitchButton from "~/components/WlSwitchButton.vue";

export default {
  components: {
    WlCrud,
    WlInput,
    WlSwitchButton,
  },
}
</script>

<style>

</style>
