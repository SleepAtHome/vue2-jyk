<template>
  <div>
    <h1> 景元奎的主页 </h1>

    菜单页：
    <el-button type="success" @click="jump2DishMenu" round>Dish Menu</el-button>
    <br>

    语法等：
    <!-- 路由的第2种方式：router-link -->
    <router-link to="/syntax/if"> v-if 用法</router-link>
    <br>
    <el-button type="primary" @click="jump2AnyPage('If')" round>v-if 用法</el-button>
    <el-button type="info" @click="jump2AnyPage('List')" round>v-for 用法</el-button>
    
  </div>
</template>

<script>

export default {
  name: 'JYKIndex',
  data() {
    return{
    }
  },
  methods: {
    /**
     * 路由的第一种方式：this.$router.push
     */
    jump2DishMenu() {
      this.$router.push({name: 'dishMenu'});
    },

    /**
     * 跳转去任何页面：入参: 页面name
     */
    jump2AnyPage(val) {
      this.$router.push({name: val});
    }
  }
}
</script>