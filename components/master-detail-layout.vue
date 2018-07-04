<template>
   <div>
       <nav>
           <ul>
               <slot></slot>
           </ul>
       </nav>
       <hr />
       <div>
           <slot name="details"></slot>
       </div>
   </div> 
</template>

<script>
export default {
   name: 'master-detail-layout' 
}
</script>

<style>

</style>
