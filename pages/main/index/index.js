var nation = require('../../../utils/nation.js');
var api = require('../../../utils/api.js');

var app = getApp(), that;

var imgsrc=app.imgsrc;

Page({

data:{
    array: [],

    index: 0,

    flag:true,

    shops : [],

    city  : '深圳市',

    banner : [], 
},
   
onShow : function(options){
 
  var that = this

  var city  = app.globalData.city //城市
   
  wx.request({
                  
    url: api.Url.main_shops, //返回门店

      data: {
          city    : city,  //默认全部城市
          long    : app.globalData.long,
          lat     : app.globalData.lat,
          openid  : app.globalData.openid
      },

      method: 'POST', 

      success : function(ret){

          console.log(ret.data)
          that.setData({ shops : ret.data.shops, city : city, array : ret.data.area, banner : ret.data.banner })
      },
      fail : function(errMsg){  console.log(errMsg)      }

  })

},

bindPickerChange: function(e) {

  var that = this

  var zhi = e.detail.value

  var index = that.data.array[zhi];
  that.setData({
    index: zhi
  }),
  wx.request({
                  
      url: 'https://zetongteacher.zetongedu.com/parent/Main/shop_info', //返回门店

      data: {
          city        : app.globalData.city,
          district    : index,  //默认全部城市
          long        : app.globalData.long,
          lat         : app.globalData.lat,
      },

      method: 'POST', 

      success : function(ret){
 
          console.log(ret.data)
          that.setData({ shops : ret.data })
      },

      fail : function(errMsg){  console.log(errMsg)      }

  })
  
},

cancel:function(){
   this.setData({
      flag:true
   })
},
confirm:function(){
   this.setData({
      flag:true
   })
},

to_findplace:function(){
    nation.na('../../index/switchcity/switchcity');
},
 
to_map:function(){
    nation.na('../../index/search/search');
},

to_mendian:function(e){
    console.log("门店点击: "+e)
    var id = e.currentTarget.id

    if( !id ) { return false }

    nation.na('../../index/mendetail/mendetail?id='+id);
},

makc:function(e){ 
  var tel  = e.currentTarget.id
  nation.call(tel);
  return false;
},

to_his:function(){
   nation.na('../../index/seacherschool/seacherschool');
}

})