var util = require("../../utils/util.js");
var lifeprin = require("data").student();
const app = getApp();
Page({
  data: {
    score: lifeprin.score,
    compulsory: lifeprin.course.compulsory,
    optional: lifeprin.course.optional,
    challenge: lifeprin.course.challenge,
    co_scoring: 0,
    op_scoring: 0,
    ch_scoring: 0,
    show:!0
  },
  onLoad: function() {
    console.log("page-life onload");
    console.log(app.globalData.userInfoExt);
    var t = this;
    wx.getSystemInfo({
      success: function(a) {
        console.log(a);
        var n = !0;
        n = a.system.indexOf("iOS") > -1, t.setData({
          iphone: n,
          myheight: a.windowHeight,
          screenWidth: a.windowWidth,
          screenHeight: a.windowHeight
        });
      }
    });
  },
  onShow() {
    console.log("page-life onShow");
  },
  onReady() {
    console.log("page-life onReady");
  },
  onUnload() {
    console.log("page-life onUnload");
  },
  checkboxChange4Compul: function(e) {
    this.setData({
      co_scoring: util.getSum(e.detail.value)
    });
  },
  checkboxChange4Optional: function(e) {
    this.setData({
      op_scoring: util.getSum(e.detail.value)
    });
  },
  checkboxChange4Challenge: function(e) {
    this.setData({
      ch_scoring: util.getSum(e.detail.value)
    });
  },
  doSubmit: function() {
    console.log("co_scoring : " + this.data.co_scoring);
    this.drawShareImg(1, 2, 3);
  },
  drawShareImg: function(a, n, i) {
    this.setData({
      showModalStatus: !0,
      hiddenCanvas: !1
    }), wx.showLoading({
      title: "图片生成中..."
    }), this._drawShareImg(a, n, i);
  },
  _drawShareImg: function(a, i, e) {
    console.log("_drawShareImg");
    this.setData({
      hiddenCanvas: !1
    });
    var ctx = wx.createCanvasContext("shareCanvas");
    ctx.setFillStyle('red')
    ctx.fillRect(10, 10, 150, 100);
    ctx.fillRect(50, 50, 150, 100);
    ctx.setFontSize(20);
    ctx.setFillStyle('blue');
    ctx.fillText('Hello', 20, 20)
    ctx.fillText('MINA', 100, 100)
    var h = this;
    ctx.draw(!0, function(a) {
      console.log("beginTo draw canvas");
      wx.canvasToTempFilePath({
        width: 900,
        height: 1600,
        destWidth: 900,
        destHeight: 1600,
        canvasId: "shareCanvas",
        success: function(a) {
          h.setData({
            hiddenCanvas: !0,
            imagePath: a.tempFilePath,
            show: !1
          });
          console.log("draw succ!");
        },
        complete: function(a) {
          wx.hideLoading();
          console.log("draw complete");
        }
      });
    });
  },
  saveImg: function() {
    var a = this,
      n = this.data.imagePath;
    return wx.saveImageToPhotosAlbum({
      filePath: n,
      success: function(n) {
        wx.showToast({
          title: "已保存到相册",
          icon: "success",
          duration: 2e3
        }), a.setData({
          hiddenCanvas: !0
        });
      }
    });
  },
  doCancel: function () {
    this.setData({
      show: !0
    });
  },
});