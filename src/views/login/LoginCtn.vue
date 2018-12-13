<template>
  <div class="login-ctn">
    <div class="login-info-ctn"
         v-if='loginMode === "key"'>
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
                 placeholder="用户名/Username"
                 id="loginUserName"
                 v-model="username">
          <span class="tips"
                v-show="usernameNotNull">用户名为空！</span>
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
          <span class="tips"
                v-show="passwordNotNull">密码为空！</span>
        </div>
      </div>
      <div><input type="checkbox">
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
      <!--
      <div class="face-swiping-assist"
           aspectratio
           @click="loginMode = 'face'">
        <div aspectratio-content>
          <i class="icon icon-face"></i>
          <div class="ignore">刷脸登录</div>
        </div>
      </div> -->
      <div class="register-message"
           aspectratio>
        <div aspectratio-content>
          <span class="register-message-info">还没有账号？</span>
          <span class="register-message-to"
                @click="toRegister">立即注册</span>
        </div>
      </div>
    </div>
    <!-- <div class="face-swiping-ctn"
         v-else-if='loginMode === "face"'
         ref="faceswipingctnRef">
      <span class="face__info"
            ref="faceInfo">正在刷脸，别走开</span>
      <div id="video"
           ref="videoRef"
           aspectratio></div>
    </div>
    <div class="login-fail-ctn"
         v-else
         aspectratio>
      <div aspectratio-content>
        <div class="login-fail-ctt">
          <div class="fail-title">
            <i class="icon icon-fail"></i>登录失败</div>
          <div class="fail-detail-ctn">{{failMessage}}</div>
          <div class="fail-operations-ctn">
            <div class="reLogin-div"
                 aspectratio>
              <div aspectratio-content>
                <button id="reLogin"
                        class="reLogin"
                        @click="loginMode = 'face'">重新登录</button>
              </div>
            </div>
            <div class="quitLogin-div"
                 aspectratio>
              <div aspectratio-content>
                <button id="quitLogin"
                        class="quitLogin"
                        @click="quit()">退出登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { login } from '@/api/'
import { mapMutations } from 'vuex'
import { vuxInfo } from '@/utils/alert.js'
export default {
  data() {
    return {
      loginMode: 'key',
      username: '',
      password: '',
      usernameNotNull: false,
      passwordNotNull: false,
      iconEye: 'icon-close-eyes',
      loginPasswordType: 'password'
    }
  },
  methods: {
    ...mapMutations(['setusercard']),
    async handleLogin() {
      let params = new URLSearchParams()
      params.append('usercard', this.username)
      params.append('password', this.password)
      let responseValue = await login(params)
      let { status, data } = responseValue
      if (status !== 200) {
        vuxInfo(this, '服务器异常')
      } else {
        if (data === 'success') {
          this.setusercard(this.username)
          if (this.username === 'A0000') {
            this.$router.push(`/supermain`)
          } else {
            this.$router.push(`/main`)
          }
        } else {
          vuxInfo(this, '登录失败，重新校验')
        }
      }
      // this.$router.push(`/main`)
    },
    toRegister() {
      this.$router.push(`/register`)
    },
    eyeOpen() {}
  }
}
</script>

<style lang="less">
@import '../../styles/variables.less';
@import '../../styles/mixins.less';
@import './login.less';
</style>
