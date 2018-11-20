module.exports = {
  student: function() {
    return {
      "totalscore": 100,
      "course": {
        "compulsory": {
          score: 50,
          course: [{
            id: 101,
            score: 3,
            name: "表白",
            image: '../../imgs/profession.jpg'
          }, {
            id: 102,
            score: 1,
            name: "不挂科",
            image: '../../imgs/failcourse.jpg'
          }, {
            id: 103,
            score: 1,
            name: "参加社团",
            image: '../../imgs/community.jpg'
          }, {
            id: 104,
            score: 1,
            name: "参加运动会",
            image: '../../imgs/sportsmeeting.jpg'
          }, {
            id: 105,
            score: 2,
            name: "过六级",
            image: '../../imgs/sixlevel.jpg'
          }, {
            id: 106,
            score: 1,
            name: "喝酒撸串",
            image: '../../imgs/drink.jpg'
          }]
        },
        "optional": {
          score: 50,
          course: [{
            id: 201,
            score: 3,
            name: "DIY蛋糕",
            image: '../../imgs/DIYcake.jpg'
          }, {
            id: 202,
            score: 2,
            name: "帮助弱者",
            image: '../../imgs/helpweaker.jpg'
          }, {
            id: 203,
            score: 5,
            name: "出国留学",
            image: '../../imgs/studyabroad.jpg'
          }, {
            id: 204,
            score: 1,
            name: "堆雪人",
            image: '../../imgs/makesnowman.jpg'
          }, {
            id: 205,
            score: 3,
            name: "辅修专业",
            image: '../../imgs/minor.jpg'
          }, {
            id: 206,
            score: 3,
            name: "公共演讲",
            image: '../../imgs/publictalk.jpg'
          }]
        },
        "challenge": {
          score: 50,
          course: [{
            id: 301,
            score: 8,
            name: "蹦极",
            image: '../../imgs/Bungeejumping.jpg'
          }, {
            id: 302,
            score: 8,
            name: "参加快闪",
              image: '../../imgs/flash.jpg'
          }, {
            id: 303,
            score: 6,
            name: "吃遍食堂菜系",
              image: '../../imgs/Eatallcanteen.jpg'
          }, {
            id: 304,
            score: 8,
            name: "有作品",
              image: '../../imgs/excellencework.jpg'
          }, {
            id: 305,
            score: 8,
            name: "冬泳",
              image: '../../imgs/winterswimming.jpg'
          }, {
            id: 306,
            score: 6,
            name: "戒烟",
              image: '../../imgs/quitsmoking.jpg'
          }]
        }
      }
    }
  }
}