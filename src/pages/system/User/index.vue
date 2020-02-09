<template>
  <page>
    <div slot="aside">
      <el-tabs type="card" v-model="activeName">
        <div class="cover-all" v-if="cover"></div>
        <el-tab-pane label="输气处" :name="type.InUnit">
          <unit-tree :width="'100%'" @click="handleInUnitClick"></unit-tree>
        </el-tab-pane>
        <el-tab-pane label="临时学员" :name="type.OutUnit">
          <!-- <out-unit-tree :width="'100%'" @click="handleOutUnitClick"></out-unit-tree> -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <div slot="toolbar">
      <el-form :inline="true" :model="filters">
        <el-form-item label="姓名：">
          <el-input class="normal" placeholder="请输入姓名" v-model="filters.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="登录名：">
          <el-input class="normal" placeholder="请输入登录名" v-model="filters.account" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="filters.status" class="normal" clearable>
            <el-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleQuery">查询</el-button>
          <el-button v-if="activeName==type.OutUnit" type="primary" @click="handleAdd">新增
          </el-button>
          <el-button type="success" v-if="activeName!==type.OutUnit">更新</el-button>
          <el-button v-if="activeName==type.OutUnit" type="success">导入</el-button>
          <el-button type="primary" :loading="exportLoading">导出
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="content">
      <el-table :data="pageResult" stripe style="width:100%" element-loading-text="读取中" v-loading="loading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :key="column.prop"
          :width="column.width" :show-overflow-tooltip="column.showToolTip" :align="column.align"></el-table-column>
        <template v-if="activeName=='1'">
          <!-- 员工编号 -->
          <el-table-column label="员工编号" prop="userNo" width="80" align="center">
          </el-table-column>
          <!-- 单位名称 -->
          <el-table-column label="单位名称" prop="corpName" show-overflow-tooltip width="180" align="center">
          </el-table-column>
        </template>
        <template v-if="activeName=='2'">
          <!-- 单位名称 -->
          <el-table-column label="临时分组" prop="corpName" show-overflow-tooltip width="80" align="center">
          </el-table-column>
          <!-- 用户单位 -->
          <el-table-column label="有效期" prop="validTime" show-overflow-tooltip width="80" align="center">
          </el-table-column>
          <!-- 有效期 -->
          <el-table-column label="用户单位" prop="description" show-overflow-tooltip width="80" align="center">
          </el-table-column>
        </template>
        <!-- 用户类型 -->
        <el-table-column label="用户类型" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.type==1?'内部用户':'外部用户'}}</span>
          </template>
        </el-table-column>
        <!-- 用户状态 -->
        <el-table-column label="用户状态" align="center" prop="status" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column width="320">
          <template slot-scope="scope" >

            <el-button type="primary" @click="handleEdit(scope.row)"  >编辑
            </el-button>
            <el-button type="info" @click="handleRole(scope.row)">设置角色
            </el-button>
            <el-button :type="scope.row.status==2?'prmary':'danger'" @click="handleStatus(scope.row)">
              {{scope.row.status==2?'启用':'禁用'}}</el-button>
            <el-button type="danger" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer">
        <!-- 批量删除 -->
        <el-button :disabled="selections.length === 0" type="danger"
          style="float:left" @click="batchDelete">批量删除</el-button>
        <el-pagination layout="total, prev, pager, next, jumper" @current-change="refreshPageRequest"
          :current-page="pageRequest.page" :page-size="pageRequest.pageSize" :total="totalSize" style="float:right;">
        </el-pagination>
      </div>
  </page>
</template>

<script>
  export default {
    data() {
      return {
        activeName: "1",
        type: {
          InUnit: '1',
          OutUnit: '2'
        },
        filters: {
          username: "",
          status: "", //状态：0.全部;1.正常；2.禁用
          type: 1, //1.内部用户；2.临时学员用户
          corpId: "",
          roleId: "",
          account: ""
        },
        statusOption: [{
            id: 0,
            label: "全部",
            name: "ALL"
          },
          {
            id: 1,
            label: "正常",
            name: "USABLE"
          },
          {
            id: 2,
            label: "禁用",
            name: "DISABLED"
          }
        ],
         totalSize: 0,
        pageRequest: {
          page: 1,
          pageSize: 12
        },
        cover: false,
          selections: [],
        dialogVisibleUploadInUnit: false, //内部导入用户
        loading: false,
        columns: [{
            prop: "account",
            label: "登录名",
            width: 70,
            showToolTip: true
          },
          {
            prop: "username",
            label: "姓名",
            width: 70,
            align: 'center'
          },
          {
            prop: "headship",
            label: "职位",
            width: 100,
            showToolTip: true
          },
          {
            prop: "email",
            label: "邮箱",
            width: 180,
            showToolTip: true
          },
          {
            prop: "mobile",
            label: "电话",
            width: 120
          }
        ],
        exportLoading: false,
        pageResult: [],

      }
    },
    methods: {
      handleInUnitClick(data) {

        this.filters.corpId = data.corpId || ''
        this.pageRequest.page = 1
        this.handleQuery()
      },
       refreshPageRequest(page) {
        this.pageRequest.page = page;
        this.handleQuery()
      },
      handleOutUnitClick(data) {
        this.filters.corpId = data.id
        this.pageRequest.page = 1
        this.handleQuery()
      },
      handleRefresh() {
        this.$confirm('更新用户大概需要两分钟，请耐心等待！', '更新用户', 'warning').then(() => {
          this.dialogVisibleUploadInUnit = true;
        });
      },
      handleSelectionChange(val) {
        this.selections = val;
      },
      handleQuery() {
        this.loading = true;
        this.pageRequest = Object.assign(this.pageRequest, this.filters)
        this.$api.user.getList(this.pageRequest).then((res) => {
          this.loading = false
          if (res.code == 1000) {
            this.pageResult = res.data.list;
            this.pageResult.map(item => {
              if (item.type == 2) {
                item.validTime = (item.validStartTime ? item.validStartTime.slice(0, 10) : '') + '~' + (item
                  .validEndTime ? item.validEndTime.slice(0, 10) : '')
              } else {
                item.validTime = ''
              }
              return item
            })
            this.totalSize = res.data.count;
          } else {
            this.pageResult = [];
            this.totalSize = 0;
            if (res.code !== 1003) {
              this.$message.error('请求出错，' + res.msg)
            }
          }
        })
      },
      batchDelete(){

      },
    },
    mounted() {
      this.handleQuery()
    },

  }

</script>

<style lang="less" scoped>
  .cover-all {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000000;
  }

</style>
<style>
 .el-form-item__label {
    height: 32px;
    line-height: 32px;
    margin-bottom: 0;
  }
  .el-input--suffix .el-input__inner {
    padding-right: 30px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 0;
}
 .el-button{
      padding: 9px 15px;
      font-size: 12px;
    border-radius: 3px;

}
</style>