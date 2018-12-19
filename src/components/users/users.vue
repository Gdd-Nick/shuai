<template>
  <el-card>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索区域-->
    <el-input v-model="query" placeholder="请输入搜索内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!--添加用户按钮-->
    <el-button type="success" plain @click="showAdd = true">添加用户</el-button>
    <!--表格区域(用户列表)-->
    <el-table :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱" width="120"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column property="scope.row.mg_state" label="用户状态">
        <!--scope获取当前行的数据源对象-->
        <template slot-scope="scope">
          <!--{{scope.row.mg_state}}-->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
                     @change="changeState(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--编辑按钮-->
          <el-button type="primary" icon="el-icon-edit" plain size="mini"
                     @click="getEditData(scope.row.id)"></el-button>
          <!--删除按钮-->
          <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="delData(scope.row.id)"></el-button>
          <!--分配权限按钮-->
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="getRole(scope.row)"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--分页区域-->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="pageNum"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>

    <!--新增面板-->
    <!--
      el-dialog:对话框组件
      title：标题
      visible.sync="bool" 控制显示与隐藏
    -->
    <el-dialog title="新增用户" :visible.sync="showAdd">
      <el-form :model="addForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAdd = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑面板-->
    <el-dialog title="编辑用户" :visible.sync="showEdit">
      <el-form :model="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="postEditData">确 定</el-button>
      </div>
    </el-dialog>
    <!--角色分配面板-->
    <el-dialog title="角色分配" :visible.sync="showRole">
      <!--双向绑定表单数据到roleObj-->
      <el-form :model="roleObj">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <label> {{roleObj.username}}</label>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!--
              el-select下拉框组件
              v-model = "" 选中选项的value值
              el-option 下拉选项
              label 下拉选项中显示的文本
            -->
          <el-select v-model="roleObj.rid" placeholder="请选择">
            <el-option disabled label="请选择" :value="-1"></el-option>
            <el-option v-for="item in options" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>

          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showRole = false">取 消</el-button>
        <el-button type="primary" @click="myUpdateRole">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
  export default {
    name: "users",
    data: function () {
      return {
        tableData: [],
        query: '',
        pageNum: 1,
        pageSizes: [2, 4, 6, 8],
        pageSize: 4,
        total: 20,
        showAdd: false,
        showEdit: false,
        showRole: false,
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        editForm: {
          username: '',
          email: '',
          mobile: ''
        },
        roleForm: {
          username: '',
          password: ''
        },
        roleObj: {
          userId: '',
          username: '',
          rid: ''
        },
        options: [],
        formLabelWidth: '120px'
      }
    },
    methods: {
      //封装获取数据的函数
      getAllData: async function () {
        //请求数据市，传入query，即可实现模糊查询功能 - 后端写好的
        var res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pageNum}&pagesize=${this.pageSize}`)
        var {data, meta} = res.data
        this.tableData = data.users
        //获取的数据中包括数据总条数，total，通过双向绑定设置给分页插件的total
        this.total = data.total;
      },
      sizeChange: function (val) {//方法中的val参数表示当前改变的页容量
        /*把新的页容量设置给pageSize，重新请求数据*/
        this.pageSize = val
        this.getAllData()
      },
      currentChange: function (val) {//方法中的val参数表示改变的当前页
        this.pageNum = val
        this.getAllData()
      },
      //实现搜索功能
      search: function () {
        this.getAllData()
        this.query = ''
      },
      //清空表单方法
      clearForm: function () {
        for (var item in this.addForm) {
          this.addForm[item] = ''
        }
      },
      //实现添加用户功能
      addData: async function () {
        var res = await this.$http.post('users', this.addForm)
        var {msg, status} = res.data.meta
        if (status === 201) {
          this.$message({
            message: msg,
            type: 'success'
          })

          this.getAllData()
        } else {
          this.$message.error(msg)

        }
        this.showAdd = false//操作不管成功与否，都关闭添加窗口
        //清空表单域
        this.clearForm()
      },
      //实现删除用户功能
      delData: function (userId) {
        this.$confirm('是够删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var res = await this.$http.delete(`users/${userId}`)
          var {msg, status} = res.data.meta
          if (status === 200) {
            this.$message({
              message: msg,
              type: 'success'
            })
            //删除成功后，跳转到第一页，重新渲染数据
            this.pageNum = 1
            this.getAllData()
          } else {
            this.$message.error(msg)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      //实现获取编辑用户数据功能
      getEditData: async function (userId) {
        this.showEdit = true
        var res = await this.$http.get(`users/${userId}`)
        var {data, meta: {msg, status}} = res.data
        if (status === 200) {
          this.editForm = data
        } else {
          this.$message.error(msg)
        }
      },
      //实现提交编辑用户数据功能
      postEditData: async function () {
        var res = await this.$http.put(`users/${this.editForm.id}`, {//id为data赋值给editForm的，没用过
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        var {msg, status} = res.data.meta
        if (status === 200) {
          this.getAllData()
          this.$message({
            message: msg,
            type: 'success'
          })
        } else {
          this.$message.error(msg)
        }
        this.showEdit = false
      },
      //实现用户状态的切换
      changeState: async function (row) {
        var res = await this.$http.put(`users/${row.id}/state/${row.mg_state}`)
        var {msg, status} = res.data.meta
        if (status === 200) {
          this.$message({
            message: msg,
            type: 'success'
          })
        } else {
          this.$message.error(msg)
        }
      },
      //实现角色信息及权限获取功能
      //实现获取所有的角色信息
      getAllRoles: async function () {
        var res = await this.$http.get('roles')
        var {data, meta: {msg, status}} = res.data
        if (status === 200) {
          this.options = data
        }
      },
      getRole: async function (row) {
        this.showRole = true
        this.getAllRoles()//点击按钮时，获取所有的角色名称

        this.roleObj.username = row.username//获取用户名 - 打开角色面板时候用
        this.roleObj.userId = row.id//获取用户id - 设置角色时候用

        //根据用户id获取角色数据，角色id通过id获取用户数据获得的
        var res = await this.$http.get(`users/${row.id}`)
        var {data, meta: {msg, status}} = res.data
        console.log(res);
        if (status === 200) {
          //保存角色id到roleObj中
          this.roleObj.rid = data.rid
        }
      },
      //实现角色修改
      myUpdateRole: async function () {
        var res = await  this.$http.put(`users/${this.roleObj.userId}/role`, {
          rid: this.roleObj.rid
        })
        var {msg, status} = res.data.meta
        if (status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message.error(msg)
        }
        this.showRole = false
      }
    },
    created: function () {
      //页面加载时获取页面的数据
      //需要把token设置给请求头传递给服务器,否则会提示无效的token ---约定
      //所以页面加载前把所有的请求都设置请求头中....token
      var token = window.localStorage.getItem('token')
      this.$http.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');
      this.getAllData()//页面加载时候，获取所有的用户列表
    }
  }
</script>

<style scoped>
  .input-with-select {
    width: 300px;
    margin-top: 20px;
  }
</style>
