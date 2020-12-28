<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import teacher from '@/api/edu/teacher'

export default {
  data() {
    return {
      teacher: { // 对象
        name: '',
        level: 1,
        career: '',
        intro: ''
      }
    }
  },
  created() {
    this.init()
  },
  watch: { // 监听
    $route(to, from) {// 路由发生变化，方法就会执行
      this.init()
    }
  },
  methods: {
    saveOrUpdate() {
      // 根据 teacher 是否有 id， 有就修改，没有就添加
      console.log(this.teacher.id)
      if (!this.teacher.id) {
        // 添加
        this.addTeacher()
      } else {
        // 修改
        alert('saveOrUpdate() -> editTeacher()')
        this.editTeacher()
      }
    },

    // 添加讲师
    addTeacher() {
      teacher.addTeacher(this.teacher)
          .then(() => { // 添加成功
            // 提示信息
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            // 跳转到列表（路由跳转）
            this.$router.push({
              path: '/teacher/list'
            })
          })
    },

    // 根据 id 查询讲师
    getTeacherInfo(id) {
      teacher.getTeacherInfo(id)
          .then(response => {
            this.teacher = response.data.teacher
          })
    },

    // 修改讲师
    editTeacher() {
      teacher.editTeacher(this.teacher)
          .then(() => {
            // 提示信息
            this.$message({
              type: 'success',
              message: '修改成功'
            })

            // 跳转到列表（路由跳转）
            this.$router.push({
              path: '/teacher/list'
            })

          })
    },

    init() {
      // 判断 url 是否有 id 值
      if (this.$route.params && this.$route.params.id) {
        // 从 url 获取 id 值
        const id = this.$route.params.id
        // 调用方法
        this.getTeacherInfo(id)
      } else {
        // 表单页面还是显示修改回显的数据，所以要把表单清空
        this.teacher = {}
      }
    }

  }
}
</script>
