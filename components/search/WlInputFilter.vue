<template>
  <div>
    <div class="box_input_btn">
      <wl-button 
        :disable="disable"
        :ico="'ico-refresh'" 
        :only-icon="true" 
        :title="$t('components.input-filter.title-update')"
      />

      <input 
        :id="id"                          
        v-model="textFilter" 
        :name="name"
        :disabled="disable"
        :placeholder="placeholder"         
        type="text" 
        maxlength="20"
        class="input_text_btn"
      >

      <button 
        v-show="isVisible"
        class="btn_cancel" 
        :title="$t('components.input-filter.title-rem-filt')"
        @click="clearText()"
      >
        <span class="ico-plus" />
      </button>
    </div>
  </div>
</template>

<script>
import WlButton from "~/components/WlButton.vue";

export default {
  components: {
    WlButton
  },
  props: {
    name: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    id: { type: String, default: "" },
    disable:  { type: Boolean, default: false },
  },  
  data() {
    return {
      textFilter: ""
    };
  },
  computed: {
    isVisible() {
      return this.textFilter.length > 2;
    }
  },
  methods: {
    clearText() {
      this.textFilter = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.btn_cancel {
  flex-basis: 35px;
  background:var(--btn-can);
  display: block;
  border: 1px solid var(--btn-can-b);
  border-left: none !important;
  width: 100%;
  height: 35px;
  color: var(--btn-can-c);
  font-size: large;
  font-size-adjust: -webkit- 0.8;
  cursor: pointer;
  overflow: hidden;
}

.btn_cancel:disabled {
  background:var(--btn-can-d);
}

.btn_cancel span {
  display: flex;
  color: var(--btn-can-s);
}

.btn_cancel span:before {
  height: 100%;
  width: 100%;
  align-self: center;
  justify-content: center;
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.ico_input_text {
  background: var(--ico-inpt);
  color: var(--ico-inpt-c);
  display: flex;
  justify-content: center;
  font-size: x-large;
  height: 100%;
}

.ico_input_text > span {
  height: 100%;
  display: flex;  
}

.ico_input_text > span:before {
  align-self: center;
}
</style>
