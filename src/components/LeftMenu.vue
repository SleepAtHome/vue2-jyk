<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2E236C"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="jump2Page('JYKIndex')">
        <i class="el-icon-ice-cream-round"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="jump2Page('dishMenu')">
        <i class="el-icon-food"></i>
        <span slot="title">家庭菜单</span>
      </el-menu-item>



      <!-- <el-menu-item index="3" @click="jump2Page('checklistPage')">
        <i class="el-icon-food"></i>
        <span slot="title">每日清单</span>
      </el-menu-item> -->

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>每日清单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="jump2Page('checklistPage')">当天需要完成</el-menu-item>
          <el-menu-item index="3-2" @click="jump2Page('myMatterPage')">我的事项(天)</el-menu-item>
          <el-menu-item index="3-3">我的事项(月)</el-menu-item>
          <el-menu-item index="3-4">我的事项(年)</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="6" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    /**
     * 点击菜单时，发生跳转
     */
    jump2Page(val) {
      //if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
      //}
      // 禁止跳转本页面
      if (this.$route.name != val) {
        this.$router.push({ name: val });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 800px;
}
</style>
