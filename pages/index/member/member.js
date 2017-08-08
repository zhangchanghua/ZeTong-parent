var app = getApp(), that;
var nation = require('../../../utils/nation.js');
var Api = require('../../../utils/api.js');
var imgsrc = app.imgsrc;
Page({
  data: {},
  onLoad: function (options) {
    var that = this
    var url = Api.Url.index_lookmembers
    var params = {
      id: options.id
    }
    Api.request(url, params, function (data) {
      that.setData({ memberlist: data })
    })
  },
  to_tas: function (e) {
    var id = e.currentTarget.id
    if (!id) return false
    nation.na('../../teacher/dangan/dangan?teacherID=' + id);
  },

  to_baomu: function () {
    nation.na('../baomu/baomu');
  },

})