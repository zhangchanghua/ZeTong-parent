var nation=require('../../../utils/nation.js');
var api = require('../../../utils/api.js');
var app = getApp(), that;

var imgsrc = app.globalData.userInfo.avatarUrl;

var name  = app.globalData.userInfo.nickName;

class A{
  constructor(name){
    this.name=name;
  }

  getName(){
    return name;
  }

}
Page({
  data:{

    one   : 0, //待付款

    two   : 0, //待续费

    there : 0,  //已完成

    headImg  : imgsrc, //头像

    name     : name, //姓名

    parentId : 0,

  },

  onShow:function(){  
    var a=new A('张三');
    console.error("属性测试: " + a.name);
    var that = this

    wx.request({
                  
          url: 'https://zetongteacher.zetongedu.com/parent/Main/userInfo', 

          data: {

              openid  : app.globalData.openid

          },

          method: 'POST', 

          success : function(ret){
            
              if(!ret.data.headImg){

                  that.setData({ headImg : app.globalData.userInfo.avatarUrl })

              }else{

                  that.setData({ headImg : ret.data.headImg })

              }

              if( !ret.data.name ){

                  that.setData({ name : app.globalData.userInfo.nickName  })

              }else{

                  that.setData({ name : ret.data.name  })

              }
              console.log(ret.data)

              that.setData({

                  one:ret.data.state_one,

                  two:ret.data.state_two,

                  there:ret.data.state_there,


                  parentId:ret.data.id
              })

          },
         
          fail : function(e){   wx.hideLoading()        }

    })
  },
   
  to_order:function(e){

    var parentId  = this.data.parentId

    var id=e.currentTarget.dataset.id;
    
    nation.na('../../my/indent/indent?id='+id+'&parentId='+parentId);
  },

  to_record:function(e){ //我的档案

      var parentId = this.data.parentId

      nation.na('../../my/record/record?parentId='+parentId);
  },

  to_myEvaluate:function(e){ //我的评价

      var parentId = this.data.parentId

      nation.na('../../my/myEvaluate/myEvaluate?parentId='+parentId);
  },

  to_leave:function(e){

      var parentId = this.data.parentId

        nation.na('../../my/leave/leave?parentId='+parentId);
  },

  to_message:function(e){

      var parentId = this.data.parentId

      nation.na('../../my/message/message?parentId='+parentId);
  },
  
});
