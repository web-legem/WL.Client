import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import es from '../locales/validator-es'
import en from '../locales/validator-en'

Validator.localize('en', en)
Validator.localize('es', es)

Vue.use(VeeValidate,
  {
    locale: 'es',
    dictionary:{
      es ,
      en ,     
    }
  }
)