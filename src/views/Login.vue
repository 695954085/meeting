<template>
  <div class="login">
    <img src=""
         alt="">
    <h3>智慧办公管理系统</h3>
    <input class="employee-no"
           type="text"
           placeholder="工号/employee No" />
    <input class="employee-psw"
           type="password"
           placeholder="密码/password" />
    <div class="password-blo">
      <div>
        <input name="remember"
               type="checkbox" />
        <label for="remember">记得密码</label>
      </div>
      <span>忘记密码?</span>
    </div>
    <x-button :gradients="['#1D62F0', '#19D5FD']"
              @click.native="handleLogin"
              class="login-btn">登录/Login</x-button>
  </div>
</template>
<script>
import { XButton } from 'vux'

export default {
  name: 'Login',
  components: {
    XButton
  },
  data () {
    return {
    }
  },
  methods: {
    handleLogin () {
      //  路由跳转
      this.$router.push(`/main`)
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  input[type="text"],
  input[type="password"] {
    width: 90%;
    font-size: 32px;
    margin: 14px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    text-indent: 1rem;
  }
  .employee-no {
    color: #fba;
  }
  .employee-psw {
    color: #bfa;
  }
  .password-blo {
    width: 80%;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 90%;
  }
}
</style>
