var app = getApp(), that;
var Api = require('../../../utils/api.js');
var nation = require('../../../utils/nation.js');

var imgsrc = app.imgsrc;

Page({

  data: {
    array: [],

    index: 0,

    flag: true,

    shops: [],

    city: '深圳市',

    keyword: '' //搜索内容

  },

  onLoad: function (e) {

    var that = this
    var city = app.globalData.city //城市
    var url = Api.Url.main_shops
    var params = {
      city: city,  //默认全部城市
      long: app.globalData.long,
      lat: app.globalData.lat,
    }
    Api.request(url, params, function (data) {
      that.setData({
        shops: data.shops,
        city: city,
        array: data.area
      })
    })
  },

  searchSchool: function (e) {

    this.setData({ keyword: e.detail.value })

  },

  submitSearch: function (e) { //放大镜搜索

    var that = this
    var zhi = that.data.keyword
    if (!zhi) { return false }
    var url = Api.Url.main_shop_info
    var params={
      city: app.globalData.city,
      zhi: zhi,
    }
    Api.request(url,params,function(data){
      that.setData({ shops: data })
    })
  },

  bindPickerChange: function (e) {//选择区域搜索

    var that = this
    var zhi = e.detail.value
    var index = that.data.array[zhi];
    var url = Api.Url.main_shop_info
    var params={
      city: app.globalData.city,
      district: index,  //默认全部城市
      long: app.globalData.long,
      lat: app.globalData.lat,
    }
    Api.request(url,params,function(data){
      that.setData({ shops: data })
    })
  },

  makc: function (e) {
    var tel = e.currentTarget.id
    nation.call(tel);
    return false;
  },

  to_mendian: function (e) {

    var id = e.currentTarget.id

    if (!id) { return false }

    nation.na('../../index/mendetail/mendetail?id=' + id);
  },

  yang: function () {
    console.log('yang')
    this.setData({ keyword: '' })

  }


})