<template>
  <div>

    <!-- v-on 事件处理 -->
    <h1> v-on 事件处理</h1>
    <el-button v-on:click="clickButton1">按钮1</el-button>

    <button @mouseenter="mouseEnterButton2" @mouseleave="mouseLeaveButton2">按钮2 简写</button>
    <br>
    {{ message2 }}

    <br>
    <!-- 如果使用 Element UI 的 el-button 组件且没有加上 .native 修饰符，那么事件可能不会触发，因为 .native 修饰符是用来在 Vue 组件上监听原生事件的。 -->
    <el-button @mouseenter.native="mouseEnterButton3" @mouseleave.native="mouseLeaveButton3">按钮3</el-button>
    <br>
    {{ message3 }}
    
  </div>
</template>

<script>

export default {
  name: 'List',
  data() {
    return{
        message2: '', // 页面提示
        message3: '', // 页面提示
    }
  },
  methods: {
    /**
     * 点击按钮1
     */
    clickButton1() {
        alert("点击了按钮1");
    },

    /**
     * 鼠标移动到按钮2
     */
    mouseEnterButton2() {
        this.message2 = '鼠标移动到了按钮2上';
    },
    /**
     * 鼠标离开了按钮2
     */
    mouseLeaveButton2() {
        this.message2 = '鼠标离开了按钮2';
    },

    /**
     * 鼠标移动到按钮3
     */
    mouseEnterButton3() {
        this.message3 = '鼠标移动到了按钮3上';
    },
    /**
     * 鼠标离开了按钮3
     */
    mouseLeaveButton3() {
        this.message3 = '鼠标离开了按钮3';
    },

  }
}
</script>