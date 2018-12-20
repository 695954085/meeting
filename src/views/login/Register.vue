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
          </div>
        </div>
        <div class="register-usercard"
             aspectratio>
          <div aspectratio-content>
            <input type="text"
                   placeholder="用户名/Username"
                   v-model="username">
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
          </div>
        </div>
        <div class="register-password2"
             aspectratio>
          <div aspectratio-content>
            <input :type="loginPasswordType"
                   placeholder="请再次输入密码/Password"
                   v-model="confirmPassword">
            <i :class="['icon',iconEye]"
               @click="eyeOpen"></i>
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
import registerSchema from './register.schema'
import Joi from 'joi'

export default {
  name: 'Register',
  data() {
    return {
      usercard: '',
      username: '',
      password: '',
      confirmPassword: '',
      iconEye: 'icon-close-eyes',
      loginPasswordType: 'password'
    }
  },
  methods: {
    eyeOpen() {
      if (this.loginPasswordType === 'password') {
        this.loginPasswordType = 'text'
        this.iconEye = 'icon-eyes'
      } else {
        this.loginPasswordType = 'password'
        this.iconEye = 'icon-close-eyes'
      }
    },
    async handleRegister() {
      const { error } = Joi.validate(
        {
          usercard: this.usercard,
          password: this.password,
          confirmPassword: this.confirmPassword,
          username: this.username
        },
        registerSchema
      )
      if (error && error.details.length >= 1) {
        const message = error.details[0].message
        vuxInfo(this, message)
        return
      }
      let responseValue
      try {
        const params = new URLSearchParams()
        params.append('usercard', this.usercard)
        params.append('username', this.username)
        params.append('password', this.password)
        responseValue = await register(params)
      } catch (err) {
        vuxInfo(this, err)
        return
      }
      let { status, data } = responseValue
      if (status !== 200) {
        vuxInfo(this, '服务器异常')
      } else {
        if (data.status === 'fail') {
          vuxInfo(this, data.msg)
        } else {
          vuxInfo(this, data.msg, () => {
            this.$router.push(`/`)
          })
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
