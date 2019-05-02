<template>
  <div class="a_footer">
    <div class="sub_footer1">
      <div id="f_1">
        <p>{{ $t('components.footer.contactenos') }}</p>
        <hr>
        <ul class="contac_container">
          <li><span class="ico-university ico_f2" /> Universidad de Nariño</li>
          <li><span class="ico2-location2 ico_f2" /> Torobajo - Calle 18 Carrera 50</li>
          <li><span class="ico-phone ico_f2" /> PBX: (2)-7311449 - 18000957071</li>        
          <li><span class="ico-envelope ico_f2" /> E-mail: planeacion@udenar.edu.co</li>
        </ul>        
      </div>
      <div id="f_2">
        <p>{{ $t('components.footer.siguenos') }}</p>
        <hr>
        <div class="links_container">
          <ul class="navigation">
            <li>
              <a
                class="ico-facebook-square ico_f"
                href="https://www.facebook.com/udenar"
              ><span class="hide-text">Facebook</span>
              </a>
            </li>
            <li>
              <a
                class="ico-twitter-square ico_f"
                href="https://twitter.com/Udenar"
              ><span class="hide-text">Twitter</span>
              </a>
            </li>
          </ul>        
          <a
            class="f_link"
            href="http://www.udenar.edu.co/"
          >
            <span class="ico-university f_link">
              {{ $t('components.footer.universidad') }}
            </span>
          </a>
        </div>
      </div>

      <div id="f_3">
        <p>{{ $t('components.footer.sitio') }}</p>
        <hr>
        <p> {{ $t('components.footer.developers') }} </p>
        Adriana Rodriguez - Andres Solarte - Mario Florez
      </div>
    </div>
    <div class="sub_footer2">
      <p>{{ $t('components.footer.copyright') }}</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
ul.navigation {
 list-style: none; 
 padding: 0;
}
ul.navigation li {
 display: block; 
 float: left;
 padding: 10px;
}

ul.contac_container{
  list-style: none; 
  padding: 0;
}

.a_footer {
  background: var(--wl_footer_bg);
  color: var(--wl_footer_text);
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  line-height: 1.7;
  font-size: 1em;
}

.sub_footer1{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;  
}

.sub_footer2{
  text-align:center;
  padding:10px;
  background: #131A22;
  color:var(--wl_footer_text);
}

.sub_footer1 > div {
  text-align:center;
  flex: 1;
  margin:10px 40px;
  padding:0 30px;
  background: transparent;
  color:var(--wl_footer_text);
}

.sub_footer1 > div > hr{
  margin:5px 0;
  border:1px solid var(--wl_border);
}

.sub_footer1>div>p{
  background: transparent;
  color:var(--wl_footer_text);
}

.sub_footer1>div>p:first-child{
  font-size:1.1em;
}

.f_link{
  background: transparent;
  color:var(--wl_footer_text);
  cursor:pointer;
}

.ico_f{
  background: transparent;
  color:var(--wl_footer_text);
  font-size:xx-large;
  cursor:pointer;
}

.ico_f:hover,.f_link:hover{
  background: transparent;
  color: var(--wl-light);
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

.hide-text {
  height: 1px;
  left: -900em;
  overflow: hidden;
  position: absolute;
  top: auto;
  width: 1px;  
}

.links_container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
