Page({

  data:{

    clickBol: true,

    timers: 60,

    inputContent: '',

    inputCode: '',

    authTips:'获取验证码',

    avatarUrl:'',

    code     : 0, //验证码

  },
  onLoad:function(){

    this.setData({avatarUrl:getApp().globalData.avatarUrl}) //用户头像设置

  },

  linkToIndex: function(){

    wx.showToast({title: '登录中', icon: 'loading', duration: 1000});

    var phone_number  = this.data.inputContent

    var ident_code    = this.data.inputCode
    
    if( phone_number.length !== 11  ){

        wx.showModal({ title : "提示", content : '手机号码不正确' })

        return false

    }

    if( ident_code.length !== 4 ){

        wx.showModal({ title : "提示", content : '请填写验证码' })

        return false
    }

    if( ident_code != this.data.code ){

        wx.showModal({ title : '提示', content : '验证码不正确'  })

        return false

    }
 
    wx.request({

        method:'POST',

        url: 'https://zetongteacher.zetongedu.com/parent/login/isuser',

        data:{

          phoneno      : this.data.inputContent, //手机号码
          userName     : getApp().globalData.openid, //openid
          name         : getApp().globalData.userInfo.nickName, //name
          userinfo     : getApp().globalData.userInfo  

        },
       
        success: function(res){
         
          wx.hideToast();         

          wx.switchTab({ url: '../main/index/index'    })
         
        }
    })
      
  },

  getAuth:function(){ //发短信

        var that = this;

        if(that.data.inputContent.length<11){

         wx.showModal({

            title: '提示',

            content: '你输入的号码不正确',

            success: function(res) {

              if (res.confirm) {

                console.log('用户点击确定')

              }else{

                console.log('用户点击取消')

              }

            }

          })

          return false;
        }

        if(this.data.clickBol){
          
            wx.request({

              url:'https://zetongteacher.zetongedu.com?s=parent/login/sendto',

              method:'POST',

              data:{

                phone_number:that.data.inputContent

              },
            
              success: function(res){

                var obj=res.data             

                that.setData({  clickBol: false,  authTips: that.data.timers + "s后重发", code : obj     })

                var t = setInterval(function () {

                        that.data.timers--;

                        if (that.data.timers <= 0) {

                          clearInterval(t);

                          that.setData({

                            clickBol: true,

                            timers: 60,

                            authTips: '重新获取'

                          });

                        } else {

                          that.setData({

                            authTips: that.data.timers + "s后重发"

                          });

                        }
                      }, 1000);             
              },
              fail: function(e) {

                console.log('failed!');

                console.log(e)

              },
              complete: function(res) {

                if( res == null || res.data == null ) {  

                  console.error( '网络请求失败' );  

                  return;

                }
                
              }
            })
        }
  },
      
  bindKeyInput: function(e){
   
    var that = this;

    that.setData({       inputContent: e.detail.value      })

  },

  bindCodeInput: function(e){

    var that = this;

    that.setData({     inputCode: e.detail.value      })

  },

  register : function(){

      wx.switchTab({                url: '../main/index/index',           });

  }

})
