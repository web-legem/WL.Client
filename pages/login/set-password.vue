<template>
  <div>
    <wl-landing-page
      :src="vipriImg"
    >
      <div class="basic-form">
        <div 
          v-if="isPathAllow"          
          class="basic-form-box"
        >
          <div class="box-title">
            {{ $t("login.title-set-password") }}
          </div>                    
          <form 
            class="form-basic-container" 
            name="set-password"
            data-vv-scope="form1"
            @submit.prevent="sendSetPassword()"
          >               
            <div
              v-if="isPathAllow && !isTokenAllow"          
              class="wl_msg info md"
            >
              <strong>   
                {{ $t("login.msg-document-password") }}
              </strong>   
            </div>
            <div />   
            <div>
              <div
                v-show="error"
                class="wl_msg error md"
              >
                <strong>                
                  {{ error }}
                </strong>                
              </div>
            </div>     
            <!----------------------------------------------------->
            <wl-input
              v-model="password1"
              :ref-name="'passwordOrg'"
              :title="$t('login.password')"
              :max="100"
              :placeholder="$t('login.enter-password')"
              :name="'form1.passwordOrg'"
              :type="'password'" 
              :validate="{required:true, min: 6}"
              :is-submit="isSubmit"
            />
            
            <div 
              v-show="showWidget.show"
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
                {{ $t("login.lbl-security-level") }}: {{ showWidget.level }}
              </p>
            </div>

            <wl-input
              v-model="password2"
              :title="$t('login.confirm-password')"
              :max="100"
              :placeholder="$t('login.enter-password')"
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
                  {{ $t("login.btn-update") }}
                </wl-button>
              </div>
              <div 
                v-if="loading" 
                class="progress-line" 
              />
            </div>
          </form>
        </div>
      </div>
    </wl-landing-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
      password1:"",
      password2:"",
      colors: ['#F00', '#F90', '#FF0', '#9F0', '#0F0'],
      valors: [ this.$t('login.muy-bajo'),
                this.$t('login.bajo'),
                this.$t('login.medio'),
                this.$t('login.alto'),
                this.$t('login.muy-alto')],
      isSubmit: false,
      isTokenAllow: false,
      userIdRestore:null,
    }
  },
  computed:{
    vipriImg() {
      if(!this.$store.state.highContrast)
        return '/img/vipri-light.jpg'
      return '/img/vipri-dark.jpg'
    },
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
        let result = {
          show: true,
          level: c.val,
        }
        return result;
      }     
    },
    isPathAllow(){
      return this.credential && this.credential.newPasswordRequired || this.isTokenAllow
    },    
    ...mapGetters("login/login", {      
      credential: "credential",
      loogedIn: "loogedIn",
      error: "error",
      loading: "loading",
    }),
  },
  //---------- override ----------  
  created() {
    var data = {
      id: this.$route.query.id,
      token: this.$route.query.token,
    }

    if(data.id != undefined && data.token != undefined){
      this.userIdRestore = data.id
      this.verifyToken(data)
        .then(x => x == false ? this.$router.push(this.localePath({ name: 'index' })) : this.isTokenAllow = true )
        .catch(x => this.$router.push(this.localePath({ name: 'index' })))
      return;
    }
    if(!this.isPathAllow){    
      this.$router.push(this.localePath({ name: 'index' }))      
    }    
  },
  mounted(){
    return this.clearError()
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
        var val = this.valors[0];
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
        userId : this.isTokenAllow ? this.userIdRestore : this.credential.id,  
        password : this.password1,        
      }

      this.$validator.validate('form1.*').then(valid => {
        this.isSubmit = true;
        if (valid) {
          this.setPassword(data)
            .then(_ =>this.$router.push(this.localePath({ name: 'login' })));             
        }      
      });
    },
    ...mapActions("login/login", [
      "setPassword",    
      "verifyToken", 
      "clearError"
    ])
  }
}
</script>

<style lang="scss" scoped>

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

.btn-submit > div:last-child{
  margin-top: 20px;
}

</style>
