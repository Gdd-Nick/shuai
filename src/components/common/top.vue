<template>
  <el-row>
    <el-col :span="6">
      <div class="grid-content bg-purple">logo</div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">center</div>
    </el-col>
    <el-col :span="6" style="text-align: right;">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="logout">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "top",
    methods: {
      //退出按钮功能实现
      logout: function () {
        //请出登录标记token
        window.localStorage.removeItem('token');
        //跳转回登录页
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>
