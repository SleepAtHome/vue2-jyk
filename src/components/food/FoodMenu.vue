<template>
  <div>

    <h1> 家庭菜单 </h1>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="dishName"
        label="菜名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rawMaterial"
        label="原材料"
        width="180">
      </el-table-column>
      <el-table-column
        prop="seasoning"
        label="调料"
        width="180">
      </el-table-column>
      <el-table-column
        prop="chief"
        label="厨师">
      </el-table-column>
    </el-table>


    <div class="footer">DJYsb</div>
  </div>
</template>

<script>

export default {
  name: 'foodMenu',
  data() {
    return{
      tableData: [{
              dishName: '炒白菜',
              rawMaterial: '白菜',
              seasoning: '酱油/醋/糖/淀粉/干辣椒',
              chief: '景元奎'
          }]
    }
  },
  methods: {
    changeHaha() {
      this.useVif =! this.useVif;
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 10px;
}
</style>
