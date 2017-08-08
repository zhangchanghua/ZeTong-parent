var app = getApp(), that;
var Api = require('../../../utils/api.js');
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
     var url = Api.Url.main_my_even
     var params={
       arentId: parentId
     }
     Api.request(url,params,function(data){
       that.setData({ data: data })
     })
     
 }



})