<template>
  <div>

    <!-- Axios -->
    <h1> Axios</h1>
    <el-button @click="clickButton">调用本地接口</el-button>
    <br>
    {{ myInfo }}
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'axios',
  data() {
    return{
        myInfo: ''    // 我的信息
    }
  },
  methods: {
    /**
     * 点击按钮1
     */
    clickButton() {
      let _this = this;

        axios.post('http://localhost:8080/jyk/request/post',{
          jyk: "jyk"
        })
        .then(response => {
          _this.myInfo = response.data;
        })
        .catch(error => {
          alert(error);
        })
    },

    

  }
}
</script>