// pages/classRoomRouter/classRoomRouter.js

var classroom_data_manager = require('../../utils/classroom_data_manager.js')
var course_helper = require('../../utils/course_helper.js')

var building_list = ['奉贤1教', '奉贤2教', '奉贤3教', '奉贤4教', '奉贤5教', '徐汇一教', '徐汇二教', '徐汇三教', '徐汇四教', '徐汇五教', '徐汇六教', '徐汇计算中心']
Page({
  data:{
    'index':0,
    'indexActive':'奉贤1教',
    'building_list': building_list
  },
  onLoad: function () {
    var roomData = classroom_data_manager.loadData()
    this.setData({ 'roomData': roomData })
  }, 
  onBuidingChanged:function(e){
    var i = e.detail.value
    this.setData({
      'index':i,
      'indexActive': building_list[i]
    })
  }, 
  onRequestClassTimeTable:function(e){
    showTimetableWith(e.currentTarget.dataset.room)
  }
})

function showTimetableWith (keywords){
  wx.showLoading()

  var jData = {
    'request': 'courses_by_classroom_keywords',
    'keywords': keywords
  }

  wx.request({
    url: 'https://waroftanks.cn/py/',
    header: { "content-type": "text/html" },
    data: {
      'json': jData
    },
    success: function (res) {
      wx.hideLoading()

      wx.navigateTo({
        url: '/pages/courseTable/courseTable?data=' + JSON.stringify(res.data) + '&currentWeek=1',
      })
    }, fail: function (res) {
      wx.showModal({
        title: '错误',
        content: res,
      })
    }
  })
}