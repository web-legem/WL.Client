<template>
  <div class="container">
    <div class="error-message">
      <span
        :class="icon"
        class="ico"
      />
      <p 
        class="content"
        :class="[ $mq == 'sm'? 'small': '', $mq == 'md'? 'medium': '' ]" 
      >
        <slot />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.error-message {
  background: transparent;
  color: grey;
  border: 2px dashed grey;
  width: 70%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ico {
  display: block;
  font-size: 8rem;
  margin-bottom: -16px;
}

.content {
  font-size: 1.5rem;
}

.medium {
  font-size: 1.2rem;
}

.small {
  font-size: 1rem;
}
</style>
