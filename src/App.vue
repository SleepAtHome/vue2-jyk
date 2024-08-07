<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to JYK Vue.js App"/> -->

    <!-- 网站色调：#17153B #2E236C #433D8B #C8ACD6-->
    <!-- 整体布局 -->
    <el-container v-show="!(path ==='/')">
      <el-header class="jyk_header">
        <h1 class="jyk_header_h">欢迎来到景元奎的系统！</h1>
      </el-header>
      
      <el-container>
        <el-aside width="200px">
          <LeftMenu></LeftMenu>
        </el-aside>
        <el-main class="jyk_el_main">
          <router-view></router-view>
        </el-main>
      </el-container>
      <!-- <el-footer>DJYsb</el-footer> -->
    </el-container>

    <!-- 专为登录页设置 -->
    <div v-show="path ==='/'"  :style="{ height: screenHeight + 'px' }">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue'

export default {
  name: 'App',
  components: {
    LeftMenu
  },
  data(){
      return{
          path:'',
          screenHeight: 0
      }
  },
  mounted() {
    // 加载当前路径
    this.path = this.$route.path;
    // console.log(this.$route.path)
    this.setScreenHeight();
  },
  watch:{
      $route(to,from){
          this.path = to.path
      }
  },
  methods: {
    setScreenHeight() {
      this.screenHeight = window.innerHeight;
    }
  }
  
}
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.jyk_header {
  background-color: #17153B;
  color: wheat;

/* 垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center; 
}

.jyk_header_h {
  margin-top: 0%;
  margin-bottom: 0%;
}

.jyk_el_main {
  padding: 0%;
}

.jyk_login {
  height: 100%;
}
</style>
