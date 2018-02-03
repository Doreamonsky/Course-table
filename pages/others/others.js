Page({
  about: function () {
    wx.showModal({
      title: '关于',
      content: '版权归超级哆啦酱 (@17 工程管理 1班 王诗江)所有。',
      confirmText: '明白',
      showCancel: false
    })
  },
  onTapCustomizeCourses: function () {
    wx.navigateTo({
      url: '/pages/myCourseTable/myCourseTable?forceSetting=1',
    })
  }, onTapHelp: function () {
    wx.navigateTo({
      url: '/pages/helper/helper?type=1',
    })
  }, onTapMyShareCourses: function () {
    wx.getStorage({
      key: 'myShareCourses',
      success: function (res) {
        wx.navigateTo({
          url: '/pages/shareCourseList/shareCourseList?data=' + JSON.stringify(res.data),
        })
      },
    })
  }, feedback: function () {
    wx.navigateTo({
      url: '/pages/helper/helper?type=3',
    })
  }
})