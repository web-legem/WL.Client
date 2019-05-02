<template>
  <div>
    <div class="box_input_btn">
      <wl-button 
        :disable="disable"
        :ico="'ico-refresh'" 
        :only-icon="true" 
        :title="$t('search.input-filter.title-update')"
        @click.native="reload"
      />

      <label 
        :for="name"         
        class="hide-text"
      >
        Filter
      </label>
      <input 
        :id="id === '' ? name: id"
        v-model="internalValue" 
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
        :title="$t('search.input-filter.title-rem-filt')"
        :aria-label="$t('search.input-filter.title-rem-filt')"
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
    value: {type: String, default: "" },
  },  
  computed: {
    isVisible() {
      return this.value.length > 0;
    },
    internalValue: {
      get() { return this.value },
      set(value) { this.$emit('input', value)}
    }
  },
  methods: {
    clearText() {
      this.$emit('input', '')
    },
    reload() {
      console.log('reload')
      location.reload()
    }
  }
};
</script>

<style lang="scss" scoped>
.btn_cancel {
  flex-basis: 35px;
  background: var(--wl_primary);
  color: var(--wl_btn_content);
  display: block;
  border-left: none !important;
  width: 100%;
  height: 35px;
  font-size: large;
  font-size-adjust: -webkit- 0.8;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.btn_cancel:before,
{
  content:'';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0px;
  height: 100%;
}

.btn_cancel:hover:before {
  background:var(--wl_primary_hover);
  color: var(--wl_btn_content);
  width: 100%;
}

.btn_cancel:active:before {
  background:var(--wl_primary_active);
  color: var(--wl_btn_content);
  width: 100%;
}

.btn_cancel:disabled {
  background:var(--wl_btn_disable);
  color:var(--wl_btn_content);  
}

.btn_cancel span {
  display: flex;
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

.hide-text {
  font-size: 0em;  
}
</style>
