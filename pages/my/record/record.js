var nation=require('../../../utils/nation.js');

var app = getApp(), that;

var imgsrc = app.globalData.userInfo.avatarUrl;

Page({

  data:{

    array: ['男', '女'],

    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }

    ],

    childarray: ['男', '女'],

    childobjectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      }

    ],

    sors:false,

    parentSex: 0,

    childSex: 0,

    obj : [],

    parentId : 0,

    p_img : imgsrc, //家长头像

    c_img : imgsrc

  },
  
onLoad:function(options){

    var that = this

    wx.showLoading({ title : "loading..." })

    var parentId = options.parentId == 'undefined'?0:options.parentId

    that.setData({ parentId : parentId })

    wx.request({ //家长孩子信息

        url: 'https://zetongteacher.zetongedu.com/parent/Main/parent_info',

        data :{  parentId : parentId  },

        method : 'POST',

        success : function(e){
            console.log(e)
            wx.hideLoading()
            if(e.data.one){

                that.setData({

                    obj : e.data,

                    parentSex : e.data.one.p_sex?e.data.one.p_sex:0,

                    childSex : e.data.one.c_sex?e.data.one.c_sex:0,

                    p_img : e.data.one.img?e.data.one.img:app.globalData.userInfo.avatarUrl,

                    c_img : e.data.one.image?e.data.one.image:app.globalData.userInfo.avatarUrl

                })
            }else{

                that.setData({ p_img : app.globalData.userInfo.avatarUrl, c_img : app.globalData.userInfo.avatarUrl })

            }

        },

        fail : function (error) { console.log(error) }

    })


  },
  sor:function(e){

    this.setData({      sors:!this.data.sors    })

  },
  bindPickerChange: function (e) {

    console.log(e.detail.value)

    this.setData({    parentSex: e.detail.value   })

  },
  bindPickerchildChange: function (e) {

    console.log(e.detail.value)

    this.setData({   childSex: e.detail.value })

  },

pimg : function(){ //家长头像上传

  var that = this
  
  var parentId = that.data.parentId == 'undefined'?0:that.data.parentId
 
  wx.chooseImage({

    count: 1,  

    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

    success: function (res) {
      
      wx.showLoading({ title : '正在上传...' })

      var tempFilePaths = res.tempFilePaths
 
      wx.uploadFile({
        
        url       : 'https://zetongteacher.zetongedu.com/parent/Main/img_',
        
        filePath  : tempFilePaths[0],

        name      : 'image',

        formData:{ parentId : parentId, openid : app.globalData.openid },

        header: { "Content-Type": "multipart/form-data" },
          
        success: function(e){

            wx.hideLoading()

            if(e.statusCode === 200){

                var data = JSON.parse(e.data)
                console.log(data)
                var p_img = data.url

                var parentId = data.parentId
              
                that.setData({ p_img : p_img, parentId : parentId })

            }else{
                console.log(e)
            }
            
        },
                
      })
    }

  })
},

cimg : function(){ //上传学生头像

        var that = this
        
        if( !that.data.parentId ){
          wx.showModal({ title : '提示', content : '请先上传家长头像' })
          return false
        }

        wx.chooseImage({

            count: 1,

            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有

            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

            success: function (res) {

                wx.showLoading({ title : '正在上传..' })

                var tempFilePaths = res.tempFilePaths

                wx.uploadFile({

                    url       : 'https://zetongteacher.zetongedu.com/parent/Main/c_img',

                    filePath  : tempFilePaths[0],

                    name      : 'image',

                    formData:{ parentId : that.data.parentId },

                    header: { "Content-Type": "multipart/form-data" },

                    success: function(e){
                        console.log(e)
                        var data = e.data.replace('"','').replace(/[\\]/g,'').replace('"','')
                        wx.hideLoading()
                        that.setData({ c_img : data })
                    },

                })
            }

        })
},

formSubmit : function (e) {//保存修改用户孩子信息

    var that = this

    var data = e.detail.value

    var p_name = data.p_name //家长姓名

    var p_phone = data.phone //家长手机号码

    var parentSex = that.data.parentSex  //家长性别

    var childSex  = that.data.childSex  //孩子性别

    var parentId  = that.data.parentId //家长id
    console.error("parentId: " + parentId)
    if( !parentId ){        wx.showModal({ title : '提示', content: ' 请您先上传头像' });        return false   }

    if( !p_name ){        wx.showModal({ title : '提示', content : '请您填写您的姓名' });        return false    }

    if( !p_phone ){        wx.showModal({ title : '提示', content : '请填写您的手机号码' });        return false    }

    wx.request({

        url      : 'https://zetongteacher.zetongedu.com/parent/Main/up_info',

        method   : 'POST',

        data     : {
            p_name  : p_name,

            p_phone : p_phone,

            parentSex   : parentSex,

            childSex    : childSex,

            parentId    : parentId
        },

        success : function (e) {
            if(e.data == 1){
                wx.showToast({  title: '成功',  icon: 'success',  duration: 2000})

                setTimeout(function(){ wx.navigateBack({  delta: 1 }) },2000)
            }else{
                wx.showModal({ title : '提示', content : e.data })
            }
        }
    })

}

})


