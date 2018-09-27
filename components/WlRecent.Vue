<template>
  <div class="recent">
    <div class="title_recent">
      <div>
        <p>Actualidad Documental</p>
      </div>
    </div>

    <div class="container_recent">
      <div class="recent_content">
        <wl-recent-card 
          v-for="document in documents"
          :key="document.number"
          :document="document"
        />
      </div>
    </div>
  </div>

</template>

<script>
import WlRecentCard from '~/components/WlRecentCard.vue'

export default {
  components: {
    WlRecentCard
  }
  , data() {
    return {
      documents: [
        { 
          type: {name: 'Circular'}
          , number: 1
          , date: '21 de Julio de 2014'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit rem'
          , entity: {name: 'Rectoría'}
        }
        , { 
          type: {name: 'Resolución'}
          , number: 2
          , date: '14 de Julio de 2012'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Acuerdo'}
          , number: 3
          , date: '9 de Agosto de 2017'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Resolución'}
          , number: 4
          , date: '14 de Julio de 2012'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Acuerdo'}
          , number: 5
          , date: '9 de Agosto de 2017'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Resolución'}
          , number: 6
          , date: '14 de Julio de 2012'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Acuerdo'}
          , number: 7
          , date: '9 de Agosto de 2017'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Resolución'}
          , number: 8
          , date: '14 de Julio de 2012'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
        , { 
          type: {name: 'Acuerdo'}
          , number: 9
          , date: '9 de Agosto de 2017'
          , issue: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia incidunt, et fugit re'
          , entity: {name: 'Facultad de Ingeniería'}
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title_recent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  color: white;
  box-shadow: 0 -3px 10px 2px rgba(0, 0, 0, .3);
  border-bottom: 1px solid #ccc;
  font-family: 'Lato';
  font-size: 35px;
  height: 80px;
  width: 100%;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  text-align: center;
  background: rgba(1,63,87,1);
  background: linear-gradient(45deg, rgba(1,63,87,1) 0%, rgba(0,14,29,1) 100%);
  // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#207ce5', endColorstr='#000e1d', GradientType=1 );
}

.recent_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: rgba(1,63,87,1);
  background: linear-gradient(45deg, rgba(1,63,87,1) 0%, rgba(0,14,29,1) 100%);
  padding: calc(10px + 2vmin);
}
</style>
