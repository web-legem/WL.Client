<template>
  <div class="master-detail-layout">
    <div
      :class="[hideList]"
      class="master">
      <slot name="master"/>
    </div>

    <div
      :class="[hideDetails]"
      class="detail">
      <slot
        name="details" />
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

<style lang="scss">
.master-detail-layout {
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  height: 100%;
}

.master {
  width: 33%;
  display: flex;
  flex-direction: column;
  padding: calc(1em + .5vw);

  @media screen and(max-width: 992px) {
    width: 100%;
    padding: calc(1em + 3 * 1vw);
    max-width: 650px;
    margin: 0 auto;
  }
}

@media screen and(max-width: 992px) {
  .master.hide
  , .detail.hide {
    display: none;
  }
}

.detail {
  width: 66%;
  display: flex;
  flex-direction: column;
  padding: calc(1em + .5vw);

  @media screen and(max-width: 992px) {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    border: none;
  }
  
  @media screen and (min-width: 992px) {
    border-left: 1px solid #ccc;
  }
}
</style>
