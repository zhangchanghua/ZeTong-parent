var app = getApp(), that;

var nation = require('../../../utils/nation.js');

var imgsrc=app.imgsrc;

Page({

    data:{

        array: ['一年级', '二年级', '三年级', '四年级','五年级','六年级'],

        objectArray: [
            {
                id: 0,
                name: '一年级'
            },
            {
                id: 1,
                name: '二年级'
            },
            {
                id: 2,
                name: '三年级'
            },
            {
                id: 3,
                name: '四年级'
            },
            {
                id: 4,
                name: '五年级'
            },
            {
                id: 5,
                name: '六年级'
            }
        ],

        index: 0, //孩子年级

        shopId : 0, 

    },
    onLoad:function(e){

        var that=this

        that.setData({ shopId : e.shopId })
        
        wx.showLoading({      title : 'loading..'    })

        wx.request({

            url: 'https://zetongteacher.zetongedu.com/parent/Main/signup',

            data: {

                openid   : getApp().globalData.openid,

                shopId  :  e.shopId
            },

            method:'POST',

            success: function(res){

                var obj=res.data
                console.log(obj)
                that.setData({

                    signupDetail:obj,

                    index : obj.childGrade?obj.childGrade-1 : 0
                })

                wx.hideLoading();

            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    },

    bindPickerChange: function (e) {
         
        console.log('picker发送选择改变，携带值为', e.detail.value)

        this.setData({

            index: e.detail.value

        })

    },

    baomingForm:function(e){  //保存报名信息           

        var that = this 
        
        wx.showLoading({ title:'正在保存', mask :true })

        var openid = app.globalData.openid  

        var parentId = e.detail.value.parentId  //家长id

        var parentName = e.detail.value.parentName //家长姓名

        var parentPhone = e.detail.value.parentPhone    //家长手机号码

        var parentBeiName = e.detail.value.parentBeiName    //备用名称

        var parentBeiPhone = e.detail.value.parentBeiPhone  //备用电话

        var childName        = e.detail.value.childName     //孩子姓名
    
        var childGrade         = Number(that.data.index)+1      //年级

        var shopName            = e.detail.value.shopName
       
        wx.request({

            url: 'https://zetongteacher.zetongedu.com?s=parent/index/signupsave',

            data: {

                openid      : openid,

                parentId    : parentId,

                parentName  : parentName,

                parentPhone : parentPhone,

                parentBeiName  : parentBeiName,

                parentBeiPhone : parentBeiPhone,

                childName      : childName,

                childGrade     : childGrade,

                shopName       : shopName,

                shopId         : that.data.shopId
            },

            method:'POST',

            success: function(res){                
                wx.hideLoading()
                if( res.data === true ){

                    wx.showToast({  title: '成功',  icon: 'success',  duration: 2000})

                    setTimeout(function(){ wx.navigateBack({delta: 1}) },1000)

                }else{

                    wx.showModal({

                        title: '提示',

                        content: res.data,

                    })

                    return false
                }

                console.log(res)
            },

            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }

})