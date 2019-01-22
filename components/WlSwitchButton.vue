<template>
  <div>
    <label 
      :for="name" 
      class="texto_labels"
    >
      {{ title }}
    </label>
    <label class="w-switch">
      <input 
        :id="id" 
        :name="name" 
        :value="value"
        :disabled="disable == true"
        :type="type" 
        :class="{'checkbox':(type=='checkbox') , 'radio':(type=='radio') , 'disable':disable}"
        @input="$emit('input',$event.target.value)"
      >
      <span :class="{'ico-circle-o':(type=='radio'), 'ico-square-o':(type=='checkbox'), } " />
      <span :class="{'ico-dot-circle-o':(type=='radio'), 'ico-check-square-o':(type=='checkbox'), } " />
      <span> 
        {{ label }} 
      </span>
    </label>
  </div>  
</template>

<script>
export default {
  props: {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    type: { type: String, default: "" },    
    value: { type: String, default: "" },
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
.w-switch span{ cursor:pointer; }
.w-switch input { display: none; }
.w-switch:hover input ~ span { color: #2c77ba; }
.w-switch input ~ span{ color: #aaa; }
.w-switch span:last-child{/*texto*/
    color: #434e58;
    font-size: 1em;
    font-family: 'Lato';
    margin-bottom: 2px;
}


/*------------Radio-------------*/
.w-switch input ~ span.ico-circle-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch input ~ span.ico-dot-circle-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch input ~ span.ico-dot-circle-o{ display: none }
.w-switch input:checked ~ span.ico-circle-o{ display: none }
.w-switch input:checked ~ span.ico-dot-circle-o{ color: #2c77ba; display: inline;}
/*------------Checkbox-------------*/
.w-switch input ~ span.ico-square-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch input ~ span.ico-check-square-o:before{
    vertical-align: text-bottom;
    line-height: .9;    
    font-size: 20px;
}
.w-switch input ~ span.ico-check-square-o{ display: none }
.w-switch input:checked ~ span.ico-square-o{ display: none }
.w-switch input:checked ~ span.ico-check-square-o{ color: #2c77ba; display: inline;}

</style>
