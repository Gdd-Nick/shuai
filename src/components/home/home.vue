<template>
  <el-container>
    <el-header>
      <!--既可以用双标签,也可以用单标签-->
      <!--<TOP></Top>-->
      <Top/>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <NavBar/>
      </el-aside>
      <el-main>
        <!--home设置一个router-view,用来显示其子组件-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // @代表src目录
  //导入Top组件,并注册为home组件的子组件
  import Top from '@/components/common/top.vue'
  //导入NavBar组件,并注册为home组件的子组件
  import NavBar from '@/components/common/navBar.vue'

  export default {
    name: 'home',
    components: {
      Top,
      NavBar
    },
    //当进入页面时需要验证是否存在token(是否已经登录过)
    created: function () {
      //尝试获取token
      var token = window.localStorage.getItem('token')
      //判断是否存在token,不存在就跳转到登录页
      if (!token) {
        this.$router.push(`/login`)
      }

    }
  }
</script>

<style scoped>
  .el-container {
    height: 100%;
  }

  .el-header {
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
    /*text-align: center;*/
    /*line-height: 160px;*/
  }
</style>
