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

.input_text_btn,/*Input con boton*/
  {
  padding: 0 10px;
  border: 1px solid var(--wl_gray);
  width: 100%;
  height: 35px;
  background: var(--wl_input_bg);
  color: var(--wl_input_text);
}

.input_text_btn {
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  display: block
}


/*Eventos de los inputs*/

.input_text_btn:focus:hover {
  border-color: var(--wl_light);  
}

.input_text_btn:focus~button:hover {
  background: var(--wl_dark);  
  color: var(--wl_btn_content);
}


/*------ hover para los input -------*/

.input_text_btn:hover {
  border-color: var(--wl_primary);
}

/*---- placeholder en mozilla y chrome ----*/

.input_text_btn::placeholder {
  background: transparent;
  color: var(--wl_input_text_ph);
}

.input_text_btn.disable::placeholder {
  background: transparent;
  color: var(--wl_input_text)
}


/* ---FIN placeholder en mozilla y chrome----*/

.input_text_btn:-webkit-autofill .input_text_ico:-webkit-autofill {
  outline: 0;
  box-shadow: 0 0 0px 1000px white inset;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}

/*Input con evento FOCUS .......................................*/

.input_text_btn:focus{
  outline: 0;
  border-color: var(--wl_light);
  border-width: 2px;
  background: var(--wl_subtle);
  color:var(--wl_input_text);
}

.hide-text {
  font-size: 0em;  
}
</style>
