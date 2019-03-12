<template>
  <div>
    <wl-landing-page
      :src="img"
      background-color="#8f956f"
    >
      <div class="login_form">
        <div 
          v-if="isPathAllow"          
          class="form-box"
        >
          <div class="box-title">
            Actualizar Contraseña 
          </div>          
          <p class="msg-pass">
            Esta usando el documento como contraseña del sitio, debe actualizar su contraseña para ingresar            
          </p>
          <div />
          <form 
            class="form-login" 
            name="set-password"
            data-vv-scope="form1"
            @submit.prevent="sendSetPassword()"
          >                  
            <div>
              <div
                v-show="error"
                class="msj-error md"
              >
                {{ error }}
              </div>
            </div>     
            <!----------------------------------------------------->
            <wl-input
              v-model="password1"
              :ref-name="'passwordOrg'"
              :title=" $t('persons.users-s.title-password')"
              :max="100"
              :placeholder="$t('persons.users-s.place-enter-passord')"
              :name="'form1.passwordOrg'"
              :type="'password'" 
              :validate="{required:true, min: 6}"
              :is-submit="isSubmit"
            />
            
            <div 
              v-show="showWidget"
              ref="widgetSeguridad"
              class="widget_seguridad"
            > 
              <div 
                ref="contentSpan"              
                class="content_span"
              > 
                <span />
                <span />
                <span />                
                <span />
                <span />
              </div>
              <p>
                nivel de seguridad: algun valor
              </p>
            </div>

            <wl-input
              v-model="password2"
              :title="'Confirmar contraseña'"
              :max="100"
              :placeholder="$t('persons.users-s.place-enter-passord')"
              :name="'form1.confirm_password'" 
              :type="'password'" 
              :validate="{required:true, confirmed:password1}"
              :is-submit="isSubmit"
            />
            <!----------------------------------------------------->            
            <div class="flex-container col center btn-submit">          
              <div>
                <wl-button                 
                  :ico="'ico-sign-in'"                 
                  :type="'submit'"
                >
                  Actualizar
                </wl-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </wl-landing-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { imagesContext } from '~/helpers/imagesContext'
import WlLandingPage from '~/components/WlLandingPage.vue'
import WlInput from "~/components/WlInput.vue";
import WlButton from "~/components/WlButton.vue";
import md5 from "js-md5"; 

export default {  
  components: {
    WlLandingPage,
    WlButton,
    WlInput,
  },
  nuxtI18n: {
    paths: {
      es: '/ingreso/actualizar-contrasena',
      en: '/login/update-password',
    }
  },
  data() {
    return {
      img: imagesContext('./entrada.jpg'),
      password1:"",
      password2:"",
      colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
      valors: ['muy bajo', 'bajo', 'medio', 'alto', 'muy alto'],
      isSubmit: false,
    }
  },
  computed:{
    showWidget(){
      var contentSpan = this.$refs.contentSpan; 
      if (this.password1 === '') {
        return false;
      }else{
        var c = this.getColor(this.mesureStrength(this.password1));
        if(contentSpan){
          var spans = contentSpan.getElementsByTagName("span");
          for (var i = 0 ; i < spans.length ; i++) {
              spans[i].style.background = "#DDD";
          }
          for (var i = 0; i < c.idx ; i++) {
              spans[i].style.background = c.col;
          }
        }
        return true;
      }     
    },
    isPathAllow(){
      return this.credential && this.credential.newPasswordRequired
    },
    ...mapGetters("login/login", {      
      credential: "credential",
      loogedIn: "loogedIn",
      error: "error",
    }),
  },
  //---------- override ----------
  created() {
    if(!this.isPathAllow){    
      this.$router.push(this.localePath({ name: 'login' }))      
    }    
  },
  //------------------------------
  methods: {    
    grep(arr, callback) {
        var newArr = [],
            len = arr.length,
            i;
        for (i = 0; i < len; i++) {
            var e = arr[i];
            if (callback(e)) {
                newArr.push(e);
            }
        }
        return newArr;
    },
    mesureStrength(p) {
      var _force = 0;
      var _lowerLetters = /[a-z]+/.test(p);
      var _upperLetters = /[A-Z]+/.test(p);
      var _numbers = /[0-9]+/.test(p);
      var _regex = /[$-/:-?{-~!"^_`\[\]]/g.test(p);

      var _flags = [_lowerLetters, _upperLetters, _numbers, _regex];
      var _passedMatches = this.grep(_flags, function (el) { return el === true; }).length;
      var _long = p.length;

      p.length >= 10 ? _force += 20 : p.length >= 6 ? _force += 10 : _force -= 5;
      _force += _passedMatches * 10;

      return _force;
    },      
    getColor(s) {
        var idx = 1;
        var val = 'muy bajo';
        if (s >= 60) { idx = 5; }
        else if (s >= 50) { idx = 4; }
        else if (s >= 40) { idx = 3; }
        else if (s >= 30) { idx = 2; }
        else { idx = 1; }
        return {
            idx: idx, col: this.colors[idx - 1], val: this.valors[idx - 1]
        };
    },
    sendSetPassword(){    
      var data = {
        userId : this.credential.id,  
        password : this.password1,
      }

      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.setPassword(data)
            .then(_ =>this.$router.push(this.localePath({ name: 'index' })));             
        }      
      });
    },
    ...mapActions("login/login", [
      "setPassword",     
    ])
  }
}
</script>

<style lang="scss" scoped>

.login_form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.3);
}

.form-box {
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 420px;
  min-width: 420px;
  background: white;
  margin: 0 auto;
}

.form-login {
  background: white;
  padding: 20px;
  padding-top: 18px;
}

.contenedor_login{
    max-width:420px;
    box-shadow:0 0 0 1px rgba(0, 0, 0, 0.05),0 1px 2px rgba(0, 0, 0, 0.3);   
    min-width:0;
}

.msg-pass{
    padding: 20px;
    display:inline-block;
    font-family: 'Lato';
    font-size: 1rem;
    color: #111;
    background: #eee;
    border-bottom: 1px solid #aaa;
}

.widget_seguridad > p{
    margin-top: 2px;
    font-family:"Lato";
    font-size:small;
    color:#555;
    margin-bottom: 10px;
}

.widget_seguridad > div{
    height:6px;
    display:flex;
    width:60%;
}

.widget_seguridad > div > span{
    display:block; 
    background:#40eb0e; 
    width:30%;
    height:100%;
    margin-right:5px;
}

.widget_seguridad > div > span:last-child{
    margin-right:0;
    background:#ccc;
}

.msg-document{
  padding-bottom: 10px;
  font-size: medium;
}

.btn-submit{
  margin-top: 20px;
}
</style>
