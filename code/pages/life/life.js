var t = require("../../utils/util.js");
const app = getApp();
Page({
  data: {},
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
  }
});