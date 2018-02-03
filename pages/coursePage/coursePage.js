// pages/coursePage/coursePage.js
var courseData_json = null
var shareList = []

Page({
  onLoad: function (options) {
    courseData_json = options.json
    var courseData = JSON.parse(options.json)

    var that = this


    wx.getStorage({
      key: 'myShareCourses',
      success: function (res) {
        shareList = res.data
      },
      complete: function () {
        for (var i = 0; i < courseData.places.length; i++) {
          var flag = false
          console.log(shareList)
          for (var j = 0; j < shareList.length; j++) {
            if (shareList[j].id == courseData.id && shareList[j].places[0].time == courseData.places[i].time && shareList[j].places[0].week == courseData.places[i].week) {
              flag = true
            }
          }
          courseData.places[i]['share'] = flag

        }
        that.setData(courseData)
      }
    })
  },
  onJoinShareClass: function (e) {
    var courseData = JSON.parse(courseData_json)

    var pid = e.currentTarget.dataset.pid

    var place = courseData.places[pid]

    courseData.places = [place]

    shareList.push(courseData)

    wx.setStorage({
      key: 'myShareCourses',
      data: shareList,
      complete: function () {
        wx.showModal({
          title: '蹭课完成',
          content: '可在我的蹭课中查看',
          showCancel: false,
          complete: function () {
            wx.navigateBack({
            })
          }
        })
      }
    })
  },
  onDeleteShareClass: function (e) {
    var courseData = JSON.parse(courseData_json)

    console.log(shareList)

    for (var i = shareList.length-1; i >=0 ;i--){
      if (shareList[i].id == courseData.id && shareList[i].time == courseData.time && shareList[i].week == courseData.week){
        shareList.splice(i,1)
      }
    }

    wx.setStorage({
      key: 'myShareCourses',
      data: shareList,
      complete: function () {
        wx.showModal({
          title: '已经删除',
          content: '删除成功',
          showCancel: false,
          complete: function () {
            console.log('403')
            wx.navigateBack({
              
            })
          }
        })
      }
    })
  }
})