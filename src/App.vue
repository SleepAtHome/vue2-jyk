<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to JYK Vue.js App"/> -->

    <!-- 网站色调：#17153B #2E236C #433D8B #C8ACD6-->
    <!-- 整体布局 -->
    <el-container>
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
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue'

export default {
  name: 'App',
  components: {
    LeftMenu
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
</style>
