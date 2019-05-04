<template>
  <div>
    <div class="filter">
      <label 
        class="texto_labels"
        for="publicacion" 
      >
        {{ $t('search.year-filter.label-year-publ') }}
      </label>
      <div class="box_input_ico">
        <wl-input
          id="publicacion"
          ref="inputDate"
          v-model="getYear"
          :mode="'onlyNumber'"
          :type="'number'"
          :disable="showPublicationFilter==true"
          :title=" $t('search.year-filter.label-year-publ')"
          :max="max"
          :min="min"
          :placeholder=" $t('persons.users-s.place-enter-id')"
          :hide-label="true"
        />        
        <div 
          v-show="!showPublicationFilter"
          class="increment_container"
        >
          <button @click="increaseNumber">
            +
          </button>
          <button @click="decreaseNumber">
            -
          </button>        
        </div>
        <wl-button 
          :only-icon="true"
          :title="showPublicationFilter? $t('search.select-filter.title-remove-filter'): $t('search.select-filter.title-add-filter')"
          :ico="showPublicationFilter? 'ico2-minus':'ico2-plus'"
          :remove="showPublicationFilter==true"
          @click.native="actionFilter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WlButton from '~/components/WlButton.vue'
import WlInput from '~/components/WlInput.vue'
import { removeLangExtension } from '~/helpers/routeManipulation'

export default {
  components: {
    WlButton,
    WlInput,
  },
  data() {
    return {
      publicationDate:'',
    }
  },  
  computed: {
    showPublicationFilter(){
      return Number.parseInt(this.$route.query.publicationDate)
        && this.$route.query.publicationDate >= this.min 
        && this.$route.query.publicationDate <= this.max
    },
    min() {
      return 1999
    },
    max() {
      return new Date().getFullYear()
    },
    getYear: {
      get: function() {
        return this.publicationDate;
      },
      set: function(value) {return this.publicationDate = value+""}
    }
  },
  mounted(){
    this.getYear = (this.$route.query.publicationDate || this.currentYear);
  },
  methods: {
    canActivateFilter() {
      let number = this.$refs.inputDate.value
      return number >= this.min && number <= this.max
    },

    actionFilter(){
      if(this.showPublicationFilter){
        this.disablePublicationFilter()
      }else{
        this.enablePublicationFilter()
      }
    },

    enablePublicationFilter() {
      let query = { ...this.$route.query }
      query.publicationDate = this.$refs.inputDate.value
      if(this.canActivateFilter()){
        this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),query }))
      }
    },
    
    disablePublicationFilter() {
      let query = { ...this.$route.query }
      delete query.publicationDate
      this.$router.push(this.localePath({
        name: removeLangExtension(this.$route.name),
        query }));
      this.getYear = '';
     },
    // -------------------------------------------------

    increaseNumber() {
      let val = this.$refs.inputDate.value;
      val = Number.parseInt(val) + 1;      
      if(val <= this.max){
        this.getYear = val;      
      }else{
        this.getYear = this.max;
      }      
    },

    decreaseNumber() {
      let val = this.$refs.inputDate.value; 
      val = Number.parseInt(val) - 1;      
      if(val > this.min){
        this.getYear = val;
      }else{
        this.getYear = this.min;
      }      
    },
  }  
}
</script>

<style lang="scss" scoped>
.filter {
  width: 100%;
  margin-bottom: 16px;
}

.increment_container{
  display: flex;
  flex-direction: column;
  width: 30px;
}

.increment_container button{
  flex: 1;
  background:var(--wl_input_bg);
  color: var(--wl_text);
  -webkit-box-shadow: inset 0px 0px 0px 1px var(--wl_gray);
  -moz-box-shadow: inset 0px 0px 0px 1px var(--wl_gray);
  box-shadow: inset 0px 0px 0px 1px var(--wl_gray);
}

.increment_container button:hover{
  flex: 1;
  background:var(--wl_gray_light);
  color: var(--wl_text);
  -webkit-box-shadow: inset 0px 0px 0px 1px var(--wl_primary);
  -moz-box-shadow: inset 0px 0px 0px 1px var(--wl_primary);
  box-shadow: inset 0px 0px 0px 1px var(--wl_primary);
}


.increment_container button:active{
  flex: 1;
  background:var(--wl_primary);
  color: var(--wl_btn_content);
  -webkit-box-shadow: inset 0px 0px 0px 1px var(--wl_primary);
  -moz-box-shadow: inset 0px 0px 0px 1px var(--wl_primary);
  box-shadow: inset 0px 0px 0px 1px var(--wl_primary);
}

</style>
