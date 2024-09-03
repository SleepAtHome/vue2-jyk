<template>
  <div>
    <h1>
        我的每日事项
        <el-button type="primary" @click="addCheckListDay">增加事项</el-button>
    </h1>

    <el-dialog
        title="增加事项"
        :visible.sync="addMatterDialogVisible"
        width="30%">

        <el-form :model="addMatterDialogForm">
            <el-form-item label="事项名称">
                <el-input v-model="addMatterDialogForm.matter" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="频率">
                <el-select v-model="addMatterDialogForm.frequency" placeholder="请选择事项每日频率">
                    <el-option label="1" value=1></el-option>
                    <el-option label="2" value=2></el-option>
                    <el-option label="3" value=3></el-option>
                    <el-option label="4" value=4></el-option>
                    <el-option label="5" value=5></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="addMatterDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitAddMatter">提交</el-button>
        </span>
    </el-dialog>
    
    
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
          <el-button size="small" type="danger" @click="deleteMatter(scope.row.id)">删除</el-button>
        </template>
        
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "myMatterPage",
  created() {
    this.checkLoginStatus();
  },
  mounted() {
    this.getMyDayChecklistInfo();
  },
  data() {
    return {
      myDayChecklist: [],    //  最终聚合结果
      addMatterDialogVisible: false, //  增加事项对话框是否显示
      addMatterDialogForm: {},  //  增加事项对话框表单数据
    };
  },
  methods: {
    checkLoginStatus() {
      //  检查是否登录
      console.log(JSON.parse(sessionStorage.getItem('onlineUserKey')).userId);
      if (JSON.parse(sessionStorage.getItem('onlineUserKey')).userId == null) {
        this.$message({
          message: "请先登录",
          type: "error",
          showClose: true,
        });
        this.$router.push('LoginPage');
      }
      
    },
    /**
     * 获取事项清单
     */
    getMyDayChecklistInfo() {
      let _this = this;
      let myDayChecklistInfoParam = {
        // 当前用户Id
        userId: JSON.parse(sessionStorage.getItem('onlineUserKey')).userId,
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
        // 清空表单
        this.addMatterDialogForm = {};

        this.addMatterDialogVisible = true;
    },

    submitAddMatter () {
        let _this = this;
        let addMatterParam = {
            userId: JSON.parse(sessionStorage.getItem('onlineUserKey')).userId,
            matter: this.addMatterDialogForm.matter,
            frequency: this.addMatterDialogForm.frequency,
        };

        axios.post("http://localhost:8080/jyk-total/check-list/add",addMatterParam).then((response) => {
            if (response.data.code == "S000") {
            _this.$message({
                message: "增加事项成功",
                type: "success",
                showClose: true,
            });

            this.myDayChecklist = [];
            this.getMyDayChecklistInfo();

            } else {
            _this.$message({
                message: "增加事项失败",
                type: "error",
                showClose: true,
            });
            }
        })
        .catch((error) => {
            _this.$message({
            message: "增加事项异常" + error,
            type: "error",
            showClose: true,
            });
        });

        // 关闭对话框
        this.addMatterDialogVisible = false;    
    },

    /**
     * 完成当前事项
     */
    deleteMatter(recordId) {
      for (let i=0;i<this.myDayChecklist.length;i++) {
        // 调用删除接口
        console.log(recordId);
      }

      // 刷新表格
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
