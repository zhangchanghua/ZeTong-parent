var bmap = require('../../../utils/bmap-wx.min.js');
var nation = require('../../../utils/nation.js');
var app = getApp(), that;
var imgsrc = app.imgsrc;
var wxMarkerData = [];
var map = null;
// 百度地图
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '86ebVgiA7ZCqqz5L5QbEBL9BErOE37S2'
    });
    map = BMap;
  },
  onShow: function () {
    var that = this;
    console.log(map);
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    map.search({
      query: '学校',
      fail: fail,
      success: success,
      iconPath: imgsrc + 'marker_red1.png',
      iconTapPath: imgsrc + 'marker_red1.png'
    });
  },

  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor: function (data, id) {
    var that = this;
    var markersTemp = [];
    for (var i = 0; i < data.length; i++) {
      if (i === id) {
        // 跳转
        nation.na('../place/search');
        // data[i].iconPath = imgsrc+"marker_yellow.png";
      } else {
        // data[i].iconPath = imgsrc+"marker_red.png";
      }
      markersTemp[i] = data[i];
    }
    that.setData({
      markers: markersTemp
    });
  },
  to_seacrchp: function () {
    nation.na('../find/find');
  }
})