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
  }
}
