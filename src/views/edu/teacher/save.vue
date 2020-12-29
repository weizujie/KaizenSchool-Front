<template>
  <div class="app-container">
    <el-form label-width="120px">

      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
          v-show：是否显示上传组件
          :key：类似于id，如果一个页面多个图片上传控件，可以做区分
          :url：后台上传的url地址
          @close：关闭上传组件
          @crop-upload-success：上传成功后的回调
           <input type="file" name="file"/>
        -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="VUE_APP_BASE_API+'/oss/file'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

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
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },

  data() {
    return {
      teacher: { // 对象
        name: '',
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      imagecropperShow: false, // 上传弹框组件是否显示
      imagecropperKey: 0, // 上传组件 key 值
      VUE_APP_BASE_API: process.env.VUE_APP_BASE_API // 获取 .env.development 的地址
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
      if (!this.teacher.id) {
        // 添加
        this.addTeacher()
      } else {
        // 修改
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

    // 关闭上传弹框方法
    close() {
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },

    // 上传成功方法
    cropSuccess(data) {
      // 关闭弹框
      this.imagecropperShow = false
      // 上传之后接口返回的图片地址
      this.teacher.avatar = data.url
      // 每次上传成功后，key变化
      this.imagecropperKey = this.imagecropperKey + 1
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
