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
      <div class="login-info-title"
           aspectratio>
        <div aspectratio-content>智慧办公管理系统</div>
      </div>
      <div aspectratio>
        <div aspectratio-content>
          <input type="text"
                 placeholder="工号/EmployeeNo"
                 id="loginUserName"
                 v-model="username">
        </div>
      </div>
      <div aspectratio>
        <div aspectratio-content>
          <input :type="loginPasswordType"
                 placeholder="密码/Password"
                 id="loginPassword"
                 v-model="password">
          <i :class="['icon',iconEye]"
             @click="eyeOpen"></i>
        </div>
      </div>
      <div><input type="checkbox"
               v-model="isRemember">
        <label>记住密码</label>
        <span>忘记密码？</span>
      </div>
      <div class="login-button"
           aspectratio>
        <div aspectratio-content>
          <button id="loginBtn"
                  @click="handleLogin">登录/Login</button>
        </div>
      </div>
      <div class="register-message"
           aspectratio>
        <div aspectratio-content>
          <span class="register-message-info">还没有账号？</span>
          <span class="register-message-to"
                @click="toRegister">立即注册</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/'
import { mapMutations } from 'vuex'
import { vuxInfo } from '@/utils/alert.js'
import Joi from 'joi'
import loginSchema from './login.schema'

export default {
  data() {
    return {
      username: '',
      password: '',
      iconEye: 'icon-close-eyes',
      loginPasswordType: 'password',
      isRemember: false
    }
  },
  methods: {
    ...mapMutations('meeting', ['setuser']),
    /**
     * 登录
     */
    async handleLogin() {
      const { error } = Joi.validate(
        {
          username: this.username,
          password: this.password
        },
        loginSchema
      )
      if (error && error.details.length >= 1) {
        const detail = error.details[0]
        const message = detail.message
        vuxInfo(this, message)
        return
      }
      let responseValue
      try {
        const params = new URLSearchParams()
        params.append('usercard', this.username)
        params.append('password', this.password)
        responseValue = await login(params)
      } catch (err) {
        vuxInfo(this, err)
        return
      }
      const { status, data } = responseValue
      if (status !== 200) {
        vuxInfo(this, '服务器异常')
      } else {
        if (data.status === 'success') {
          this.setuser(data.data)
          if (this.username === 'A0000') {
            this.$router.push(`/supermain`)
          } else {
            this.$router.push(`/main`)
          }
        } else {
          vuxInfo(this, data.msg)
        }
      }
    },
    toRegister() {
      this.$router.push(`/register`)
    },
    eyeOpen() {
      if (this.loginPasswordType === 'password') {
        this.loginPasswordType = 'text'
        this.iconEye = 'icon-eyes'
      } else {
        this.loginPasswordType = 'password'
        this.iconEye = 'icon-close-eyes'
      }
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';
@import './login.less';
</style>
