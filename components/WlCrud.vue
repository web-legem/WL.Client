<template>
<div>
    <div class="controles_box_right">
        <wl-button :ico="'ico-pencil'" v-show="showMod == true" :disable="disableBtn"
        @click.native="edit()">editar</wl-button>
        <wl-button :ico="'ico-trash'" v-show="showDel == true" :disable="disableBtn"
         @click.native="remove()">eliminar</wl-button>
        <wl-button :ico="'ico-plus'" v-show="showNew == true" :disable="disableBtn"
         @click.native="create()">nuevo</wl-button>
    </div>

    este es el obj : {{objSelect != null ? objSelect.name: "aun esta null"}}
    <br>
    este es el resultado: {{showMod}}
    <br>
    este es el obj : {{curObject != null ? curObject.name: "aun esta null el nuevo objecto"}}


    <slot name="wl-form"></slot>

    <div class="controles_box_right down">
        <wl-button :ico="'ico-floppy-o'" v-show ="isEdit" :disable="disableBtn"
        @click.native="ok()">Aceptar</wl-button>
        <wl-button :ico="'ico-times'" v-show="isEdit" :disable="disableBtn"
        @click.native="cancel()">Cancelar</wl-button>
    </div>
</div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";

export default {
  components: {
    WlButton
  },

  data() {
    return {
      isNew: false,
      isEdit: false,
      isProcess: false,
      hasError: false,
      curObject: null
    };
  },
  created() {
    this.curObject = this.objSelect;
  },

  props: {
    objSelect: {
      type: Object,
      default: function() {
        return {
          id: -1,
          name: "elemento"
        };
      }
    }
  },
  computed: {
    showMod() {
      return this.objSelect != null && this.objSelect.id && !this.isEdit;
    },
    showDel() {
      return (
        this.objSelect != null &&
        this.objSelect.id &&
        (!this.isEdit || !this.isNew)
      );
    },
    showNew() {
      return !this.isEdit;
    },
    disableBtn() {
      return this.isProcess || this.hasError;
    }
  },
  methods: {
    edit() {
      this.isEdit = true;
    },
    remove() {},
    create() {
      this.isNew = true;
    },
    ok() {
      this.isNew = true;
    },
    cancel() {
      this.isEdit = false;
      this.objSelect = null;
    }
  }
};
</script>

<style>
.controles_box_right {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  border-bottom: solid 1px #e2e2e2;
  margin-bottom: 10px;
}

.controles_box_right.down {
  border-bottom: none;
  border-top: solid 1px #e2e2e2;
  margin-bottom: 0;
  margin-top: 10px;
}

.controles_box_right.down button {
  margin-bottom: 0;
  margin-top: 10px;
}

.controles_box_right button {
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
