var amapFile = require('../../../utils/amap-wx.js');
var app = getApp();
Page({
  data: {
    polyline: [],
    longitude: '',
    latitude: '',
    markers: [{
      iconPath: "../../images/mapicon_navi_s.png",
      id: 0,
      latitude: 39.989643,
      longitude: 116.481028,
      width: 23,
      height: 33
    }, {
        iconPath: "../../images/mapicon_navi_e.png",
      id: 0,
      latitude: 39.90816,
      longitude: 116.434446,
      width: 24,
      height: 34
    }],

  },
  onLoad: function () {
    var that = this;
    var map = new amapFile.AMapWX({ key: 'ef66fe05b5e248164e004e936ddc4804' });
    map.getDrivingRoute({
      origin: '116.481028,39.989643',
      destination: '116.434446,39.90816',
      success: function (data) {
        console.error(data)
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        that.setData({
          polyline: [{
            points: points,
            color: "#0091ff",
            width: 6
          }]
        });
      },
      fail: function (info) {
        console.error(info)
      }
    })
  },
})