//var bmap = require('../../../utils/bmap-wx.min.js');
var amapFile = require('../../../utils/amap-wx.js');
var nation = require('../../../utils/nation.js');
var Api = require('../../../utils/api.js');
var app = getApp(), that;
var imgsrc = app.imgsrc;
var wxMarkerData = [];
// 百度地图
Page({
  data: {
    showDetail: false,
    school_icon: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/bg2.png',
    location_icon: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/bg16.png',
    nav_icon: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/daohang.png',
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    showDetail: false,
    seleletShopId: '0'
  },

  onLoad: function () {
    var that = this;
    var map = new amapFile.AMapWX({ key: 'ef66fe05b5e248164e004e936ddc4804' });
    var city = app.globalData.city //城市
    var url = Api.Url.main_shops
    var params = {
      city: city,  //默认全部城市
      long: app.globalData.long,
      lat: app.globalData.lat,
      openid: app.globalData.openid
    }
    Api.request(url, params, function (data) {
      wxMarkerData = data.shops;
      for (let index in wxMarkerData) {
        wxMarkerData[index].iconPath = index == 0 ? '../../images/marker_tap.png' : '../../images/marker.png';
        wxMarkerData[index].shopId = wxMarkerData[index].id;
        wxMarkerData[index].id = index;
        wxMarkerData[index].width = 30;
        wxMarkerData[index].height = 44;
      }

      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        seleletShopId:wxMarkerData[0].shopId
      })
      that.showSearchInfo(0);
    });
    // map.getPoiAround({
    //   querykeywords: '学校',
    //   iconPathSelected: '../../images/marker_tap.png',
    //   iconPath: '../../images/marker.png',
    //   success: function (data) {
    //     wxMarkerData = data.markers;
    //     console.error(data)
    //     that.setData({
    //       markers: wxMarkerData,
    //       latitude: wxMarkerData[0].latitude,
    //       longitude: wxMarkerData[0].longitude
    //     });
    //     that.showSearchInfo(wxMarkerData, 0);
    //   },
    //   fail: function (info) {
    //     wx.showModal({ title: info.errMsg })
    //   }
    // })
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(id);
    that.changeMarkerColor(id);
  },
  showSearchInfo: function (i) {
    var that = this;
    that.setData({
      showDetail: true,
      placeData: {
        title: '名称：' + wxMarkerData[i].name + '\n',
        address: '地址：' + wxMarkerData[i].address + '\n',
        telephone: '电话：' + wxMarkerData[i].telephone
      }
    });
  },
  changeMarkerColor: function (id) {
    var that = this;
    var markersTemp = [];
    var shopId;
    for (var i = 0; i < wxMarkerData.length; i++) {
      if (i == id) {
        wxMarkerData[i].iconPath = '../../images/marker_tap.png';
        shopId = wxMarkerData[i].shopId;
      } else {
        wxMarkerData[i].iconPath = '../../images/marker.png';
      }
      markersTemp[i] = wxMarkerData[i];
    }
    that.setData({
      seleletShopId: shopId,
      markers: markersTemp
    });
  },
  to_seacrchp: function () {
    nation.na('../find/find');
  },
  to_dao: function () {
    nation.na('../navigation/navigation')
  },
  to_dea: function (e) {
    var id = e.currentTarget.id;
    console.error('id: '+id)
    if (id) {
      nation.na('../mendetail/mendetail?id=' + id)
    }
  }
})