var app = getApp(), that;
var Api = require('../../../utils/api.js');
var imgsrc=app.imgsrc;
Page({
  data:{
    list : [], //message
  },
  onLoad:function(options){
    var that = this
    var parentId = options.parentId
    var url = Api.Url.main_my_message
    var params={
      parentId: parentId
    }
    Api.request(url,params,function(data){
      that.setData({ list: data })
    })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})