var bmap = require('../../../utils/bmap-wx.min.js');
var nation = require('../../../utils/nation.js');
var wxMarkerData = [];
var app = getApp(), that;
var imgsrc=app.imgsrc;
// 百度地图
Page({
    data: {
        markers: [],
        latitude: '',
        longitude: '',
        showDetail:false,
        school_icon:'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/bg2.png',
        location_icon: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/bg16.png',
        nav_icon: 'http://dantong.oss-cn-shenzhen.aliyuncs.com/tongdong/daohang.png',
        placeData: {}
    },
    makertap: function(e) {
        var that = this;
        var id = e.markerId;
        that.showSearchInfo(wxMarkerData, id);
        that.changeMarkerColor(wxMarkerData, id);
    },
    
    onLoad: function() {
        var that = this;
        var BMap = new bmap.BMapWX({
            ak: '86ebVgiA7ZCqqz5L5QbEBL9BErOE37S2'
        });
        var fail = function(data) {
            console.log(data)
        };
        var success = function(data) {
            wxMarkerData = data.wxMarkerData;
            that.setData({
                markers: wxMarkerData,
                latitude: wxMarkerData[0].latitude,
                longitude: wxMarkerData[0].longitude,
                placeData: {
                  title: '名称：' + wxMarkerData[0].title + '\n',
                  address: '地址：' + wxMarkerData[0].address + '\n',
                  telephone: '电话：' + wxMarkerData[0].telephone
                },
                showDetail:true
            });
        }
        BMap.search({
            query: '学校',
            fail: fail,
            success: success,
            iconPath: imgsrc+'marker_red1.png',
            iconTapPath: imgsrc+'marker_red1.png'
        });
    },
    showSearchInfo: function(data, i) {
        var that = this;
        that.setData({
          
            placeData: {
                title: '名称：' + data[i].title + '\n',
                address: '地址：' + data[i].address + '\n',
                telephone: '电话：' + data[i].telephone
            }
        });
    },
    changeMarkerColor: function(data, id) {
        var that = this;
        var markersTemp = [];
        for (var i = 0; i < data.length; i++) {
            if (i === id) {
                // 跳转
                // nation.na('../../');
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
    to_dao:function(){
        nation.na('../navigation/navigation')

    },
    to_dea:function(){
        nation.na('../mendetail/mendetail')
    }
})