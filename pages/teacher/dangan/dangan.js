var app = getApp(),

    that,

    nation=require('../../../utils/nation.js');

var imgsrc=app.imgsrc;

var arrsd = [
    {
        xiguan: '',
        bodys: [
            {
                have: '4',
                ads: ''
            }
        ]
    }];

 
Page({

    data:{

        arrs: arrsd,

        is_tan : false,

        img    : '', 

        jiazhang : true, //是否显示更多

        fengcai : true, 

        rongyu : false,
    },

    loadMoreImages:function(e){ //风采展示
       
        var that=this

        var teacherId=e.target.id

        wx.request({

            url: 'https://zetongteacher.zetongedu.com?s=parent/index/loadmoreimages',

            data:{  teacherID: teacherId },

            success:function(res){                
                console.log(res.data)
                that.setData({ teacherImages:res.data,fengcai :false})
            }
        })

    },
    loadMoreCertificate:function(e){        //荣誉证书
       
        var that = this

        var teacherId = e.target.id

        wx.request({

            url: 'https://zetongteacher.zetongedu.com?s=parent/index/loadmorecertificate',

            data: {     teacherID: teacherId },

            success: function (res) {
                console.log(res)
                that.setData({ teacherCertificate: res.data, rongyu : false })

            }

        })

    },

  /*  loadMoreAssess:function(e){ //家长评价

        var that=this

        var teacherId = e.target.id 

        wx.request({

            url: 'https://zetongteacher.zetongedu.com?s=parent/index/loadmoreassess',

            data:{ teacherID:teacherId            },

            success:function(res){
                console.log(res)
               
                that.setData({assessList:res.data, jiazhang : false })

            }

        })

    },
*/
    onLoad:function(options){

        console.log(options.teacherID)

        var that=this

        wx.request({

            url: 'https://zetongteacher.zetongedu.com/?s=parent/index/teacherpro',

            data: {teacherID:options.teacherID},

            method: 'POST',

            success: function(res){             
                var obj=res.data
                console.log(obj)
                that.setData({  
                    teacherCertificate: obj.certificate,
                    teacherDetail:obj,
                    teacherImages: obj.images,                     
                    assessList: obj.assessList,
                    teacherID:options.teacherID,
                    jiazhang    : false,
                    fengcai : obj.images.length==3?true:false, 
                    rongyu  : obj.certificate.length==3?true :false,
                })
              
            }
             
        })
   
    },

    callphone:function(e){

        var tel  = e.currentTarget.id
              
        nation.call(tel);
    },

    showbig:function(e){

        wx.previewImage({

            current: 'http://www.88551.com/uploadfile/2016/0820/20160820085839912.png', // 当前显示图片的http链接

            urls: ['http://www.88551.com/uploadfile/2016/0820/20160820085839912.png','http://www.88551.com/uploadfile/2016/0820/20160820085839912.png','http://www.88551.com/uploadfile/2016/0820/20160820085839912.png'] // 需要预览的图片http链接列表
       
        })
    },

    yang : function(e){

        var src = 'https://zetongteacher.zetongedu.com/uploads/'+e.target.id
    //'https://zetongteacher.zetongedu.com/uploads/'+
        var img_ = this.data.teacherImages

        var img = [src,]

       for(var i =0; i<img_.length;i++){

            img.push('https://zetongteacher.zetongedu.com/uploads/'+img_[i])

        }

       var img = this.wen(img)

       console.log(img)

        if( !src ) return false;

        this.setData({ img : img, is_tan : true })
    },
    xiao : function(){
        this.setData({ is_tan : false })
    },

    wen : function(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }

})