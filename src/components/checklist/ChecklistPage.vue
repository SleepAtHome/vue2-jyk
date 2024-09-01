<template>
  <div>
    <h1>每日清单</h1>
    <!-- {{ this.$store.state.userInfo }} -->
    <!-- {{ allCheckList }} -->
    <!-- {{ userTodayThing }} -->
    <el-button type="primary" @click="refreshCheckList">手动刷新事项列表</el-button>
    <el-table
      :data="checklistData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="recordId" label="事项ID"> </el-table-column>
      <el-table-column prop="userId" label="用户ID"> </el-table-column>
      <el-table-column prop="matterName" label="事项"> </el-table-column>
      <el-table-column prop="finished" label="是否完成"> </el-table-column>
      <el-table-column prop="memo" label="备注"> </el-table-column>
      <el-table-column label="事项开始时间">
        <template slot-scope="scope">
          <!-- 处理时间格式，formatTimestamp为全局处理时间格式方法 -->
          {{ scope.row.matterStartTime | formatTimestamp }}
        </template>
      </el-table-column>
      <el-table-column label="事项完成时间">
        <template slot-scope="scope">
          <!-- 处理时间格式，formatTimestamp为全局处理时间格式方法 -->
          {{ scope.row.matterFinishTime | formatTimestamp }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="finishOneThing(scope.row.recordId)">完成</el-button>
        </template>
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { sleep } from "../../js/utils";

export default {
  name: "checklistPage",
  created() {},
  mounted() {
    this.getAllCheckListMapper();
  },
  data() {
    return {
      allCheckList: [],
      userTodayThing: [],
      checklistData: [],    //  最终聚合结果
    };
  },
  methods: {
    /**
     * 获取事项清单 非异步
     */
    async getAllCheckListMapper() {
      let _this = this;

      let getAllCheckListParam = {
        userId: JSON.parse(sessionStorage.getItem('onlineUserKey')).userId,
        // userId: this.$store.state.userInfo.userId,
      };

      // 获取当前用户事项列表
      axios
        .post(
          "http://localhost:8080/jyk-total/check-list/search-condition",
          getAllCheckListParam
        )
        .then((response) => {
          if (response.data.code == "S000") {
            _this.allCheckList = response.data.data;

          } else {
            _this.$message({
              message: "获取当前用户事项 失败"+ response.data,
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((error) => {
          _this.$message({
            message: "获取当前用户事项 异常" + error,
            type: "error",
            showClose: true,
          });
        });

      await sleep(500);

      // 获取当前用户当天事项清单
      let getUserTodatThingParam = {
        userId: JSON.parse(sessionStorage.getItem('onlineUserKey')).userId,
        // userId: this.$store.state.userInfo.userId,
      };
      axios
        .post(
          "http://localhost:8080/jyk-total/check-list-record/search-today-condition",
          getUserTodatThingParam
        )
        .then((response) => {
          if (response.data.code == "S000") {
            
            _this.userTodayThing = response.data.data;
          } else {
            _this.$message({
              message: "获取当前用户当天事项清单 失败",
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((error) => {
          _this.$message({
            message: "获取当前用户当天事项清单 异常" + error,
            type: "error",
            showClose: true,
          });
        });

        await sleep(500);

        // 聚合结果
        for (let i=0;i<this.userTodayThing.length;i++) {
          
          let metterName = '';
          for (let j=0;j<this.allCheckList.length;j++) {
            if (this.userTodayThing[i].matterId == this.allCheckList[j].id) {
              metterName = this.allCheckList[j].matter;
            }
          }



          let data = {
            recordId: this.userTodayThing[i].id,
            userId: this.userTodayThing[i].userId,
            matterName: metterName,
            finished: this.userTodayThing[i].finished == 1 ? '已完成': '未完成',
            memo: this.userTodayThing[i].memo,
            matterStartTime: this.userTodayThing[i].matterStartTime,
            matterFinishTime: this.userTodayThing[i].matterFinishTime,
          }
          

          this.checklistData.push(data); 
        }
    },

    /**
     * 手动刷新事项列表
     */
    refreshCheckList() {
      let _this = this;
      let refreshParam = {
            userId: JSON.parse(sessionStorage.getItem('onlineUserKey')).userId,
      };

      axios.post("http://localhost:8080/jyk-total/check-list-record/manually-generated",refreshParam)
            .then((response) => {
              if (response.data.code == "S000") {
                _this.$message({
                  message: "手动刷新创建任务 成功",
                  type: "success",
                  showClose: true,
                });
              } else {
                _this.$message({
                  message: "手动刷新创建任务 失败",
                  type: "error",
                  showClose: true,
                });
              }
            })
            .catch((error) => {
              _this.$message({
                message: "手动刷新创建任务 异常" + error,
                type: "error",
                showClose: true,
              });
            });

      // 刷新表格
      this.checklistData = [];
      this.getAllCheckListMapper();
    },
    /**
     * 
     */
    tableRowClassName({ row, rowIndex }) {
      console.log(rowIndex)
      if (row.finished == '已完成') {
        return "success-row";
      } else if (row.finished == '未完成') {
        return "warning-row";
      }
      
      return "";
    },

    /**
     * 完成当前事项
     */
    finishOneThing(recordId) {
      let _this = this;
      for (let i=0;i<this.checklistData.length;i++) {
        // 如果为当前行，调用结束接口
        
        if (this.checklistData[i].recordId == recordId) {
          
          let finishParam = {
            id: this.checklistData[i].recordId,
            finished: 1,
            // memo
            updateBy: this.checklistData[i].userId,
          };
          axios
            .post(
              "http://localhost:8080/jyk-total/check-list-record/finish",
              finishParam
            )
            .then((response) => {
              if (response.data.code == "S000") {
                _this.$message({
                  message: "完成成功",
                  type: "success",
                  showClose: true,
                });
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
        }
      }

      // 刷新表格
      this.checklistData = [];
      this.getAllCheckListMapper();
    }
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
