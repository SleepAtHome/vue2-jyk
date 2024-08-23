<template>
  <div>
    <div ref='vantaRef'>
      <!-- Foreground content here -->
    </div>
    <div class="jyk_login_title">景元奎</div>
    <div class="jyk_login_describe">Welcome to my system!</div>

    <div class="jyk_login_card_div">
      <el-card class="jyk_login_card">
        <el-form ref="loginForm" :model="loginForm" label-width="50px" @keyup.native.enter="loginSubmit" >
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
import JSEncrypt from 'jsencrypt'; // 加解密工具
import axios from 'axios';

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
      let _this = this;
      let loginParam = {
        account: this.loginForm.account,
        password: this.encrypt(this.loginForm.password),
      }

      axios.post('http://localhost:8080/jyk-total/user/login',loginParam)
        .then(response => {
          if (response.data.code == 'S000') {
            _this.$message({message: '登录成功', type: 'success', showClose: true});
            // 往Vuex中写入登录用户信息
            let loginInfo = {
              userName: response.data.data.userName,
              userId: response.data.data.userId
            }
            _this.$store.commit('updateUserInfo', loginInfo);

            // 路由跳转
            _this.$router.push('/jykIndex');
          } else {
            _this.$message({message: '登录失败', type: 'error', showClose: true});
          }
        })
        .catch(error => {
          _this.$message({message: '登录异常'+error, type: 'error', showClose: true});
        })

    },

    // 加密
    encrypt(txt) {
            const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRfxdKBzBl5BD/bHQ6VlRNx/FoM+CYB7y3Oeh2EO4H7xSNoLOKhedVEsueqCzIgtPu2r2lR/HQ9B8elOgbNAC7LliWRNE9jN3YubrIGKzPAuiN1Z54sOtFl6/+bQ6IkeVlzncQCurtkR5WVn88vPIFg5e1GhTIN7RF4ut5nnvf5wIDAQAB"

        const encryptor = new JSEncrypt()
        encryptor.setPublicKey(publicKey) // 设置公钥
        return encryptor.encrypt(txt) // 对需要加密的数据进行加密
    },
    // 解密
    decrypt(txt) {
        // const encryptor = new JSEncrypt()
        // encryptor.setPrivateKey(privateKey)
        // return encryptor.decrypt(txt)
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
