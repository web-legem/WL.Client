<template>
  <div>
    Confirmar anotación
    <div>
      <div>
        <h3>Documento Fuente (anotante)</h3>
        <span>Id: {{ $route.params.id }}</span>
      </div>
      <div>
        <h3>Documento Destino (anotado)</h3>
        <span>Id: {{ $route.params.dest }}</span>
      </div>
      Formulario de anotaciones, tipo anotacion, descripción anotación
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
