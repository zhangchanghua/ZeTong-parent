var app = getApp(), that;

var nation = require('../../../utils/nation.js');

var imgsrc=app.imgsrc;

Page({

data:{
    array: [],

    index: 0,

    flag:true,

    shops : [],

    city  : '深圳市',

    keyword : '' //搜索内容

},

onLoad:function(e){

  var that = this

  var city  = app.globalData.city //城市
   
  wx.request({
                  
      url: 'https://zetongteacher.zetongedu.com/parent/Main/shops', //返回门店

      data: {

          city    : city,  //默认全部城市

          long    : app.globalData.long,

          lat     : app.globalData.lat,

      },

      method: 'POST', 

      success : function(ret){

          wx.hideLoading()
          console.log(ret.data)
          that.setData({ shops : ret.data.shops, city : city, array : ret.data.area })
      },

      fail : function(errMsg){  console.log(errMsg)      }

  })
},

searchSchool:function(e){

    this.setData({      keyword:e.detail.value    })

},

submitSearch:function(e){ //放大镜搜索

    var that  = this

    var zhi =  that.data.keyword

    if( !zhi ) { return false }  

    wx.request({
                  
      url: 'https://zetongteacher.zetongedu.com/parent/Main/shop_info', //返回门店

      data: {

          city        : app.globalData.city,
          
          zhi         : zhi,
      },

      method: 'POST', 

      success : function(ret){

          wx.hideLoading()
           
          that.setData({ shops : ret.data })
      },

      fail : function(errMsg){  console.log(errMsg)      }

  })

},

bindPickerChange: function(e) {//选择区域搜索

  wx.showLoading({ title : '请稍等' })

  var that = this

  var zhi = e.detail.value

  var index = that.data.array[zhi];

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

          wx.hideLoading()
          console.log(ret.data)
          that.setData({ shops : ret.data })
      },

      fail : function(errMsg){  console.log(errMsg)      }

  })
  
},

makc:function(e){ 
  var tel  = e.currentTarget.id
  nation.call(tel);
  return false;
},

to_mendian:function(e){

    var id = e.currentTarget.id

    if( !id ) { return false }

    nation.na('../../index/mendetail/mendetail?id='+id);
},

yang : function(){
  console.log('yang')
  this.setData({ keyword : '' })

}


})