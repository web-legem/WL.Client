<template>
  <div>
    <wl-crud
      :obj-select="null"
      :disable-buttons="true"
    >
      <template slot="wl-form">                      
        <div class="box_duo_input">          
          <div>
            <wl-web-cam 
              :disable="true"
            />   
          </div>
          <div>
            <wl-input
              :name="'form1.firstname'"
              :disable="true"
              :title=" $t('persons.users-s.title-name')"
              :placeholder=" $t('persons.users-s.place-enter-name')"
            />
            <wl-input
              :name="'form1.lastname'"
              :disable="true"
              :title=" $t('persons.users-s.title-lastname')"
              :max="100"
              :placeholder=" $t('persons.users-s.place-enter-lastname')"
            />
            <wl-input
              :name="'form1.nickname'"
              :disable="true"
              :title=" $t('persons.users-s.title-name-user')"
              :max="50"
              :placeholder=" $t('persons.users-s.place-enter-name-user')"                
            />
          </div>
        </div>
        <div class="box_duo_input">                    
          <div>
            <wl-input
              :name="'form1.document'"
              :disable="true"
              :title=" $t('persons.users-s.title-id')"
              :placeholder=" $t('persons.users-s.place-enter-id')"
            />
          </div>
          <div>
            <wl-input
              :type="'email'"
              :name="'form1.email'"
              :disable="true"
              :title="$t('persons.users-s.title-email')"
              :placeholder=" $t('persons.users-s.place-enter-email')"
            />
          </div>
        </div>        
        <div class="box_duo_input">                      
          <div>              
            <wl-select
              v-model="entityTypeId"          
              :name="'form1.select'"
              :list="emptyList"
              :disable="true"
              :title="$t('persons.users-s.title-role-user')"
              value-prop-name="id"
              label-prop-name="name"
            />
          </div>
          <div>
            <wl-switch-button 
              :id="'chk1'"               
              :type="'checkbox'" 
              :disable="true"
              :title=" $t('persons.users-s.title-state-user')"
              :label=" $t('persons.users-s.label-active')"
            />
          </div>
        </div>
      </template>
    </wl-crud> 
  </div>
</template>

<script>
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSwitchButton from "~/components/WlSwitchButton.vue";
import WlWebCam from "~/components/WlWebCam.vue";
import WlSelect from "~/components/WlSelect.vue";

export default {
  components: {
    WlCrud,
    WlInput,
    WlWebCam,
    WlSwitchButton,
    WlSelect,
  },
  data() {
    return {
      emptyList : [{id:"",name:"Seleccione un elemento"}],
      entityTypeId: ""
    }
  },
}
</script>
