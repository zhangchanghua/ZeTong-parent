var nation = require('../../../utils/nation.js');
var Api = require('../../../utils/api.js');

var app = getApp(), that;

var imgsrc = app.imgsrc;

Page({

  data: {
    array: [],

    index: 0,

    flag: true,

    shops: [],

    city: '深圳市',

    banner: [],
  },

  onShow: function (options) {
    var that = this
    var city = app.globalData.city //城市
    var url = Api.Url.main_shops
    var params = {
      city: city,  //默认全部城市
      long: app.globalData.long,
      lat: app.globalData.lat,
      openid: app.globalData.openid
    }
    Api.request(url, params, function (data) {
      that.setData({ shops: data.shops, city: city, array: data.area, banner: data.banner })
    });
  },

  bindPickerChange: function (e) {
    var that = this
    var zhi = e.detail.value
    var index = that.data.array[zhi];
    that.setData({
      index: zhi
    })

    var url = Api.Url.main_shop_info
    var params = {
      city: app.globalData.city,
      district: index,  //默认全部城市
      long: app.globalData.long,
      lat: app.globalData.lat,
    }
    Api.request(url, params, function (data) {
      that.setData({ shops: data })
    })
  },

  cancel: function () {
    this.setData({
      flag: true
    })
  },
  confirm: function () {
    this.setData({
      flag: true
    })
  },

  to_findplace: function () {
    nation.na('../../index/switchcity/switchcity');
  },

  to_map: function () {
    nation.na('../../index/search/search');
  },

  to_mendian: function (e) {
    var id = e.currentTarget.id

    if (!id) { return false }

    nation.na('../../index/mendetail/mendetail?id=' + id);
  },

  makc: function (e) {
    var tel = e.currentTarget.id
    nation.call(tel);
    return false;
  },

  to_his: function () {
    nation.na('../../index/seacherschool/seacherschool');
  }

})