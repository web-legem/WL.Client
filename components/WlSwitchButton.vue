<template>
  <div>
    <span 
      class="texto_labels"
    >
      {{ title }}
    </span>
    <div 
      class="w-switch"
      :class="{'disable':disable, 'small': small}"
    >
      <input 
        :id="id" 
        ref="switch"
        :name="name" 
        :checked="value"
        :disabled="disable == true"
        :type="type" 
        :class="{'checkbox':(type=='checkbox') , 'radio':(type=='radio') , 'disable':disable}"
        @change="$emit('input', $event.target.checked)"
      >
      <div>
        <span 
          v-if="value == undefined || value==false"
          :class="{'ico-circle-o':(type=='radio'), 'ico-square-o':(type=='checkbox'), } " 
          @click="trigger" 
        />
        <span 
          v-if="value == true"
          :class="{'ico-dot-circle-o':(type=='radio'), 'ico-check-square-o':(type=='checkbox'), } " 
          @click="trigger" 
        />
        <label :for="id"> 
          {{ label }}
        </label>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    id: { type: String, default: "", required: true },
    name: { type: String, default: "" },
    type: { type: String, default: "" },    
    value: { type: Boolean, default: false },
    title: { type: String, default: "" },
    label: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },    
    disable: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" },
    small: { type: Boolean, default: false },
  },  
  methods: {
  	trigger () {
    	this.$refs.switch.click()
    }
  }
}
</script>

<style scoped>
.w-switch{  
  display: flex;
  height: 35px;
  margin-bottom: 8px;
  padding: 0;
}

.w-switch.disable{  
  pointer-events: none;
}
.w-switch.disable div span{  
  pointer-events: none;
  background: transparent;
  color: var(--wl_gray) !important;
}

.w-switch div{  
  display: flex;
  align-items: center;
}

.w-switch div span{ cursor:pointer; }

.w-switch input[type="checkbox"] { 
  opacity:0; 
  position: absolute; 
  overflow: hidden; 
  clip: rect(0 0 0 0); 
  height:1px; 
  width:1px; 
  margin:-1px; 
  padding:0;
  border:0;
}
.w-switch div span:hover,
.w-switch div label:hover
{ 
  background: transparent;
  color:var(--wl_primary); 
}
 
.w-switch div span{ 
  background: transparent;
  color: var(--wl_gray);
  display: flex;  
  align-items: center;
  justify-content: center;  
}
.w-switch div label{/*texto*/
  background: transparent;
  color: var(--wl_text);
  font-size: 1em;
  font-family: 'Lato';
  margin-left: 5px;
  cursor:pointer;
}

.w-switch input ~ div {
  border: 1px solid transparent;
}

.w-switch input:focus ~ div {
  border: 1px solid var(--wl_light);
}

/*------------Radio-------------*/
.w-switch div span.ico-circle-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: x-large;
}
.w-switch div span.ico-dot-circle-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: x-large;
}
.w-switch div span.ico-dot-circle-o{ display: none }
.w-switch input:checked ~ div span.ico-circle-o{ display: none }
.w-switch input:checked ~ div span.ico-dot-circle-o{ 
  background: transparent;
  color: var(--wl_primary);
  display: flex;  
  align-items: center;
  justify-content: center;  
}
/*------------Checkbox-------------*/
.w-switch div span.ico-square-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: x-large;
}
.w-switch div span.ico-check-square-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: x-large;
}
.w-switch div span.ico-check-square-o{ display: none }
.w-switch input:checked ~ div span.ico-square-o{ display: none }
.w-switch input:checked ~ div span.ico-check-square-o{ 
  background: transparent;
  color: var(--wl_primary);
  display: flex;  
  align-items: center;
  justify-content: center;  
}

.w-switch.small {
  padding: 0;
  margin-bottom: 0;
}

</style>
