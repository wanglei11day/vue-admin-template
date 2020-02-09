<template>
  <div style="height:100%">
    <div class="search_wrap">
      <el-input class="normal" placeholder="请输入内容" v-model="filterText" :style="{ width: width }">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-tree :data="treeData" :props="treeProps" class="filter-tree" :node-key="nodeKey" @node-click="handleClick"
      :default-expanded-keys="expandedKeys" highlight-current :filter-node-method="filterNode"
      :expand-on-click-node="false" :style="{ width: width,height: height }" v-loading="loading">
      <span :class="['custom-tree-node',data.isParentCorp ? 'not_allowed' : '']" slot-scope="{ node, data }">
        <span>{{node.label}}</span>
      </span></el-tree>
  </div>
</template>

<script>
  export default {
    props: {
      nodeKey: {
        type: String,
        default: 'id'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: 'auto'
      }
    },
    data() {
      return {
        filterText: "",
        loading: false,
        treeData: [],
        treeProps: {
          label: 'corpName',
          children: 'children'
        },
        expandedKeys: [],
        tree_key: 0,
        curTreeId: ''
      }
    },
    methods: {
      handleQuery: function (data) {
        this.loading = true
        this.$api.dept.findDeptTree({
          parentCorpId: 0,
          permission: this.pagePermission
        }).then((res) => {
          
          this.loading = false
          if (res.code == 1000) {
            this.treeData = res.data
            
            this.getExpandedKeysByLevel(res.data, 0, this.expandedKeys, 1)
          } else {
            this.$message({
              message: '操作失败, ' + res.msg,
              type: 'error'
            })
          }
        }).then(data != null ? data.callback : '')
      },
       filterNode(value, data) {
        if (!value) return true
        return data[this.treeProps.label].indexOf(value) !== -1
      },
      handleClick: function (data, node, base) {
        if (data.isParentCorp) {
          this.tree_key++
          this.$nextTick(function () {
            this.$refs.tree.setCurrentKey(this.curTreeId)
            this.$refs.tree.filter(this.filterText)
          })
        } else {
          if (this.curTreeId !== data.id) {
            this.curTreeId = data.id
            // 按钮操作处理函数
            this.$emit('click', data, node, base)
          } else {
            this.checkClear()
            this.$emit('click', {
              id: '',
              corpId: ''
            }, node, base)
          }
        }
      },
       getExpandedKeysByLevel(data, level, arr, value) {
        let _this = this
        let _level = 0
        if (level !== undefined && level !== null) {
          _level = level + 1
        }
        data.forEach(item => {
          if (_level <= value) {
            arr.push(item.id)
            this.$set(item, 'expanded', true)
            if (item.children) {
              _this.getExpandedKeysByLevel(item.children, _level, arr, value)
            }
          }
        })
      }
    },
    mounted() {
      this.handleQuery()
    },
  }

</script>

<style lang='less' scoped>
 .filter-tree {
    .not_allowed {
      width: 100%;
      cursor: not-allowed;
      line-height: 26px;
    }
  }
 
</style>
