// pages/courseList/coruseList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    var data = JSON.parse(options.data)
    this.setData({
      'course_list': data
    })
  },
  viewCourseDetail: function (e) {
    wx.navigateTo({
      url: '/pages/coursePage/coursePage?json=' + JSON.stringify(e.currentTarget.dataset.course),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})