var app = getApp(), that;

var imgsrc=app.imgsrc;

Page({

  data:{

    list : [],

    months  : 0,

    count_price   : 0, //

    danyue  : 0,//

    out_trade_no : 0, //订单id

    parentId : 0, //用户id 

  },  

  onLoad:function(options){
      
      var _this = this

      var orderId = options.orderId

      _this.setData({ out_trade_no : options.orderId })

      wx.request({

          url     : 'https://zetongteacher.zetongedu.com/parent/main/orders',

          method  : 'POST',

          data    : { orderId : orderId },

          success : function(e){
              console.log(e)
            _this.setData({ list  : e.data, danyue : e.data.orders.danyue, count_price : e.data.orders.totalMoney, parentId : e.data.parents.id  })

            wx.setNavigationBarTitle({ title : e.data.shops.name })

          }

      })

  },

more_month:function(){  //月份加1    

    var  months     = this.data.months+1

    if( months<11 ){

      var  count_price = this.data.danyue*months

      this.setData({  months: months,    count_price: count_price   })

       console.log(count_price)
    }   

   
},

less_month:function(){  //月份减去 1 

    if(this.data.months>0){

      var months = this.data.months-1      

      var count_price = this.data.danyue*months

      this.setData({  months: months, count_price: count_price   })      
     
      console.log(count_price)
    }
},



xufei : function(e){ //立即续费 

    var _this = this

    var count_price = _this.data.count_price// 总价

    var parentId    = _this.data.parentId //用户id

    wx.request({

      url: 'https://zetongteacher.zetongedu.com?s=parent/wxpay1/wechat',

      data: {

        out_trade_no : this.data.out_trade_no,

        pay_fee      : 1/*count_price*/,

        months       : _this.data.months,

        openid       :  getApp().globalData.openid

      },

      method: 'POST',

      success: function (res) {

        wx.hideLoading()
        console.log(res)
        wx.requestPayment({

          'timeStamp'   : String(res.data.timeStamp),

          'nonceStr'   : String(res.data.nonceStr),

          'package'    : String(res.data.package),

          'signType'   : 'MD5',

          'paySign'    : String(res.data.paySign),

          success      : function (res) {               
                   
                  console.log(res)
                  wx.navigateBack({    delta : 2   })
            

           },
           'fail': function (res) {

             console.log(res)

           }
        })
        
      }
    }) 

}


})