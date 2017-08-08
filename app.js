//app.js
var Api = require('utils/api.js');
App({
  imgsrc: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/',
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          var APPID = 'wxe5b8162c10b70f21'

          var SECRET = '06f868bdca4f476215c4a3c6d6e2af37'
          var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + res.code + '&grant_type=authorization_code'
          var params={}
          Api.request(url,params,function(data){
            that.globalData.openid = data.openid;       //获取openid 
            wx.getLocation({
              type: 'wgs84',
              success: function (res) {
                that.globalData.lat = res.latitude  //获取维度
                that.globalData.long = res.longitude     //获取经度
                wx.getUserInfo({ //用户微信信息
                  success: function (rey) {
                    that.globalData.userInfo = rey.userInfo
                    that.yang()    //调用接口
                  },
                  //拒绝共享信息
                  fail: function () { wx.hideLoading() }
                })
              },
              //拒绝定位
              fail: function (e) { wx.hideLoading() }
            })
          })
        } else {

          wx.showModal({ title: '提示', content: '获取用户登录态失败！' + res.errMsg })

        }
      }

    });

    //that.yang()  //页面数据请求完成执行自定义函数
  },

  yang: function () {
    var that = this
    if (that.globalData.userInfo) {
      let url = Api.Url.main_main;
      let params = {
        openid: that.globalData.openid,
        long: that.globalData.long,
        lat: that.globalData.lat,
        userInfo: that.globalData.userInfo
      };
      Api.request(url, params, function (data) {
        that.globalData.city = data.city
        that.globalData.district = data.district
        if (data.code == 1) {
          wx.switchTab({ url: "/pages/main/index/index", });
        } else {
          //wx.navigateTo({ url: "/pages/login/login", })
        }
      });
    }
  },

  globalData: {

    userInfo: '',  //用户微信信息

    long: 0, //经度

    lat: 0, //纬度

    openid: 0,  //openid

    city: '深圳市',  //所在城市 默认是深圳

    district: '全部区域', //默认全部区域
  }
})