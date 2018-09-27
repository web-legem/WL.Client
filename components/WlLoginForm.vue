<template>
  <div class="login_form">
    <div class="form-box">
      <div class="box-title">
        Ingresar al Sistema
      </div>

      <form class="form-login">
        <input
          type="text"
        >
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.login_form {
  padding-bottom: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .25), 0 1px 2px rgba(0, 0, 0, .3);
}

.form-box {
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 420px;
  background: white;
  margin: 0 auto;
}

.box-title {
  display: flex;
  align-items: center;
  color: white;
  height: 35px;
  align-self: stretch;
  background: #00796b;
  font-family: 'OpenSans-Bold';
  font-size: 1rem;
  padding-left: 10px;
}

.form-login {
  background: white;
  padding: 20px;
}
</style>
