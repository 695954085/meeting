<template>
  <div class="register">
    <x-header :left-options="{backText: ''}">注册</x-header>
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
                   placeholder="工号/EmployeeNo"
                   v-model="usercard">
            <span class="tips"
                  v-show="usercardNotNull">工号为空！</span>
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
                   placeholder="请再次输入密码/Password"
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
  </div>
</template>

<script>
import { register } from '@/api/'
import { vuxInfo } from '@/utils/alert.js'
export default {
  name: 'Register',
  data() {
    return {
      usercard: '',
      username: '',
      password: '',
      password2: '',
      usernameNotNull: false,
      usercardNotNull: false,
      passwordNotNull: false,
      passwordDifferent: false,
      iconEye: 'icon-close-eyes',
      loginPasswordType: 'password'
    }
  },
  methods: {
    eyeOpen() {
      if (this.loginPasswordType === 'password') {
        this.loginPasswordType = 'text'
      } else {
        this.loginPasswordType = 'password'
      }
    },
    async handleRegister() {
      console.log(this.usercard + this.username + this.password)
      if (
        this.usercard === '' ||
        this.usercard === '' ||
        this.username === ''
      ) {
        vuxInfo(this, '请完善后再提交~~')
        return;
      }
      if (this.password !== this.password2) {
        vuxInfo(this, '密码不一致~~')
        return;
      }
      let params = new URLSearchParams()
      params.append('usercard', this.usercard)
      params.append('username', this.username)
      params.append('password', this.password)
      let responseValue = await register(params)
      let { status, data } = responseValue
      if (status !== 200) {
        vuxInfo(this, '服务器异常')
      } else {
        if (data.status === 'fail') {
          vuxInfo(this, data.msg)
        } else {
          vuxInfo(this, '注册成功，现在去登录吧~~~')
          this.$router.push(`/`)
        }
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';
@import './register.less';
</style>
