Page({
  about: function () {
    wx.showModal({
      title: '关于',
      content: '程序由ShanghaiWindy开发。版权归超级哆啦酱 (@17 工程管理 1班 王诗江)所有。',
      confirmText: '明白',
      showCancel: false
    })
  },
  onTapCustomizeCourses: function () {
    wx.navigateTo({
      url: '/pages/myCourseTable/myCourseTable?forceSetting=1',
    })
  }
})