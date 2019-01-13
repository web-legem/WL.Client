<template>
  <div>
    <wl-crud 
      :obj-select="objSelected"
      :is-new="false"
      @wlcancel="cancel"
      @wlupdate="update"
      @wldelete="drop"
    >
      <template slot="wl-form">
        <wl-input 
          v-if="objSelected"
          v-model="name"
          :title="'Nombre del Tipo Entidad'"
          :max="10" 
          :placeholder="'Escriba el nombre del tipo entidad'" 
          :error-msg="'Este es un error'"                     
          :error="true"
        />    
        <div class="cards">
          <div
            v-for="docType in docTypes"
            :key="docType.id"            
          >
            <div class="block">              
              <input
                v-if="objSelected"
                :id="docType.id"
                v-model="checked"
                :name="docType.id"
                :value="docType.id"
                type="checkbox"
              >
              <label 
                :for="docType.id"
                class="note checked"
              >
                <div>
                  <div class="ico-container">
                    <span class="ico-file-text-o ico-note" />
                  </div>
                  <div class="name-container">                  
                    <p class="note-name">
                      {{ docType.name }}
                    </p>                  
                  </div>
                </div>
              </label>
            </div>                  
          </div>
        </div>        

        <p>Selected: {{ checked }}</p>
      </template>
    </wl-crud>
  </div>
</template>

<template>
  <div>
    <h1>Not Selected</h1>        
    <section class="cards">
      <div 
        v-for="xx in numbers"
        :key="xx.num">       
        <article>
          <img 
            class="article-img" 
            src="http://placekitten.com/430/240" 
            alt=" " >
          <div class="article-title">  
            <input
              :name="xx.num"
              :id="xx.num"
              :value="xx.num"
              v-model="checked"
              type="checkbox"
            >
            <label :for="xx.num">article {{ xx.num }}</label>
          </div>
        </article>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  data(){
    return{
      numbers: [
        {num:1},{num:2},{num:3},
        {num:1},{num:2},{num:3}
      ]
        
    }
  }
  
}
</script>

<style>

/* Grid styles -------------------------------------------------*/
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 30px;
}

.cards {
  max-width: 100%;
  margin: 0 auto 30px;
}

article {
  position: relative;
}

.article-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.article-title {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
}

</style>
