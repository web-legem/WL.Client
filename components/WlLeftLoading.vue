<template>
  <div class="progress-container">
    <div>
      <div 
        class="progress-line" 
      />  
      <span> {{ label }} </span>
    </div>
  </div>      
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.progress-container{
  position:absolute;
  width: 100%;
  top:40%;
  left:0;
  background: transparent;
  color: var(--wl_text);
  padding: calc(1em + .5vw);
  z-index: 8888;
}

.progress-container > div{
  padding: calc(1em + .5vw);
  background: var(--wl_form_bg);  
  color: var(--wl_text);  
  text-align: center;
  border: 1px solid var(--wl_gray);  
}

.progress-container > div > div{
  margin-bottom: 10px;
}
</style>
