<template>
  <div>

    <!-- Axios -->
    <h1> Axios</h1>
    <el-button @click="clickPostButton">Axios Post</el-button>
    <el-button @click="clickGetButton">Axios Get</el-button>
    <br>
    Post result:{{ myPostInfo }}
    <br>
    Get result:{{ myGetInfo }}
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'axios',
  data() {
    return {
        myPostInfo: '',     // Post请求结果
        myGetInfo: '',       // Get请求结果
    }
  },
  methods: {
    /**
     * Post
     */
    clickPostButton() {
      let _this = this;
        axios.post('http://localhost:8080/jyk/request/post',{
          jyk: "jyk"
        })
        .then(response => {
          _this.myPostInfo = response.data;
        })
        .catch(error => {
          alert(error);
        })
    },

    /**
     * Get
     */
    clickGetButton() {
      let _this = this;
        axios.get('http://localhost:8080/jyk/request/get?str=djy',{
          jyk: "jyk"
        })
        .then(response => {
          _this.myGetInfo = response.data;
        })
        .catch(error => {
          alert(error);
        })
    },
  }
}
</script>