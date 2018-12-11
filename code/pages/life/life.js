var util = require("../../utils/util.js");
const app = getApp();
const all_data = require("data");
var lifeprin;
Page({
  data: {
    co_scoring: 0,
    op_scoring: 0,
    ch_scoring: 0,
    co_size: 0,
    op_size: 0,
    ch_size: 0,
    show: !0,
    hiddenCanvas: !0
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
      co_scoring: util.getSum(e.detail.value),
      co_size: e.detail.value.length
    });
  },
  checkboxChange4Optional: function(e) {
    this.setData({
      op_scoring: util.getSum(e.detail.value),
      op_size: e.detail.value.length
    });
  },
  checkboxChange4Challenge: function(e) {
    this.setData({
      ch_scoring: util.getSum(e.detail.value),
      ch_size: e.detail.value.length
    });
  },
  doSubmit: function() {
    console.log("co_scoring : " + this.data.co_scoring);
    console.log("op_scoring : " + this.data.op_scoring);
    console.log("ch_scoring : " + this.data.ch_scoring);
    var scoreRate = (this.data.co_scoring + this.data.op_scoring + this.data.ch_scoring) * 1.0 / this.data.score;
    var totalCount = this.data.co_size + this.data.op_size + this.data.ch_size; 
    console.log("scoreRate:" + scoreRate);
    console.log("totalCount:" + totalCount);
    this.drawShareImg(scoreRate, 2, 3, 3, totalCount);
  },
  drawShareImg: function(scoreRate, coScoreRate, opScoreRate, chScoreRate, totalCount) {
    this.setData({
      showModalStatus: !0,
      hiddenCanvas: !1
    }), wx.showLoading({
      title: "图片生成中..."
      }), this._drawShareImg(scoreRate, coScoreRate, opScoreRate, chScoreRate, totalCount);
  },
  _drawShareImg: function (scoreRate, coScoreRate, opScoreRate, chScoreRate, totalCount) {
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

    if (scoreRate >= 0.9) {
      //王者
      ctx.drawImage("../../imgs/1.RSWZ.png", 268, 124);
    } else if (scoreRate >= 0.75) {
      //钻石
      ctx.drawImage("../../imgs/2.ZSWJ.png", 268, 124);
    } else if (scoreRate >= 0.5) {
      //铂金
      ctx.drawImage("../../imgs/3.BJWJ.png", 268, 124);
    } else if (scoreRate >= 0.2) {
      //黄金
      ctx.drawImage("../../imgs/4.HJWJ.png", 268, 124);
    } else if (scoreRate >= 0.1) {
      //白银
      ctx.drawImage("../../imgs/5.BYWJ.png", 268, 124);
    } else {
      //青铜
      ctx.drawImage("../../imgs/6.QTWJ.png", 268, 124);
    }
    ctx.restore();
    //------------
    ctx.save();


    ctx.setFontSize(52);
    ctx.fillText(totalCount, 398, 235);

    ctx.setFontSize(28);
    ctx.setFillStyle('blue');
    ctx.fillText('好胜独立孩子气', 80, 315);
    ctx.fillText('天生要强', 80, 360);

    ctx.fillText('易燃易爆炸', 115, 444);
    ctx.fillText('聪明机灵鬼', 115, 490);

    ctx.fillText('耿直善良', 57, 577);
    ctx.fillText('学不会讨好', 57, 625);

    ctx.fillText('单纯没心机', 61, 707);
    ctx.fillText('不屑玩套路', 61, 750);




    ctx.fillText('思想的巨人', 430, 428);
    ctx.fillText('行动的矮子', 430, 478);

    ctx.fillText('想的太多', 408, 543);
    ctx.fillText('做的太少', 405, 587);

    ctx.fillText('花间一壶酒', 396, 677);
    ctx.fillText('是条萌宅狗', 396, 720);

    ctx.fillText('书中自有黄金屋', 349, 808);
    ctx.fillText('深宅学霸门不出', 349, 850);

    ctx.restore();



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