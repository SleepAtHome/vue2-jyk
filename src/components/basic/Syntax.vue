<template>
  <div>

    <!-- v-if 条件渲染 -->
    <h1> v-if 条件渲染</h1>
    <h3 v-if="useVif"> JYKxixi </h3>
    <h3 v-else> JYKnoXixi </h3>
    <button @click="changeHaha">change v-if</button>
    <!-- <h1> hahaJYK </h1> -->

    <!-- 连续判断 -->
    <h3 v-if="ifType==='A'"> JYK-type-A </h3>
    <h3 v-else-if="ifType==='B'"> JYK-type-B </h3>
    <h3 v-else-if="ifType==='C'"> JYK-type-C </h3>
    <h3 v-else> JYK-type-Not A/B/C </h3>
    <el-input v-model="ifType" placeholder="请输入A或B或C或其他"></el-input>

    
  </div>
</template>

<script>

export default {
  name: 'Syntax',
  data() {
    return{
      useVif: true,   // v-if是否显示
      ifType: ''     // v-if连续判断
    }
  },
  methods: {
    /**
     * 改变v-if的值
     */
    changeHaha() {
      this.useVif =! this.useVif;
    }
  }
}
</script>