<template>
  <div class="a_footer">
    <div class="sub_footer1">
      <div id="f_1">
        <p>{{ $t('components.footer.contactenos') }}</p>
        <hr>
        <span class="ico-university ico_f2" />  {{ $t('components.footer.universidad') }} <br>
        <span class="ico2-location2 ico_f2" /> {{ $t('components.footer.direccion') }}<br>
        <span class="ico-phone ico_f2" /> PBX: (2)-7311449 - 18000957071<br>
        <span class="ico-envelope ico_f2" /> E-mail: planeacion@udenar.edu.co
      </div>
      <div id="f_2">
        <p>{{ $t('components.footer.siguenos') }}</p>
        <hr>
        <a
          class="ico-facebook-square ico_f"
          href="https://www.facebook.com/udenar"
        ><span class="hide-text">Facebook</span></a>
        <a
          class="ico-twitter-square ico_f"
          href="https://twitter.com/Udenar"
        ><span class="hide-text">Twitter</span></a>
        <br>
        <span class="ico-university f_link">
          <a
            class="f_link"
            href="http://www.udenar.edu.co/"
          >
            {{ $t('components.footer.universidad') }}
          </a>
        </span>
      </div>

      <div id="f_3">
        <p>{{ $t('components.footer.sitio') }}</p>
        <hr>
        <br>{{ $t('components.footer.developers') }}<br>
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
.a_footer {
  background: var(--wl_footer_bg);
  width: 100%;
  min-height: 30vh;
  display: flex;
  flex-direction: column;
  color: var(--wl_footer_text);
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
  color:var(--wl_footer_text);
  background:rgba(255,255,255,.08);
}

.sub_footer1 > div {
  text-align:center;
  flex: 1;
  margin:10px 40px;
  padding:0 30px;
  color:var(--wl_footer_text);
}

.sub_footer1 > div > hr{
  margin:5px 0;
  border:1px solid var(--wl_border);
}

.sub_footer1>div>p{
  color:var(--wl_footer_text);
}

.sub_footer1>div>p:first-child{
  font-size:1.1em;
}

.f_link{
  color:var(--wl_footer_text);
  cursor:pointer;
}

.ico_f{
  color:var(--wl_footer_text);
  font-size:xx-large;
  cursor:pointer;
}

.ico_f:hover,.f_link:hover{
  color: #38ba8f;
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
</style>
