<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <!-- 查询按钮 -->
      <!-- @click="getList()" 点击按钮触发方法 -->
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 数据列表 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column align="center" label="序号" width="70">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80"/>

      <el-table-column align="center" label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level === 1 ? '高级讲师' : '首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历"/>

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <!-- 操作 -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!--
          修改
          router-link 通过路由的方式跳转到修改页面
          -->
          <router-link :to=" '/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <!--删除-->
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
// 引入 teacher.js
import teacher from '@/api/edu/teacher'

export default {
  data() {
    // 创建变量和初始值
    return {
      // 当前页
      page: 1,
      // 每页记录数
      limit: 10,
      // 总记录数
      total: 0,
      // 条件封装对象
      teacherQuery: {},
      // 查询之后接口返回的集合
      list: null
    }
  },
  created() { //在页面渲染之前，一般调用 methods 里面的方法
    this.list = this.getList()
  },
  methods: { //创建具体方法，调用 teacher.js 里的方法
    // 获取讲师列表
    getList(page = 1) {
      this.page = page
      teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
        .then(response => { // 请求成功
          // response 接口返回数据
          this.list = response.data.rows
          this.total = response.data.total
        })
    },
    // 删除讲师
    removeDataById(id) {
      teacher.deleteTeacherId(id)
      this.$confirm('此操作将永久删除该讲师记录, 是否继续?', '提示', {
        confirmButtonText: '确定', // 点击确定执行 then
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 提示信息
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 回到讲师列表（当前所在页）
        this.getList(this.page)
      })
    },
    // 清空查询条件方法
    resetData() {
      //表单输入项数据清空
      this.teacherQuery = {}
      //查询所有讲师数据
      this.getList()
    }
  }
}
</script>
