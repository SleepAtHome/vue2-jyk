<template>
  <div>
    <h1>
        我的每日事项
        <el-button type="primary" @click="addCheckListDay">增加事项</el-button>
    </h1>
    
    
    <el-table
      :data="myDayChecklist"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="matter" label="事项"> </el-table-column>
      <el-table-column prop="frequency" label="频率"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="finishOneThing(scope.row.id)">删除</el-button>
        </template>
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "myMatterPage",
  created() {},
  mounted() {
    this.getMyDayChecklistInfo();
  },
  data() {
    return {
      myDayChecklist: [],    //  最终聚合结果
    };
  },
  methods: {
    /**
     * 获取事项清单
     */
    getMyDayChecklistInfo() {
      let _this = this;
      let myDayChecklistInfoParam = {
        // 当前用户Id
        userId: sessionStorage.getItem('onlineUserKey').userId,
      };
      // 获取当前用户事项列表
      axios.post("http://localhost:8080/jyk-total/check-list/search-condition",myDayChecklistInfoParam)
        .then((response) => {
          if (response.data.code == "S000") {
            _this.myDayChecklist = response.data.data;
          } else {
            _this.$message({
              message: "获取当前用户事项列表 失败",
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((error) => {
          _this.$message({
            message: "获取当前用户事项列表 异常" + error,
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
        console.log(row);
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },

    addCheckListDay () {

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
      this.getMyDayChecklistInfo();
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
