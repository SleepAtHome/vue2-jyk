<template>
  <div>
    <h1>每日清单</h1>
    {{ this.$store.state.userInfo }}
    {{ allCheckList }}
    {{ userTodayThing }}
    <el-table
      :data="checklistData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "checklist",
  created() {},
  mounted() {
    this.getAllCheckListMapper();
  },
  data() {
    return {
      checklistData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],

      allCheckList: [],
      userTodayThing: [],
    };
  },
  methods: {
    /**
     * 获取所有事项清单
     */
    getAllCheckListMapper() {
      let _this = this;

      let getAllCheckListParam = {
        userId: this.$store.state.userInfo.userId,
      };

      // 获取当前用户事项列表
      axios
        .post(
          "http://localhost:8080/jyk-total/check-list/search-condition",
          getAllCheckListParam
        )
        .then((response) => {
          if (response.data.code == "S000") {
            _this.$message({
              message: "登录成功",
              type: "success",
              showClose: true,
            });
            _this.allCheckList = response.data.data;
          } else {
            _this.$message({
              message: "登录失败",
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((error) => {
          _this.$message({
            message: "登录异常" + error,
            type: "error",
            showClose: true,
          });
        });

      // 获取当前用户当天事项清单

      let getUserTodatThingParam = {
        userId: this.$store.state.userInfo.userId,
      };
      axios
        .post(
          "http://localhost:8080/jyk-total/check-list-record/search-today-condition",
          getUserTodatThingParam
        )
        .then((response) => {
          if (response.data.code == "S000") {
            _this.$message({
              message: "登录成功",
              type: "success",
              showClose: true,
            });
            _this.userTodayThing = response.data.data;
          } else {
            _this.$message({
              message: "登录失败",
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((error) => {
          _this.$message({
            message: "登录异常" + error,
            type: "error",
            showClose: true,
          });
        });
    },
    /**
     *
     */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
