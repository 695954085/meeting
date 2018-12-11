<template>
  <div class="login-ctn">
    <div class="login-info-ctn">
      <div class="login-title-img"
           aspectratio>
        <div aspectratio-content>
          <img src="../../assets/demo/1.jpg"
               alt=""
               class="login-title-img_content">
        </div>
      </div>
      <div class="register-usercard"
           aspectratio>
        <div aspectratio-content>
          <input type="text"
                 placeholder="用户名/Username"
                 v-model="username">
          <span class="tips"
                v-show="usernameNotNull">用户名为空！</span>
        </div>
      </div>
      <div class="register-password"
           aspectratio>
        <div aspectratio-content>
          <input :type="loginPasswordType"
                 placeholder="密码/Password"
                 v-model="password">
          <i :class="['icon',iconEye]"
             @click="eyeOpen"></i>
          <span class="tips"
                v-show="passwordNotNull">密码为空！</span>
        </div>
      </div>
      <div class="register-password2"
           aspectratio>
        <div aspectratio-content>
          <input :type="loginPasswordType"
                 placeholder="密码/Password"
                 v-model="password2">
          <i :class="['icon',iconEye]"
             @click="eyeOpen"></i>
          <span class="tips"
                v-show="passwordDifferent">两次密码输入不一致！</span>
        </div>
      </div>
      <div class="login-button"
           aspectratio>
        <div aspectratio-content>
          <button @click="handleRegister">注册/Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      password2: '',
      usernameNotNull: false,
      passwordNotNull: false,
      passwordDifferent: false,
      iconEye: 'icon-close-eyes',
      loginPasswordType: 'password'
    }
  },
  methods: {
    eyeOpen () {

    },
    handleRegister () {
      alert('注册注册')
    }
  }
}
</script>

<style lang="less">
@import "../../styles/variables.less";
@import "../../styles/mixins.less";
@import "./register.less";
</style>
