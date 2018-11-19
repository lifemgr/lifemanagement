var t = require("../../utils/util.js");
var lifeprin = require("data").student();
const app = getApp();
Page({
  data: {
    score: lifeprin.score,
    compulsory: lifeprin.course.compulsory,
    optional: lifeprin.course.optional,
    challenge: lifeprin.course.challenge
  },
  onLoad: function() {
    console.log("page-life onload");
    console.log(app.globalData.userInfoExt);
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
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  }
});