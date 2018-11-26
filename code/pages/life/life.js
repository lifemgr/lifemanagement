var util = require("../../utils/util.js");
const app = getApp();
const all_data = require("data");
var lifeprin;
Page({
  data: {
    co_scoring: 0,
    op_scoring: 0,
    ch_scoring: 0,
    show: !0
  },
  onLoad: function(options) {
    var t = this;
    console.log("page-life onload");
    var userType = options.userType;
    var constellation = options.constellation;
    if (userType == '1') {
      lifeprin = all_data.student();
    } else if (userType == '2') {
      lifeprin = all_data.newcomer();
    } else if (userType == '3') {
      lifeprin = all_data.veterans();
    }
    t.setData({
      score: lifeprin.totalscore,
      compulsory: lifeprin.course.compulsory,
      optional: lifeprin.course.optional,
      challenge: lifeprin.course.challenge,
      nickName: options.nickName,
      avatarUrl: options.avatarUrl
    });

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
    console.log("op_scoring : " + this.data.op_scoring);
    console.log("ch_scoring : " + this.data.ch_scoring);
    var scoreRate = (this.data.co_scoring + this.data.op_scoring + this.data.ch_scoring) * 1.0 / this.data.score;
    this.drawShareImg(scoreRate, 2, 3);
  },
  drawShareImg: function(scoreRate, coScoreRate, opScoreRate, chScoreRate) {
    this.setData({
      showModalStatus: !0,
      hiddenCanvas: !1
    }), wx.showLoading({
      title: "图片生成中..."
    }), this._drawShareImg(scoreRate, coScoreRate, opScoreRate, chScoreRate);
  },
  _drawShareImg: function(scoreRate, coScoreRate, opScoreRate, chScoreRate) {
    console.log("_drawShareImg");
    this.setData({
      hiddenCanvas: !1
    });
    var ctx = wx.createCanvasContext("shareCanvas");
    ctx.drawImage('../../imgs/show.png', 0, 0, 658, 1170);

    //-------------
    //绘制用户头像
    ctx.save();
    ctx.arc(332, 588, 64, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(this.data.avatarUrl, 268, 524);
    ctx.restore();

    //-------------
    //根据用户得分绘制称号
    ctx.save();

    if (scoreRate >= 0.75) {
      //王者
      ctx.drawImage("../../imgs/1.RSWZ.png", 268, 124);
    } else if (scoreRate >= 0.6) {
      //钻石
      ctx.drawImage("../../imgs/2.ZSWJ.png", 268, 124);
    } else if (scoreRate >= 0.45) {
      //铂金
      ctx.drawImage("../../imgs/3.BJWJ.png", 268, 124);
    } else if (scoreRate >= 0.3) {
      //黄金
      ctx.drawImage("../../imgs/4.HJWJ.png", 268, 124);
    } else if (scoreRate >= 0.3) {
      //白银
      ctx.drawImage("../../imgs/5.BYWJ.png", 268, 124);
    } else {
      //青铜
      ctx.drawImage("../../imgs/6.QTWJ.png", 268, 124);
    }
    ctx.restore();
    //------------
    ctx.setFontSize(20);
    ctx.setFillStyle('blue');

    ctx.fillText('MINA', 100, 100);
    // ctx.fillText(this.data.nickName, 100, 100)
    ctx.setTransform(0.5, 0.5, 1, 1, 1, 1);
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
  doCancel: function() {
    this.setData({
      show: !0
    });
  }
});