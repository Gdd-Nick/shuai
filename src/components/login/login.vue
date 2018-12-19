<template>
  <el-form :model="loginObj" label-position="top" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="loginObj.username" type="text" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="loginObj.password" type="password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="mybtn" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  export default {
    name: 'login',
    data: function () {
      return {
        loginObj: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      /*ES7提出两个关键字:async和await
      * 作用:将异步代码以同步的方式书写
      * */
      login: async function () {
        var res = await this.$http.post('login', this.loginObj)
        var {data, meta} = res.data;
        if (meta.status === 200) {
          //如果跳转成功,跳转到home页,并添加token到localStorage
          window.localStorage.setItem('token', data.token)
          this.$router.push('/')
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      }
    }
  }
</script>

<style scoped>
  .el-form {
    position: fixed;
    width: 500px;
    height: 300px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: #fff;
    padding: 40px;
  }

  .mybtn {
    width: 100%;
  }
</style>
