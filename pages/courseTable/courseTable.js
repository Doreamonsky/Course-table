// pages/corseTable/courseTable.js
var course_helper = require('../../utils/course_helper.js')

var currentWeek = 1


var weeks = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '第十一周', '第十二周', '第十三周', '第十四周', '第十五周', '第十六周', '第十七周', '第十八周']

var color = ['#D32F2F', '#7B1FA2', '#303F9F', '#0288D1', '#0097A7', '#00796B', '#388E3C', '#F57C00','#5D4037']

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
    
    currentWeek = options.currentWeek

    var course_data = course_helper.get_course_array(JSON.parse(jsonData), currentWeek)


    this.setData({
      'index': currentWeek -1
    })
    
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
  },
  onShareAppMessage: function (e) {
    return {
      title: '上师大智慧课表',
      desc: '方便，简洁，智能。就选上师大智慧课表。',
      path: '/pages/index/index'
    }
  },
})