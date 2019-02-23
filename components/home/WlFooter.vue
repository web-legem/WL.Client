<template>
  <div class="a_footer">
    <div class="sub_footer1">
      <div id="f_1">
        <p>Contactenos</p>
        <hr>
        <span class="ico-university ico_f2" /> Universidad de Nariño<br>
        <span class="ico2-location2 ico_f2" /> Torobajo - Calle 18 Carrera 50<br>
        <span class="ico-phone ico_f2" /> PBX: (2)-7311449 - 18000957071<br>
        <span class="ico-envelope ico_f2" /> E-mail: planeacion@udenar.edu.co
      </div>
      <div id="f_2">
        <p>vm.language.strings.Siguenos</p>
        <hr>
        <a
          class="ico-facebook-square ico_f"
          title="vm.language.strings.Facebook"
          href="https://www.facebook.com/udenar"
        />
        <a
          class="ico-twitter-square ico_f"
          title="vm.language.strings.Twitter"
          href="https://twitter.com/Udenar"
        />
        <br>
        <span class="ico-university f_link">
          <a
            title="vm.language.strings.UniversidadNarino"
            class="f_link"
            href="http://www.udenar.edu.co/"
          >
            vm.language.strings.UniversidadNarino
          </a>
        </span>
      </div>

      <div id="f_3">
        <p>vm.language.strings.AcercaSitio</p>
        <hr>
        <br>
        <img src="recursos/footer/valid-css-blue.png">
        <img src="recursos/footer/valid-html40-blue.png">
        <br>vm.language.strings.DesarrolladoPor<br>
        Adriana Rodriguez - Andres Solarte - Mario Florez
      </div>
    </div>
    <div class="sub_footer2">
      <p>vm.language.strings.Copyright</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.a_footer {
  background: var(--footer);
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  color: var(--footer-c);
  line-height: 1.7;
  font-size: 1em;
}

.sub_footer1{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;  
  background:var(--footer1);
}

.sub_footer2{
  text-align:center;
  padding:10px;
  color:var(--footer2);
}

.sub_footer1 > div {
  text-align:center;
  flex: 1;
  margin:10px 40px;
  padding:0 30px;
  min-width:200px;
  color:var(--footer1-dv);
}

.sub_footer1 > div > hr{
  margin:5px 0;
  border:1px solid var(--footer1-hr); /*probar o cambiar de normal a alto*/
}

.sub_footer1>div>p{
  color:var(--footer1-p);
}

.sub_footer1>div>p:first-child{
  font-size:1.1em;
}

.f_link{
  color:var(--link-c);
  cursor:pointer;
}

.ico_f{
  color:var(--ico-f);
  font-size:xx-large;
  cursor:pointer;
}

.ico_f:hover,.f_link:hover{
  color:var(--ico-f-ho);
}

#f_3 > img{
  height:20px;
}

@media (max-width: 600px) { 
  .a_footer{
    flex-direction:column;
  }

  .a_footer > div{
    min-width:unset;
  }
}

.a_mini_footer {
  background: var(--footer-m);
  color:var(--footer-mc);
  display: flex;
  flex-direction:column;   
}

.a_mini_footer > div:first-child{
  box-shadow:0 2px 3px 0 var(--footer-ch);
}


.sub_mini_footer2{
  font-family:'Lato-Regular';
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:10px 0;
}

@media (max-width: 300px) { 
  .a_mini_footer>div{min-width:10px}
}
</style>
