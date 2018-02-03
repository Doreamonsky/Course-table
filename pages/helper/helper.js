// pages/helper/helper.js
Page({
  data: {
    'searchHelper': false,
    'featureHelper': false,
    'feedback': false
  },
  onLoad: function (options) {
    console.log(options.type)
    switch (options.type) {
      case '0':
        this.setData({
          'searchHelper': true
        })
        break
      case '1':
        this.setData({
          'featureHelper': true
        })
        break
      case '3':
        this.setData({
          'feedback': true
        })
        break
    }
  }
})