// pages/corseTable/courseTable.js
var course_helper = require('../../utils/course_helper.js')

var currentWeek = 1


var weeks = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周']

var color = ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD", "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"]

var jsonData = ''

Page({
  data:{
    'colorArrays' : color,
    'teachWeek' : weeks, 
    'index' : 1
  }
  ,
  onLoad: function (options) {
    jsonData = options.data

    var course_data = JSON.parse(jsonData)

    currentWeek = options.currentWeek

    console.log(course_data)

    this.setData({
      'index': currentWeek -1
    })

    course_helper.filter_course_by_week(course_data, currentWeek)
    
    this.setData({
      'wlist': course_data
    })

  },
  viewCourseDetail: function (e) {
    wx.navigateTo({
      url: '/pages/coursePage/coursePage?json=' + JSON.stringify(e.currentTarget.dataset.course),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }, teachWeekPickerChange: function (e) {
    wx.redirectTo({
      url: '/pages/courseTable/courseTable?data=' + jsonData + '&currentWeek=' + (parseInt(e.detail.value) + 1),
    })
  }
})