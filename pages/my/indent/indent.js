var that, statusid;
var nation = require('../../../utils/nation.js');
var Api = require('../../../utils/api.js');
var app = getApp(), that;
var imgsrc = app.imgsrc;

Page({
  data: {

    status: '',

    showa: true,

    list: [],  //详细信息

  },

  onLoad: function (e) {
    // id:0-待付款，1：待续费，2:已完成
    statusid = e.id;

    var parentId = e.parentId

    that = this;

    if (parentId == 0) {

      that.setData({ list: [], status: statusid, showa: false })
      return false
    }
    var url = Api.Url.main_my_indent
    var params = {
      parentId: parentId,
      payState: statusid
    }
    Api.request(url, params, function (data) {
      that.setData({ list: data, status: statusid, showa: false })
    })
  },

  to_orderdeta: function (e) {

    var orderId = e.currentTarget.id.split('-')[0]

    var shopId = e.currentTarget.id.split('-')[1]
    if (statusid == 0 || statusid == 2) {

      nation.na('../order/order?shopId=' + shopId + '&orderId=' + orderId);

    } else if (statusid == 1) {

      nation.na('../xufei/xufei?orderId=' + orderId);

    }

  }

})