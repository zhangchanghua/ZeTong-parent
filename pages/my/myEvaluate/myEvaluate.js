var app = getApp(), that;

var imgsrc=app.imgsrc;

var star0 = imgsrc+"3.png";

var star1 = imgsrc+"4.png";

Page({

  data:{

    data: [],

    url : star0,

    headimg : star1

  },

 onLoad : function (e) {

     var that = this

     var parentId = e.parentId
     console.log(parentId)
     wx.request({

         url: 'https://zetongteacher.zetongedu.com/parent/Main/my_even',

         data: {parentId: parentId},

         method: 'POST',

         success: function (res) {
             console.log(res)
             that.setData({ data : res.data })
         }
     })
 }



})