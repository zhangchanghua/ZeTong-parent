//app.js
App({

  imgsrc: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/',

  onLaunch: function () {

    var that = this

    wx.login({

      success: function (res) {

        if (res.code) {

          var APPID = 'wxe5b8162c10b70f21'

          var SECRET = '06f868bdca4f476215c4a3c6d6e2af37'

          wx.request({

            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + res.code + '&grant_type=authorization_code',

            data: {},

            method: 'POST',

            success: function (ret) {

              that.globalData.openid = ret.data.openid;       //获取openid 

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

            },

            fail: function (errMsg) { console.log(errMsg) }

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

      wx.request({

        url: 'https://zetongteacher.zetongedu.com/parent/Main/mian',

        data: {
          openid: that.globalData.openid,
          long: that.globalData.long,
          lat: that.globalData.lat,
          userInfo: that.globalData.userInfo
        },

        method: 'POST',

        success: function (ret) {
          var data = ret.data
          that.globalData.city = data.city

          that.globalData.district = data.district
          console.error("data.code: " + data.code);
          if (data.code == 1) {

            wx.switchTab({ url: "/pages/main/index/index", });

          } else {
            //wx.navigateTo({ url: "/pages/login/login", })
          }

        },

        fail: function (errMsg) { console.log(errMsg) }

      })
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