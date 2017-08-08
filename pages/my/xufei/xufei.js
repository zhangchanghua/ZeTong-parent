var app = getApp(), that;
var Api = require('../../../utils/api.js');
var imgsrc = app.imgsrc;

Page({

  data: {

    list: [],

    months: 0,

    count_price: 0, //

    danyue: 0,//

    out_trade_no: 0, //订单id

    parentId: 0, //用户id 

  },

  onLoad: function (options) {

    var _this = this

    var orderId = options.orderId

    _this.setData({ out_trade_no: options.orderId })
    var url = Api.Url.main_orders
    var params = {
      orderId: orderId
    }
    Api.request(url, params, function (data) {
      _this.setData({
        list: data,
        danyue: data.orders.danyue,
        count_price: data.orders.totalMoney,
        parentId: data.parents.id
      })
      wx.setNavigationBarTitle({ title: data.shops.name })
    })
  },

  more_month: function () {  //月份加1    

    var months = this.data.months + 1

    if (months < 11) {

      var count_price = this.data.danyue * months

      this.setData({ months: months, count_price: count_price })

      console.log(count_price)
    }


  },

  less_month: function () {  //月份减去 1 

    if (this.data.months > 0) {

      var months = this.data.months - 1

      var count_price = this.data.danyue * months

      this.setData({ months: months, count_price: count_price })

      console.log(count_price)
    }
  },



  xufei: function (e) { //立即续费 

    var _this = this

    var count_price = _this.data.count_price// 总价

    var parentId = _this.data.parentId //用户id
    var url = Api.Url.wxpay1_wechat
    var params={
      out_trade_no: this.data.out_trade_no,
      pay_fee: 1/*count_price*/,
      months: _this.data.months,
      openid: getApp().globalData.openid
    }
    Api.request(url,params,function(data){
      wx.requestPayment({
        'timeStamp': String(data.timeStamp),
        'nonceStr': String(data.nonceStr),
        'package': String(data.package),
        'signType': 'MD5',
        'paySign': String(data.paySign),
        success: function (res) {
          console.log(res)
          wx.navigateBack({ delta: 2 })
        },
        'fail': function (res) {
          console.log(res)
        }
      })
    })
  }

})