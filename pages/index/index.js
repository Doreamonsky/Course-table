// This is our App Service.
// This is our data.

var course_helper = require('../../utils/course_helper.js')

var currentKeywords = ''

var app = getApp()

// Register a Page.
Page({
  data: {
    'course_has_keywords': true,
    'course_keywords_list': ['管理学', '高等数学', '建筑力学'],
    'verison': app.globalData.currentVersion,
  },
  onReady: function () {

    var that = this;

    wx.getStorage({
      key: 'course_keywords_list',
      success: function (res) {
        that.setData({
          course_keywords_list: res.data
        }

        )
      }
    })


    wx.getStorage({
      key: 'course_lasttime_keywords',
      success: function (res) {
        wx.hideToast()

        that.setData({
          course_lasttime_keywords: res.data
        }
        )
      }
    })

  },
  getCourse: function (e) {
    var input_keywords = e.detail.value.keywords.replace(/，/g, ',')

    // sent data change to view
    var jData = JSON.stringify(
      {
        'keywords': input_keywords,
        'request': 'courses_list_by_keywords'
      }
    )

    wx.showToast({
      icon: 'loading',
      title: '从收集课程信息中呢! '
    })

    var that = this

    wx.request({
      url: 'https://waroftanks.cn/py/',
      method: 'get',
      header: { "content-type": "text/html" },
      data: {
        'json': jData
      },
      success: function (res) {
        wx.setStorage({
          key: 'course_lasttime_keywords',
          data: input_keywords,
        })
        wx.setStorage({
          key: 'course_keywords_list',
          data: input_keywords.split(','),
        })

        wx.navigateTo({
          url: '/pages/courseList/courseList?data=' + JSON.stringify(res.data),
        })
        wx.hideToast()
      },
      fail: function (res) {
        console.log(res)
        wx.showModal({
          title: '网络错误',
          content: '错误信息：' + res.errMsg + '若持续故障，请联系 QQ:403036847 了解问题。',
          showCancel: false
        })
      }
    }
    )
  },
  onShareAppMessage: function (e) {
    return {
      title: '上师大专属课表，快速录入个人课表，查询教学班课表以及查询教室课表。有了这个小程序，你就手握学校课表数据库在手。',
      desc: '快速录入个人课表，查询教学班课表以及查询教室课表。有了这个小程序，你就手握学校课表数据库在手。',
      path: '/pages/index/index'
    }
  },
  onKeywordTouched: function (e) {
    var touchedKeyword = e.currentTarget.dataset.keyword
    var all = currentKeywords.length == 0 ? touchedKeyword : currentKeywords + ',' + touchedKeyword
    currentKeywords = all
    this.setData(
      {
        'course_lasttime_keywords': all
      }
    )
  },
  onNewKeywordInput: function (e) {
    currentKeywords = e.detail.value
  },
  resetKeywordInput: function (e) {
    currentKeywords = ''
  },
  clearHistory: function (e) {
    this.setData({
      'course_keywords_list': []
    })

    wx.setStorage({
      key: 'course_keywords_list',
      data: [],
    })
  },
  onTouchClassRoomRouter: function (e) {
    wx.navigateTo({
      url: '/pages/classRoomRouter/classRoomRouter',
    })
  },
  onTouchMyCourse: function (e) {
    wx.showLoading()

    wx.navigateTo({
      url: '/pages/myCourseTable/myCourseTable?forceSetting=0',
      success: function () {
        wx.hideLoading()
      }
    })
  }, onTouchClassFinder: function (e) {
    wx.navigateTo({
      url: '/pages/classFinder/classFinder',
    })
  }
})

