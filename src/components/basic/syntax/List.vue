<template>
  <div>

    <!-- v-for 列表渲染 -->
    <h1> v-for 列表渲染</h1>
    <ul>
        <!-- 使用 v-for 的同时需要添加绑定，即 v-bind:key="xxx" key相当于一个唯一键，使用id是可以的  -->
        <li v-for="item in nameItems" v-bind:key="item.id">{{ item.message }}</li>
    </ul>

    <el-input v-model="inputName" placeholder="请输入姓名"></el-input>
    <button @click="addItem">增加一个元素</button>
    <button @click="deleteOneItem">删除一个元素</button>

    
  </div>
</template>

<script>

export default {
  name: 'List',
  data() {
    return{
        // 名字列表
        nameItems: [
            {id: 1, message: "JYK"},
            {id: 2, message: "DJY"},
        ],
        idIndex:3, // id索引
        inputName: '', // 
    }
  },
  methods: {
    /**
     * 增加一个元素
     */
    addItem() {
        let temp = {
            id: this.idIndex,
            message: this.inputName,
        }
        this.nameItems.push(temp);
        this.idIndex = this.idIndex+1;
        this.inputName = '';
    },

    /**
     * 减少一个元素
     */
    deleteOneItem() {
        this.nameItems.pop();
        this.idIndex = this.idIndex-1;
    }
  }
}
</script>