<template>
  <div>
    <label 
      :for="name" 
      class="texto_labels"
    >
      {{ title }}
    </label>
    <div class="a_select">
      <select 
        :id="id"
        :name="name" 
        :value="value"
        @input="$emit('input',$event.target.value)"
      >
        <option 
          disabled 
          value=""
        >
          {{ emptyMsg }} 
        </option>
        <option 
          v-for="item in list"
          :key="item.id"
          :value="item[valuePropName]"
        >
          {{ item[labelPropName] }}
        </option>      
      </select> 
    </div>

    <div 
      v-show="error" 
      class="msj-error"
    >
      <label>
        {{ errorMsg }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: "" },
    name: { type: String, default: "" },
    id: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" },
    emptyMsg: { type: String, default: "Seleccione una Opción" },
    list: { type: Array, required: true },
    valuePropName: { type: String,required: true },
    labelPropName: { type: String, required: true },
    value: { type: Number, default: 0  }
  },
  data() {
    return {     
    };
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.a_select {
  display: flex;
  border-right: none;
  position: relative;
  margin-bottom: 8px;
}

.a_select select:disabled {
  pointer-events: none;
  background: #ebebeb;
  color: #555;
}

.a_select input:disabled {
  pointer-events: none;
  background: #ebebeb;
  color: #555;
}

.a_select select,
.a_select input {
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #fff;
  width: 100%;
  height: 35px;
  overflow: hidden;
  border: 1px solid #aaa;
  padding: 0 10px;
}

.a_select:before {
  font-family: "iconos-legem";
  font-size: 25px;
  font-weight: 900;
  color: #999;
  content: "\71";
  position: absolute;
  top: 4px;
  right: 0;
  width: 30px;
  height: 35px;
  pointer-events: none;
}

.a_select select:hover {
  border: 1px solid #888;
}

.a_select:hover::before {
  color: #099472;
}

.a_select.disable:hover::before {
  color: #999;
}

.a_select > select:focus {
  outline: 0;
  border-color: #38ba8f;
  border-width: 2px;
}

.a_select select option {
  padding: 0 10px;
}
</style>
