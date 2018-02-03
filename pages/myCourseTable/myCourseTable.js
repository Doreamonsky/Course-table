// pages/myCourseTable/myCourseTable.js
var course_code_list = []
var inSetting = false
var last_import_str = ''

Page({
  data: {
    "course_code_list": course_code_list
  },
  onShow: function () {
    if (inSetting) {
      getClip(this)
    }
  },
  onLoad: function (options) {
    var that = this
    //保存课表id
    wx.getStorage({
      key: 'course_code_list',
      success: function (res) {
        course_code_list = res.data
        console.log(course_code_list)

        that.setData({
          "course_code_list": course_code_list,
          "blank": ''
        })
      },
    })

    //读取课表
    if (options.forceSetting == 0) {
      wx.showLoading()

      wx.getStorage({
        key: 'my_course_data',
        success: function (res) {
          wx.redirectTo({
            url: '/pages/courseTable/courseTable?data=' + JSON.stringify(res.data) + '&currentWeek=1',
          })
        }, fail: function (res) {
          inSetting = true
          getClip(that)
        },
        complete: function () {
          wx.hideLoading()
        }
      })
    }
    else {
      inSetting = true
      getClip(that)
    }
  },
  //删除ID
  onTouchDelete: function (e) {
    var index = e.currentTarget.dataset.id
    course_code_list.splice(index, 1)
    console.log(course_code_list)

    this.setData({
      "course_code_list": course_code_list,
      "blank": ''
    })

    wx.setStorage({
      key: 'course_code_list',
      data: course_code_list,
    })
  },
  //添加ID
  onAddCourseID: function (e) {
    var course_id = e.detail.value.id
    course_code_list.push(course_id)

    wx.setStorage({
      key: 'course_code_list',
      data: course_code_list,
    })

    this.setData({
      "course_code_list": course_code_list,
      "blank": ''
    })
  },
  //请求课表连接
  onRequestCourse: function () {
    var str = ''
    for (var i = 0; i < course_code_list.length; i++) {
      str = str + course_code_list[i] + (i == course_code_list.length - 1 ? '' : ',')
    }
    var jData = {
      'request': 'courses_by_id',
      'keywords': str
    }

    wx.request({
      url: 'https://waroftanks.cn/py/',
      method: 'get',
      header: { "content-type": "text/html" },
      data: {
        'json': jData
      },
      success: function (res) {
        wx.setStorage({
          key: 'my_course_data',
          data: res.data,
        })

        wx.navigateTo({
          url: '/pages/courseTable/courseTable?data=' + JSON.stringify(res.data) + '&currentWeek=1',
          complete: function () {
            wx.showModal({
              title: '成功生成课表',
              content: '你可以在 菜单栏的"其他"中进行课程修改。',
              showCancel: false
            })
          }
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
    })

  }, onTapHelp: function (e) {
    wx.navigateTo({
      url: '/pages/helper/helper?type=1',
    })
  }
})

function getClip(that) {
  wx.getClipboardData({
    success: function (res) {
      if (last_import_str == res.data) {
        return
      }

      last_import_str = res.data

      var reg = /([0-9]+\.[0-9]+)/g
      var group = res.data.match(reg)


      if (group.length != 0) {
        var it = that

        wx.showModal({
          title: '检测到Clipboard有课程',
          content: '点确定 自动导入课程' + group,
          success: function (res) {
            if (res.confirm) {
              for (var i = 0; i < group.length; i++) {
                course_code_list.push(group[i])
              }

              wx.setStorage({
                key: 'course_code_list',
                data: course_code_list,
              })

              it.setData({
                "course_code_list": course_code_list,
                "blank": ''
              })
            }
          }
        })

      }

    }
  })
}