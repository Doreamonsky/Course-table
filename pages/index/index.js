// This is our App Service.
// This is our data.

var course_helper = require('../../utils/course_helper.js')

var currentKeywords = ''

// Register a Page.
Page({
  data: {
    'haskeywords': true,
    'keywords_list': ['2017','工程管理','土木']


  },
  getCourse: function (e) {
    console.log(e)

    // sent data change to view
    var jData = JSON.stringify(
      {
        'keywords': e.detail.value.keywords.replace(/，/g, ','),
        'request': 'courses_by_keywords'
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
        var myData = course_helper.get_course_array(res.data)

        wx.setStorage({
          key: "course",
          data: myData
        })
        wx.setStorage({
          key: 'lasttime_keywords',
          data: e.detail.value.keywords,
        })
        that.setData(
          {
            wlist: myData
          }
        )
        wx.navigateTo({
          url: '/pages/courseTable/courseTable?data=' + JSON.stringify(myData)+'&currentWeek=1',
        })
        wx.hideToast()
      },
      fail: function (res) {
        console.log(res)
        wx.showModal({
          title: '网络错误',
          content: '错误信息：' + res.errMsg +'若持续故障，请联系 QQ:403036847 了解问题。',
          showCancel:false
        })
      }
    }
    )
  },
  onReady: function () {
    var that = this;
    wx.showToast({
      icon: 'loading',
    })

    wx.getStorage({
      key: 'course',
      success: function (res) {
        wx.hideToast()

        that.setData({
          wlist: res.data
        }

        )
      }
    })

    wx.getStorage({
      key: 'lasttime_keywords',
      success: function (res) {
        wx.hideToast()

        that.setData({
          lasttime_keywords: res.data
        }
        )
      }
    })

  },
  onShareAppMessage: function (e) {
    return {
      title: '上师大智慧课表',
      desc: '快速查询教学班的班级课表，为蹭课而生!',
      path: '/pages/index'
    }
  },
  onKeywordTouched: function (e) {
    var touchedKeyword = e.currentTarget.dataset.keyword
    var all = currentKeywords.length == 0 ? touchedKeyword : currentKeywords + ',' + touchedKeyword
    currentKeywords = all
    this.setData(
      {
        'lasttime_keywords': all
      }
    )
  }, 
  onNewKeywordInput: function (e) {
    currentKeywords = e.detail.value
  }, 
  resetKeywordInput: function (e) {
    currentKeywords = ''
  }
})

