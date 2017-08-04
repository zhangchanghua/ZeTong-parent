var nation=require('../../../utils/nation.js');

var app = getApp(), that;

var imgsrc=app.imgsrc;

Page({

  data:{

    fals:true,

    months:  0,

    count_price:0, 

    is_info : 5,  //用户信息是否补全

    shopId  : 0, 

    gradeList:['一年级','二年级','三年级','四年级','五年级','六年级'],

    sign    : [],//类别

    is_xianshi  : 0, //是否显示

    jiage   : [],

    jiage_  : 0,

    is_dan  : 0,  //是单月还是缴费还是学期缴费

  },
  onLoad:function(options){

    console.log(getApp().globalData.openid)
    
    var that=this

    wx.request({

      url: 'https://zetongteacher.zetongedu.com/?s=parent/index/signupmain',

      data: {

        openid:getApp().globalData.openid,

        shopId:options.id

      },
      method: 'POST',  

      success: function(res){        
       
        var obj=res.data

        that.setData({signupDetail:obj})
        console.log(obj)
        that.setData({ is_info : obj.is_info, shopId : obj.shopId, sign : obj.sing_data })
 
      }
      
    })
  },
  
  //订单数据提交
formSubmit:function(options){

    var that = this 

    var parentId = options.detail.value.parentId //家长id

    var childId  = options.detail.value.childId //孩子id

    var shopId   = options.detail.value.shopId  //门店id

    var chooseType  = options.detail.value.chooseType.split('_')[1] //套餐类型
  
    var chooseMonths = options.detail.value.chooseMonths  //报名时长

    var count_price = options.detail.value.count_price  //总金额    

    if( !parentId || !childId ){

       wx.showModal({ title : '提示', content : '请填写报名信息', success(){ wx.redirectTo({ url: '../wrimes/wrimes?shopId='+shopId }) } })       

       return false

    }

    if( !chooseType ){ 

       wx.showModal({ title : '提示', content : '请选择套餐类型' }) 

       return false 
    }

    if( count_price == 0 ){

      wx.showModal({ title : '提示', content : '请选择缴费方式以及金额' })

      return false

    }      
 
    wx.request({

        url: 'https://zetongteacher.zetongedu.com?s=parent/Main/submitorder',

        data: {

          parentId: parentId,

          childId:  childId,

          shopId:   shopId,

          chooseType: chooseType,

          chooseMonths: chooseMonths.split('_')[0],

          count_price: count_price

        },

        method: 'POST', 

        success: function(res){  

            var data = res.data
            console.log(data)
            if( data.code == 1 ){
              wx.showModal({ title : '提示', content : data.mess, success(){ wx.redirectTo({ url: '../wrimes/wrimes?shopId='+shopId }) } })
              return false
            }

            if( data.code == 0 ){

              wx.redirectTo({url: '../../my/order/order?shopId='+shopId+'&orderId='+data.orderId})
              return false
            }
            
            wx.showModal({ title : '提示', content : data })
        }
 
           
    })

       
},

close:function(){

    this.setData({      fals:true    })

},

to_boa:function(e){
 
   var shopId = this.data.shopId

   if( !shopId ){ return false }

   wx.redirectTo({ url: '../wrimes/wrimes?shopId='+shopId })

},

more_month:function(){  //月份加1 

    if( !this.data.is_dan ){ return false }

    var  months     = this.data.months+1

    if( months<11 ){

      var  count_price = this.data.jiage_*months

      this.setData({  months: months,    count_price: count_price   })

       console.log(count_price)
    }   

   
},

less_month:function(){  //月份减去 1 

    if( !this.data.is_dan ){ return false }

    if(this.data.months>0){

      var months = this.data.months-1      

      var count_price = this.data.jiage_*months

      this.setData({  months: months, count_price: count_price   })      
     
      console.log(count_price)
    }
},

radioChange : function(e){ //缴费类型选择
  
    var that  = this

    var index = e.detail.value.split('_')[0]

    var id    = e.detail.value.split('_')[1]

    var jiage = that.data.sign[index]

    that.setData({ jiage : jiage, is_xianshi : 1, months : 1, count_price : jiage.moneyPerMonth, jiage_: jiage.moneyPerMonth, is_dan : 1  })

    console.log(jiage)

},

xiaoChange : function(e){ //缴费方式选择

    var months = e.detail.value.split('_')[0]   //几个月  10个月是10学期 享受优惠

    var jiage  = e.detail.value.split('_')[1]  //价格
    console.log( e.detail.value)
    if( months == 4.5 ){  //如果是学期

      this.setData({ is_dan : 0 })

      var count_price = jiage

    }else{

      this.setData({ is_dan : 1 })

      var count_price = jiage*months

    }

    this.setData({ jiage_ : jiage, count_price : count_price, months : 1,  })    

}


})