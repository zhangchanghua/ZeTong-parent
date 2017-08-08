var that, stuid;
var Api = require('../../../utils/api.js');
var app = getApp(), that;

var imgsrc = app.imgsrc;

Page({

  data: {

    stuid: '',

    soa: true,

    parentId: 0

  },

  cancelOrder: function (e) { //取消订单
    var that = this
    var url = Api.Url.index_cancelorder
    var params = {
      orderId: e.target.id
    }
    Api.request(url, params, function (data) {
      var parentId = data
      wx.navigateTo({
        url: '../../my/indent/indent?id=0' + '&parentId=' + parentId
      })
    })

  },
  toPay: function (e) {//微信支付
    var that = this
    var out_trade_no = e.detail.value.out_trade_no
    var total_fee = e.detail.value.total_fee
    var parentId = that.data.parentId
    //发起微信预支付
    var url = Api.Url.wxpay1_wechat
    var params = {
      out_trade_no: out_trade_no,
      pay_fee: total_fee,
      openid: getApp().globalData.openid
    }
    Api.request(url, params, function (data) {
      wx.requestPayment({
        'timeStamp': String(data.timeStamp),
        'nonceStr': String(data.nonceStr),
        'package': String(data.package),
        'signType': 'MD5',
        'paySign': String(data.paySign),
        success: function (res) {
          var url1 = Api.Url.index_up_order
          var p = {
            orderId: out_trade_no
          }
          Api.request(rul1, p, function (data) {
            wx.redirectTo({ url: '../../my/indent/indent?id=2' + '&parentId=' + parentId })
          })
        },
        fail: function (res) {
          console.log(res)
        }
      })
    })
  },

})