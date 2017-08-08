var nation = require('../../../utils/nation.js');
var Api = require('../../../utils/api.js');
var app = getApp(), that;

var imgsrc = app.globalData.userInfo.avatarUrl;

var name = app.globalData.userInfo.nickName;

Page({
  data: {

    one: 0, //待付款

    two: 0, //待续费

    there: 0,  //已完成

    headImg: imgsrc, //头像

    name: name, //姓名

    parentId: 0,

  },

  onShow: function () {
    var that = this
    var url = Api.Url.main_userInfo
    var params = {
      openid: app.globalData.openid
    }
    Api.request(url, params, function (data) {
      var headImg;
      if (!data.headImg) {
        headImg = app.globalData.userInfo.avatarUrl;
      } else {
        headImg = data.headImg
      }
      var name;
      if (!data.name) {
        name = app.globalData.userInfo.nickName
      } else {
        name = data.name
      }
      var headImg =
        that.setData({
          headImg: headImg,
          name: name,
          one: data.state_one,
          two: data.state_two,
          there: data.state_there,
          parentId: data.id
        })
    })
  },

  to_order: function (e) {
    var parentId = this.data.parentId
    var id = e.currentTarget.dataset.id;
    nation.na('../../my/indent/indent?id=' + id + '&parentId=' + parentId);
  },

  to_record: function (e) { //我的档案
    var parentId = this.data.parentId
    nation.na('../../my/record/record?parentId=' + parentId);
  },

  to_myEvaluate: function (e) { //我的评价
    var parentId = this.data.parentId
    nation.na('../../my/myEvaluate/myEvaluate?parentId=' + parentId);
  },
  
  to_leave: function (e) {
    var parentId = this.data.parentId
    nation.na('../../my/leave/leave?parentId=' + parentId);
  },

  to_message: function (e) {
    var parentId = this.data.parentId
    nation.na('../../my/message/message?parentId=' + parentId);
  },

});
