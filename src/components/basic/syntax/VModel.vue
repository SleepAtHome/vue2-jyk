<template>
  <div>

    <!-- v-model 表单输入绑定 -->
    <h1> v-model 表单输入绑定</h1>

    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="edit me" />
    
  </div>
</template>

<script>

export default {
  name: 'VModel',
  data() {
    return{
        message: '',
    }
  },
  methods: {
    /**
     * 点击按钮1
     */
    clickButton1() {
        alert("点击了按钮1");
    },

  }
}
</script>