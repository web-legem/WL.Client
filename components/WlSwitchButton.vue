<template>
  <div>
    <label 
      :for="name" 
      class="texto_labels"
    >
      {{ title }}
    </label>
    <div 
      class="w-switch"
      :class="{'disable':disable}"
    >
      <input 
        :id="id" 
        :name="name" 
        :checked="value"
        :disabled="disable == true"
        :type="type" 
        :class="{'checkbox':(type=='checkbox') , 'radio':(type=='radio') , 'disable':disable}"
        @change="$emit('input', $event.target.checked)"
      >
      <div>
        <span 
          :class="{'ico-circle-o':(type=='radio'), 'ico-square-o':(type=='checkbox'), } " 
          @click="value = !value" 
        />
        <span 
          :class="{'ico-dot-circle-o':(type=='radio'), 'ico-check-square-o':(type=='checkbox'), } " 
          @click="value = !value" 
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
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    type: { type: String, default: "" },    
    value: { type: Boolean, default: false },
    title: { type: String, default: "" },
    label: { type: String, default: "" },
    isRequired: { type: Boolean, default: false },    
    disable: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: "" }
  },  
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
.w-switch div:hover span,
.w-switch div:hover label
 { color:var(--wl_primary); }
 
.w-switch div span{ 
  color: var(--wl_gray);
  display: flex;  
  align-items: center;
  justify-content: center;  
}
.w-switch div label{/*texto*/
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
    font-size: 20px;
}
.w-switch div span.ico-dot-circle-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch div span.ico-dot-circle-o{ display: none }
.w-switch input:checked ~ div span.ico-circle-o{ display: none }
.w-switch input:checked ~ div span.ico-dot-circle-o{ 
  color: var(--wl_primary);
  display: flex;  
  align-items: center;
  justify-content: center;  
}
/*------------Checkbox-------------*/
.w-switch div span.ico-square-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch div span.ico-check-square-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch div span.ico-check-square-o{ display: none }
.w-switch input:checked ~ div span.ico-square-o{ display: none }
.w-switch input:checked ~ div span.ico-check-square-o{ 
  color: var(--wl_primary);
  display: flex;  
  align-items: center;
  justify-content: center;  
}

</style>
