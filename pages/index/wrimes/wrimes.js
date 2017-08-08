var app = getApp(), that;
var Api = require('../../../utils/api.js');
var nation = require('../../../utils/nation.js');

var imgsrc = app.imgsrc;

Page({

  data: {

    array: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],

    objectArray: [
      {
        id: 0,
        name: '一年级'
      },
      {
        id: 1,
        name: '二年级'
      },
      {
        id: 2,
        name: '三年级'
      },
      {
        id: 3,
        name: '四年级'
      },
      {
        id: 4,
        name: '五年级'
      },
      {
        id: 5,
        name: '六年级'
      }
    ],

    index: 0, //孩子年级

    shopId: 0,

  },
  onLoad: function (e) {

    var that = this
    that.setData({ shopId: e.shopId })
    var url = Api.Url.main_signup
    var params = {
      openid: getApp().globalData.openid,
      shopId: e.shopId
    }
    Api.request(url, params, function (data) {
      that.setData({
        signupDetail: data,
        index: data.childGrade ? data.childGrade - 1 : 0
      })
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  baomingForm: function (e) {  //保存报名信息           

    var that = this

    wx.showLoading({ title: '正在保存', mask: true })

    var openid = app.globalData.openid

    var parentId = e.detail.value.parentId  //家长id

    var parentName = e.detail.value.parentName //家长姓名

    var parentPhone = e.detail.value.parentPhone    //家长手机号码

    var parentBeiName = e.detail.value.parentBeiName    //备用名称

    var parentBeiPhone = e.detail.value.parentBeiPhone  //备用电话

    var childName = e.detail.value.childName     //孩子姓名

    var childGrade = Number(that.data.index) + 1      //年级

    var shopName = e.detail.value.shopName
    var url = Api.Url.index_signupsave
    var params = {
      openid: openid,
      parentId: parentId,
      parentName: parentName,
      parentPhone: parentPhone,
      parentBeiName: parentBeiName,
      parentBeiPhone: parentBeiPhone,
      childName: childName,
      childGrade: childGrade,
      shopName: shopName,
      shopId: that.data.shopId
    }
    Api.request(url, params, function (data) {
      if (data === true) {
        wx.showToast({ title: '成功', icon: 'success', duration: 2000 })
        setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1000)
      } else {
        wx.showModal({
          title: '提示',
          content: res.data,
        })
      }
    })
  }

})