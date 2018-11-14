const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function(QD) {
    wx.showShareMenu({
      withShareTicket: !0
    });

  },
  cavs: function () {
    app.globalData.userInfoExt = {'userType':'1','xingzuo':'2'};
    wx.navigateTo({
      url: "/pages/life/life"
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    console.log("asdfds")
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})