const app = getApp()
/**music */
/**x
const backgroundAudioManager = wx.getBackgroundAudioManager()
backgroundAudioManager.title = '此时此刻'
backgroundAudioManager.epname = '此时此刻'
backgroundAudioManager.singer = '许巍'
backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'*/
// 设置了 src 之后会自动播放
/**backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'*/

var userType = '1';
var constellation = '1';

Page({
  data: {
    motto: '提交',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    /**下拉框 */
    arrayA: ['校园学生', '职场新人', '职场老鸟'],
    indexA: 0,
    /**下拉框end */
    /**下拉框 */
    arrayB: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    indexB: 0,
    /**下拉框end */
  },

  /**下拉框 */
  bindPickerChangeA: function(e) {
    console.log('属性picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexA: e.detail.value
    })
    userType = Number(e.detail.value) + Number(1);
  },

  bindPickerChangeB: function(e) {
    console.log('星座picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexB: e.detail.value
    })
    constellation = Number(e.detail.value) + Number(1);
  },

  onGotUserInfo(e) {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo)
    // console.log(e.detail.rawData)
    var t = this;
    wx.downloadFile({
      url: e.detail.userInfo.avatarUrl,
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
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**下拉框end */
  onLoad: function(QD) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var t = this;
    wx.getUserInfo({
      fail: function(a) {
        console.log(a);
      },
      success: function(e) {
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
    console.log(userType);
    console.log(constellation);
    wx.navigateTo({
      url: "/pages/life/life?" + 'userType=' + userType + '&constellation=' + constellation + "&nickName=" + this.data.userInfo.nickName + "&avatarUrl=" + this.data.localurl
    });
  },
  getUserInfo: function(e) {

  }
})