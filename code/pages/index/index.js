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
      withShareTicket: true
    })
    var t = this;
    wx.getUserInfo({
      fail: function(a) {

      },
      success: function(e) {
        console.log(e)
        console.log("asdfds");
        wx.downloadFile({
          url: e.userInfo.avatarUrl,
          success: res => {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              t.setData({
                localurl: res.tempFilePath //将下载下来的地址给data中的变量变量
              });
            }
          },
          fail: res => {
            console.log(res);
          }
        })
        t.setData({
          userInfo: e.userInfo,
          hasUserInfo: true
        })
      }
    });
  },
  cavs: function() {
    //app.globalData.userInfoExt = { 'userType': '3', 'constellation': '2'};
    var userType = '3';
    var constellation = '2';
    wx.navigateTo({
      url: "/pages/life/life?" + 'userType=' + userType + '&constellation=' + constellation + "&nickName=" + this.data.userInfo.nickName + "&avatarUrl=" + this.data.localurl
    });
  },
  getUserInfo: function(e) {

  }
})