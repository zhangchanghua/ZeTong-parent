var app = getApp(), that;
var imgsrc=app.imgsrc;
Page({
  data:{
    list : [], //message
  },
  onLoad:function(options){

    var that = this

    var parentId = options.parentId

    wx.request({
        url  : 'https://zetongteacher.zetongedu.com/parent/Main/my_message',

        data : { parentId : parentId },

        method : 'POST',

        success : function (e) {
            console.log(e)
            that.setData({ list : e.data })
        }
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