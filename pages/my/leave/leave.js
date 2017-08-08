var app = getApp(), that;
var Api = require('../../../utils/api.js');
var imgsrc = app.imgsrc;

var img1 = imgsrc + "gou1.png",

  img2 = imgsrc + "gou2.png",

  scroll = 0,

  arr = [
    {
      imgs: img2,
      text: '午托',
      sta: false
    },
    {
      imgs: img2,
      text: '晚托',
      sta: false
    }
  ];

var date = [];

Page({

  data: {

    imgchoose: arr,

    dates: date,

    indes: 0,

    time_: '',

    wu: false,

    wan: false,

  },
  onLoad: function (options) {
    var _this = this
    var url = Api.Url.main_weeks
    var parmas = {
      openid: app.globalData.openid
    }
    Api.request(url, parmas, function (data) {
      _this.setData({ dates: data.data, wu:data.wu, wan: data.wan })
    })

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  goLeave: function (options) {

    var _this = this

    var typeqj = '';

    if (arr[0].sta == true && arr[1].sta == false) {

      typeqj = 0;

    } else if (arr[0].sta == false && arr[1].sta == true) {

      typeqj = 1;

    } else if (arr[0].sta == true && arr[1].sta == true) {

      typeqj = 2;

    } else {

      wx.showModal({ title: '提示', content: '请选择请假项目' })

    }
    var url = Api.Url.main_goleave
    var params={
      type: typeqj,
      reasons: options.detail.value.reasons,
      openid: app.globalData.openid,
      ltime: _this.data.time_
    }
    Api.request(url,params,function(data){
      if (data != 1) {
        wx.showModal({ title: '提示', content: data })
        return false
      }
      wx.showToast({ title: '请假成功', icon: 'success', duration: 2000 })
      setTimeout(function () { wx.switchTab({ url: '../../main/my/my' }) }, 2000)
    })
  },

  xuaz: function (e) {

    var ids = e.currentTarget.dataset.ids;

    arr[ids].sta = !arr[ids].sta;

    console.log(arr[ids].sta)

    if (arr[ids].sta) {

      arr[ids].imgs = img1;

    } else {

      arr[ids].imgs = img2;

    } this.setData({ imgchoose: arr })
  },

  chosto: function (e) {

    var suds = e.currentTarget.dataset.ide

    var time_ = e.currentTarget.id//请假时间

    this.setData({ indes: suds, time_: time_ })

  }


})