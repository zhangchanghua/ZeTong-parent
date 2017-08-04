var bmap = require('../../../utils/bmap-wx.min.js');
var nation = require('../../../utils/nation.js');
var app = getApp(), that;
var imgsrc = app.imgsrc;
var wxMarkerData = [];
// 百度地图
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  onLoad: function () {

    var that = this

    var city = app.globalData.city //城市

    console.log(app.globalData.long)
    console.log(app.globalData.lat)
    wx.request({
      url: 'https://zetongteacher.zetongedu.com/parent/Main/shops', //返回门店
      data: {
        city: city,  //默认全部城市
        long: app.globalData.long,
        lat: app.globalData.lat,
      },
      method: 'POST',
      success: function (ret) {
        console.log(ret)
        var data = ret.data
        var BMap = new bmap.BMapWX({ ak: '86ebVgiA7ZCqqz5L5QbEBL9BErOE37S2' });
        for (var i = 0; i < data.shops.length; i++) {
          wxMarkerData[i] = {
            address: data.shops[i].province + data.shops[i].address,
            alpha: 1,
            height: '',
            iconPath: "http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/marker_red1.png",
            iconTapPath: "http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/marker_red1.png",
            id: data.shops[i].id,
            latitude: data.shops[i].latitude,
            longitude: data.shops[i].longitude,
            telephone: data.shops[i].telephone,
            title: data.shops[i].name,
            width: '',
          }

        }
        var success = function () {
          that.setData({ markers: wxMarkerData, latitude: app.globalData.lat, longitude: app.globalData.long, })
        }

        BMap.search({
          "query": '学校',
          success: success,
          iconPath: imgsrc + 'marker_red1.png',
          iconTapPath: imgsrc + 'marker_red1.png'
        });
      },

      fail: function (errMsg) { console.log(errMsg) }

    })


  },
  makertap: function (e) { //点击标记点时候出发
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
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

      } else {

      }
      markersTemp[i] = data[i];
    }
    that.setData({
      markers: markersTemp
    });
  },

})