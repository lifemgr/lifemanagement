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
    ch_scoring: 0
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
    console.log("co_scoring : "+this.data.co_scoring);
  },
});