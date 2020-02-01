<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-button type="primary" @click="test()">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  const Qs = require('qs');
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      test() {
        let obj = {
          method: "方法",
          projectId: "85",
          appToken: "token的值",
          datasetId: " aaaaa"
        };
        Qs.stringify(obj);
        //console.log(Qs.stringify(obj));
        var objm = {
          "name": "runoob",
          "alexa": 10000,
          "site": "www.runoob.com"
        };
        var myJSON = JSON.stringify(objm);
        console.log(myJSON)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

</style>
