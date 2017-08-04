var that,stuid;

var app = getApp(), that;

var imgsrc=app.imgsrc;

Page({

  data:{

    stuid:'',

    soa:true,

    parentId : 0

  },

cancelOrder:function(e){ //取消订单

    var that = this

    wx.showLoading({ title : '...' })

    wx.request({

      url: 'https://zetongteacher.zetongedu.com?s=parent/index/cancelorder',

      data:{

        orderId:e.target.id

      },

      success:function(res){

        var parentId=res.data

        wx.navigateTo({

          url: '../../my/indent/indent?id=0'+'&parentId='+ parentId

        })

        wx.hideLoading()

      }

    })

  },
toPay:function(e){//微信支付

     var that=this

     var out_trade_no = e.detail.value.out_trade_no

     var total_fee    = e.detail.value.total_fee

     var parentId = that.data.parentId

     wx.showLoading({ title : '...' })

      console.log(parentId)
      //发起微信预支付
     wx.request({

      url: 'https://zetongteacher.zetongedu.com?s=parent/wxpay1/wechat',

      data: {

        out_trade_no: out_trade_no,

        pay_fee: total_fee,

        openid: getApp().globalData.openid

      },

      method: 'POST',

      success: function (res) {

        wx.hideLoading()

        wx.requestPayment({

          'timeStamp': String(res.data.timeStamp),

           'nonceStr'   : String(res.data.nonceStr),

           'package'    : String(res.data.package),

           'signType'   : 'MD5',

           'paySign'    : String(res.data.paySign),

           success      : function (res) {

              wx.request({

                  url : 'https://zetongteacher.zetongedu.com/?s=parent/index/up_order',

                  data: {

                      orderId : out_trade_no

                  },

                  method: 'POST',

                  success: function (res) {

                      wx.redirectTo({    url: '../../my/indent/indent?id=2'+'&parentId='+parentId        })

                  }

              })



           },
           'fail': function (res) {

             console.log(res)

           }
        })
        
      }
    }) 

  },
onLoad:function(e){ 
 
    var that=this

    wx.showLoading({      title : 'loading..'    })

    wx.request({

      url: 'https://zetongteacher.zetongedu.com?s=parent/mime/orderpay',

      data: {

        openid:getApp().globalData.openid,

        shopId:e.shopId,

        orderId:e.orderId

      },

      method: 'POST',

      success: function(res){
        
        var obj=res.data
        console.log(obj)
        that.setData({ parentId : obj.parentId })

        that.setData({orderPayDetail:obj})

        wx.hideLoading(); 
      },
      
    })
},
 
})