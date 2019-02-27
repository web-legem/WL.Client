<template>
  <div>
    <h1>{{ $t('persons.users-s.h-not-selected') }}</h1>
    <div class="conttt">
      <wl-load2 />            
    </div>
  </div>
</template>

<script>
import WlLoad2 from "~/components/WlLoad2.vue";

export default {
components: {
    WlLoad2,
  },
}
</script>

<style>
.conttt{
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;  
  justify-content: center;
}
</style>
