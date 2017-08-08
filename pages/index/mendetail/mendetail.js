var nation = require('../../../utils/nation.js');
var Api = require('../../../utils/api.js');
var phone = '13458687585';

var app = getApp(), that;

var imgsrc = app.imgsrc;

Page({

  data: {

    swi: true,

    shopId: 0,

    is_hiek: 0, //是否显示价格栏目

    storedetail: [], //结果参数

    jiage: [],

    is_baoming: false, //是否报名

  },

  onLoad: function (options) {
    var that = this
    that.setData({ shopId: options.id })
    var url = Api.Url.main_storedetail
    var params = {
      id: options.id,
      openid: app.globalData.openid
    }
    Api.request(url, params, function (data) {
      that.setData({
        storedetail: data.list,
        is_baoming: data.is_baoming
      })
      wx.setNavigationBarTitle({ title: data.list.name })
    })
  },

  markcall: function (e) {

    var tel = e.currentTarget.id
    nation.call(tel);

  },

  to_map: function () { //跳转到地图页面

    nation.na('../navigation/navigation');

  },

  showcode: function () {

    this.setData({

      swi: false

    })

  },
  to_baom: function () {

    var shopId = this.data.shopId

    if (!shopId) { return false }

    wx.navigateTo({ url: '../baoming/baoming?id=' + shopId })


  },

  meng: function () {

    this.setData({

      swi: true

    })
  },

  to_meber: function () {

    nation.na('../member/member');

  },


  yang: function (e) { //套餐询价
    var that = this

    var index = e.currentTarget.id

    var jiage = that.data.storedetail.jiage[index]

    that.setData({ is_hiek: 1, jiage: jiage })
  }


})