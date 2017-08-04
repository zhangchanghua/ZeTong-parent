var app = getApp(), that;
var nation=require('../../../utils/nation.js');
var imgsrc=app.imgsrc;
Page({
    data:{},
    onLoad:function(options){
    
        var that=this

        wx.request({

            url: 'https://zetongteacher.zetongedu.com/?s=parent/index/lookmembers',

            data: {id:options.id},

            method:'POST',  
             
            success: function(res){
                
                console.log(res.data)

                var obj=res.data

                that.setData({memberlist:obj})
            },
            
        })
    },
    to_tas:function(e){

        var id = e.currentTarget.id
        if(!id) return false
        nation.na('../../teacher/dangan/dangan?teacherID='+id);
    },

    to_baomu:function(){
        nation.na('../baomu/baomu');
    },
   
})