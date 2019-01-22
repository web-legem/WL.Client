<template>
  <div>
    <wl-crud
      :obj-select="null"
      :is-new="false"
      :error="error"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
      @wlclearerror="clearError"
      @wlstartedit="startEdit"
    >
      <template slot="wl-form">
        <div class="box_duo_input">          
          <div>
            <wl-web-cam />
          </div>
          <div>
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Nombre'"
              :max="100"
              :placeholder="'Ingrese Nombre'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Apellidos'"
              :max="100"
              :placeholder="'Ingrese Apellidos'"
              :error-msg="'Este es un error'"
              :error="true"
            />
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Nombre de Usuario'"
              :max="50"
              :placeholder="'Ingrese Nombre de Usuario'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
        </div>
        <div class="box_duo_input">          
          <div>
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Contraseña'"
              :max="256"
              :placeholder="'Ingrese Contraseña'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Identificacion'"
              :max="50"
              :placeholder="'Ingrese Identificacion'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
        </div>        
        <div class="box_duo_input">            
          <div>
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Correo Electronico'"
              :max="100"
              :placeholder="'Ingrese Correo Electronico'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div>
            <wl-input
              v-if="true"
              v-model="name"
              :disable="!isEdit"
              :title="'Rol de Usuario'"
              :max="100"
              :placeholder="'Ingrese Rol de Usuario'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
        </div>

        <div class="box_duo_input">            
          <div>
            <wl-switch-button
              v-if="true"
              :id="'rad1'"
              :disable="!isEdit"
              :type="'checkbox'"
              :title="'Estado Usuario'"
              :label="'Activo'"
              :error-msg="'Este es un error'"
              :error="true"
            />
          </div>
          <div />
        </div>
      </template>
    </wl-crud>    
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WlCrud from "~/components/WlCrud.vue";
import WlInput from "~/components/WlInput.vue";
import WlSwitchButton from "~/components/WlSwitchButton.vue";
import WlWebCam from "~/components/WlWebCam.vue";

export default {
  components: {
    WlCrud,
    WlInput,
    WlWebCam,
    WlSwitchButton,
  },
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      isEdit : false
    };
  },
  computed: {
    ...mapGetters("persons/users", {
      objSelected: "selected",
      error: "error"
    }),
    name: {
      get() {return this.objSelected.name},
      set(value){this.changeName(value)},
    },
    entityTypeId: {
      get() {
        return this.objSelected
          ? this.objSelected.entityType
          : 0;
      },
      set(value) {
        this.changeEntityTypeId(value)
      }
    },
    device: function() {
      return find(this.devices, n => n.deviceId == this.deviceId);
    }
  },
  methods: {    
    cancel() {
      this.$router.push(this.localePath({ name: "admin-annotation-types" }));
    },
    drop() {
      this.delete().then(this.cancel);
    },
    update() {
      this.save(this.objSelected).then(this.cancel);
    },
    startEdit(){
      this.isEdit = true;
    },
    ...mapActions("persons/users", [
      "select",
      "clearSelection",
      "changeName",
      "changeEmail",
      "changeEntityTypeId",
      "save",
      "delete",
      "clearError",
    ])
  },
}
</script>

<style>
/*-----------------------------------------------------------------------*/

.box_duo_input > div {
    flex: 1;
    min-width: 250px;
}

/* Extra Small Devices, Phones */
@media only screen and (max-width : 768px) {
   .box_duo_input {
        flex-direction: column;
    }

}

/* Small Devices, Tablets */
@media only screen and (min-width : 768px) {
    .box_duo_input {
        flex-direction: row;
    }
    .box_duo_input > div:first-child {
        margin-right: 10px;
    }

    .box_duo_input > div:last-child {
        margin-left: 10px;
    }
}
</style>
