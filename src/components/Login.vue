<template>
  <div>
    <div ref='vantaRef'>
      <!-- Foreground content here -->
    </div>
    <div class="jyk_login_title">景元奎</div>
    <div class="jyk_login_describe">Welcome to my system!</div>

    <div class="jyk_login_card_div">
      <el-card class="jyk_login_card">
        <el-form ref="loginForm" :model="loginForm" label-width="50px" >
          <el-form-item label="账号">
            <el-input v-model="loginForm.account"></el-input>
          </el-form-item>
          
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          
          <el-button type="primary" @click="loginSubmit">登录</el-button>
          <el-button>取消</el-button>

        </el-form>
      </el-card>

    </div>
    
  </div>
  

  
</template>

<script>
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.birds'
export default {
  mounted() {
    this.setScreenHeight();

    this.vantaEffect = BIRDS({
      el: this.$refs.vantaRef,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: this.screenHeight,
      minWidth: 200.00,
      maxWidth: this.screenWidth,
      scale: 1.00,
      scaleMobile: 1.00
    })
  },
  data(){
      return{
          screenHeight: 0,    // 屏幕高度
          screenWidth: 0,      // 屏幕宽度

          // 登录表单
          loginForm: {
            account: '',
            password: '',
          }
      }
  },

  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  },

  methods: {
    // 设置屏幕高度和宽度
    setScreenHeight() {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth
    },

    /**
     * 登录表单提交
     */
    loginSubmit () {
      if (this.loginForm.account == 'jyk' && this.loginForm.password == 'jyk') {
        this.$router.push('/jykIndex');
      }
      console.log(this.loginForm);
    }
  } 
}
</script>

<style lang="less" scoped>
.jyk_login_title {
  z-index: 999;
  position: fixed;
  top: 40%;
  left: 15%;
  color: white;
  font-size: 100px;
  font-weight: bolder;
}

.jyk_login_describe {
  z-index: 999;
  position: fixed;
  top: 60%;
  left: 15%;
  color: white;
  font-size: 40px;
  font-weight: bolder;
}

.jyk_login_card_div {
  position: fixed;
  top: 40%;
  left: 70%;

}

.jyk_login_card {
  width: 400px;
  height: 200px;
}

</style>
