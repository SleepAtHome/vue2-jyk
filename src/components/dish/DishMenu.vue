<template>
  <div>
    <el-header><h1>家庭菜单</h1></el-header>
      <el-container>
        <el-aside width="200px">
          <el-input
            placeholder="请输入菜名"
            v-model="dishnameInput"
            clearable>
          </el-input>
          <el-button type="success" plain @click="refreshDishMenu(dishnameInput)">搜索</el-button>
          <el-button type="primary" plain @click="openAddDishDialog">增加菜品</el-button>
          
          
        </el-aside>

        <el-container>
          <el-main>
            <el-table
              :data="dishMenuList"
              style="width: 100%">
              <el-table-column
                prop="dishName"
                label="菜名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="food"
                label="食材"
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
              <el-table-column
                prop="price"
                label="价格(元)">
              </el-table-column>
              <el-table-column
                prop="updateBy"
                label="updateBy">
              </el-table-column>
              <el-table-column
                prop="updateTime"
                label="updateTime">
              </el-table-column>
              <el-table-column
                label="上传图片"
              >
              <template slot-scope="scope">
                <el-upload
                  class="upload-demo"
                  action="http://localhost:8080/jyk-total/dish/upload-file?"
                  :data=scope.row
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="uploadFileList">
                  <el-button size="small" type="primary">上传菜品图片</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
              </template>
                
              </el-table-column>
            </el-table>
          </el-main>
          <el-footer>DJYsb</el-footer>
        </el-container>
      </el-container>
      <el-dialog
        title="增加菜品"
        :visible.sync="addDishDialogVisible"
        width="60%"
        class="addDishDialogClass">
        <el-form :model="addDishForm">
          <el-form-item label="菜品名称" required>
            <el-input v-model="addDishForm.dishName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="食材" required>
            <el-select v-model="addDishForm.foodList" multiple placeholder="请选择食材" style="width: 100%;">
              <el-option
                v-for="item in foodList"
                :key="item.id"
                :label="item.foodName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调料" required>
            <el-select v-model="addDishForm.seasoningList" multiple placeholder="请选择调料" style="width: 100%;">
              <el-option
                v-for="item in seasoningList"
                :key="item.id"
                :label="item.seasoningName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="厨师" required>
            <!-- 如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的size属性，直接为这个表单项或表单组件设置自己的size即可 -->
            <el-select v-model="addDishForm.chief" placeholder="请选择厨师" style="width: 100%;">
              <el-option label="景元奎" value="Jing yk"></el-option>
              <el-option label="戴君雅" value="Dai jy"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="价格" required>
            <el-input v-model="addDishForm.price" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDishDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDish">确 定</el-button>
      </span>
    </el-dialog>

    <div class="footer"></div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'dishMenu',
  mounted () {
    this.refreshInfo([1,2]);
  }, 
  data() {
    return{
      dishMenuList: [], // 菜单List
      foodList: [], // 食材List
      seasoningList: [], // 调料List
      dishnameInput: '', // 菜名搜索框

      // 增加菜品对话框
      addDishDialogVisible: false,  // 增加菜品对话框-默认关闭
      // 增加菜品表单
      addDishForm: {
          dishName: '',
          foodList: [],
          seasoningList: [],
          chief: '',
          price: 0,
      },

      choosedSeasoning: [], // 选中的调料
      uploadFileList: [],   // 上传文件列表
    }
  },
  methods: {
    /**
     * 刷新信息
     */
    refreshInfo (intArr) {
      let _this = this;

      for (let i=0; i<intArr.length; i++) {
        // 刷新菜单
        if (intArr[i] == 1) {
          axios.post('http://localhost:8080/jyk-total/dish/search-all',{})
            .then(response => {
              if (response.data.code == 'S000') {
                let respData = response.data.data;
                _this.dishMenuList = respData;
                this.$message({message: '成功获取菜单', type: 'success', showClose: true});}
            })
            .catch(error => {
              this.$message({message: '获取菜单异常'+error, type: 'error', showClose: true});
            })
        }

        // 刷新食材
        if (intArr[i] == 2) {
          axios.post('http://localhost:8080/jyk-total/food/search-all',{})
            .then(response => {
              if (response.data.code == 'S000') {
                let respData = response.data.data;
                _this.foodList = respData;
                this.$message({message: '成功获取食材', type: 'success', showClose: true});}
            })
            .catch(error => {
              this.$message({message: '获取食材异常'+error, type: 'error', showClose: true});
            })
        }

        // 刷新调料
        if (intArr[i] == 3) {
          axios.post('http://localhost:8080/jyk-total/seasoning/search-all',{})
            .then(response => {
              if (response.data.code == 'S000') {
                let respData = response.data.data;
                _this.seasoningList = respData;
                this.$message({message: '成功获取调料', type: 'success', showClose: true});}
            })
            .catch(error => {
              this.$message({message: '获取调料异常'+error, type: 'error', showClose: true});
            })
        }

      }

    },
    /**
     * 刷新菜单
     * val : 传入菜名查询，传空为查询全部
     */
    refreshDishMenu (val) {
      let _this = this;
      if (!val) {
        
      }
      let dishParam = {
        dishName: val,
      }
      axios.post('http://localhost:8080/jyk-total/dish/search', dishParam)
      .then(response => {
        if (response.data.code == 'S000') {
          let respData = response.data.data;
          _this.dishMenuList = respData;
        }
      })
      .catch(error => {
        alert(error);
      })
    },
    /**
     * 打开增加菜品对话框
     */
    openAddDishDialog() {
      
      this.addDishForm = [];  // 清空原有表单数据
      this.foodList = [], // 清空食材List
      this.seasoningList = [], // 清空调料List
      this.refreshInfo([2,3]);  // 刷新食材和调料信息
      this.addDishDialogVisible = true;
    },
    /**
     * 
     */
    handlePreview(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    /**
     * 增加菜品
     */
    addDish() {
      // 清空原有数据
      this.dishMenuList = [];

      // 增加菜品接口
      let _this = this;
      let dishParam = {
        dishName: this.addDishForm.dishName,
        foodList: this.addDishForm.foodList,
        seasoningList: this.addDishForm.seasoningList,
        chief: this.addDishForm.chief,
        price: this.addDishForm.price,
      }
      axios.post('http://localhost:8080/jyk-total/dish/add', dishParam)
      .then(response => {
        if (response.data.code == 'S000') {
          alert('增加菜品成功');
        }
      })
      .catch(error => {
        alert(error);
      })

      // 刷新菜单列表
      this.refreshDishMenu();
      this.addDishDialogVisible = false;
    },
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
