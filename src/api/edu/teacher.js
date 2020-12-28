import request from '@/utils/request'

export default {
  // 1. 讲师列表（条件查询分页
  // current：当前页，limit：每页记录数，teacherQuery：条件对象
  getTeacherListPage(current, limit, teacherQuery) {
    return request({
      // 使用 `` 符号，在数字键 1 旁边，而不是单引号
      url: `http://localhost:8001/eduService/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      // teacherQuery：条件对象，后端使用 RequestBody 来获取数据（json）
      // data 表示把对象转换为 json 传递到后端接口里
      data: teacherQuery
    })
  },

  // 2. 删除讲师
  deleteTeacherId(id) {
    return request({
      url: `http://localhost:8001/eduService/teacher/deleteTeacher/${id}`,
      method: 'delete'
    })
  },

  // 3. 讲师添加
  addTeacher(teacher) {
    return request({
      url: `http://localhost:8001/eduService/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },

  // 4. 根据 id 查询讲师
  getTeacherInfo(id) {
    return request({
      url: `http://localhost:8001/eduService/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },

  // 5. 修改讲师
  editTeacher(teacher) {
    return request({
      url: `http://localhost:8001/eduService/teacher/editTeacher`,
      method: 'put',
      data: teacher
    })
  }

}
