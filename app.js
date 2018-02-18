//app.js
var currentVersion = '1.4'
App({
  onLaunch: function () {
    wx.request({
      url: 'https://waroftanks.cn/miniProgram/version.php',
      success: function (res) {
        if (res.data.v != currentVersion) {
          wx.showModal({
            title: '版本过旧',
            content: '应用会在下次冷启动时，自动更新。',
            showCancel: false
          })
        }

        getApp().globalData.week = res.data.week

        wx.setStorage({
          key: 'currentWeek',
          data: res.data.week,
        })
      },
      fail:function(){
        wx.getStorage({
          key: 'currentWeek',
          success: function(res) {
            getApp().globalData.week = res.data
          },
        })
      }
    })
  },
  globalData: {
    'currentVersion': currentVersion,
    'week': 1
  },

})