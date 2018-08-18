<template>
  <div class="card-recent">
    <div class="card_title">
      <a href="">{{ document.type.name }} {{ document.number }} del {{ document.date }}</a>
    </div>

    <div class="card_contents">
      {{ document.issue }}
    </div>

    <div class="card_footer">
      <a href="">Entidad: <i>{{ document.entity.name }}</i></a>
      <a href=""> Fecha: <i>{{ document.date }}</i></a>
    </div>

    <div class="card_controls">
      <a href=""><span class="ico-sticky-note-o" />Anotado</a>
      <a href=""><span class="ico-download" />Descargar</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    document: {
      type: Object
      , required: true
    }
  } 
}
</script>

<style>
.card-recent {
  padding: 20px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .05), 0 1px 2px rgba(0, 0, 0, .3);
  background: rgba(255, 255, 255, .95);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 10px 20px;
}

.card_title {
  display: flex; 
  font-family: 'OpenSans-Bold';
  font-size: .9rem;
  line-height: normal;
  padding-bottom: 5px;
}

.card_title a {
  color: #0f745b;
  text-decoration-color: #0f745b; 
  cursor: pointer;
}

.card_contents {
  color: #222;
  font-size: small;
  font-family: 'OpenSans';
  text-align: justify;
}

.card_footer {
  padding-top: 5px;
  color: #666;
  font-size: small;
  font-family: 'OpenSans';
  text-align: justify;
}

.card_footer a {
  text-decoration: none;
  color: inherit;
}

.card_footer a:nth-child(2) {
  padding: 0 5px;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin-left: 5px;
}

.card_controls {
  width: 100%;
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-self: flex-end;
  align-items: flex-end;
  transition: all .6s;
  padding-top: 5px;
  margin-bottom: -10px;
  border-bottom: 1px solid #ccc;
}

.card_controls a {
  color: #0f745b;
  text-decoration: none;
  cursor: pointer;
  font-size: small;
  font-family: "Lato";
  position: relative;
  padding-left: 5px;
}

.card_controls a:first-child {
  margin-right: 20px;
}
</style>
