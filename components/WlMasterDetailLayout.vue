<template>
  <div class="master-detail-layout">
    <div
      :class="[hideList]"
      class="master"
    >
      <slot 
        :class="[hideList]"
        name="master" 
      />
    </div>

    <div
      :class="[hideDetails]"
      class="detail"
    >
      <slot name="details" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasDetail: {
      type: Boolean,
      default: false
    }
  }
  , computed: {
    hideList() {
      return this.hasDetail ? 'hide': ''
    }
    , hideDetails() {
      return !this.hasDetail ? 'hide': ''
    }
  }
}
</script>

<style lang="scss" scoped>
.master-detail-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background: var(--wl_form_bg);
}

.master {
  width: 33%;
  display: flex;
  flex-direction: column;
  // padding: calc(1em + .5vw);
  // TODO - copiar los paddings en los lugares donde se use el layout diferenciando master y detail

  @media screen and(max-width: 992px) {
    width: 100%;
    // padding: calc(1em + 3 * 1vw);
    max-width: 650px;
    margin: 0 auto;
  }
}

@media screen and(max-width: 992px) {
  .master.hide {
    display: none;
  }
}

.detail {
  width: 67%;
  display: flex;
  flex-direction: column;
  // padding: calc(1em + .5vw); // TODO- mandar padding para que se pueda sobreescribir y dejar en 0 desde el padre
  // width: 100%;

  @media screen and(max-width: 992px) {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    border: none;
  }
  
  @media screen and (min-width: 992px) {
    border-left: 1px solid var(--wl_border);
  }
}

@media screen and(max-width: 992px) {
  .detail.hide {
    display: none;
  }
}
</style>

