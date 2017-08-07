
var app = getApp(), that;
var api = require('../../../utils/api.js');
var nation=require('../../../utils/nation.js');

var imgsrc=app.imgsrc;

Page({

data:{
    array  : [],

    array1 : [],

    array2: ['附近优先', '泽童优先'],

    index  : 0,

    index1 : 0,

    index2 : 0,

    district : '',
},

search:function(e){ //查询
        
    var that=this

    wx.request({

    url: 'https://zetongteacher.zetongedu.com?s=parent/Main/look_teacher',

        data:{

             city     : app.globalData.city,

             keyword : e.detail.value.keyword,

             lat  : app.globalData.lat,

             long : app.globalData.long

        },

        method: 'POST',  
        
        success: function(res){
           
            console.log(res.data)

            var obj=res.data

            that.setData({teacherlist:obj.teacherlist, array1 : obj.array1, array : obj.array })

        },   

    })
},

onShow : function(options){ //加载

    var that=this

    wx.request({

        url: 'https://zetongteacher.zetongedu.com?s=parent/Main/look_teacher',

        data:{

             city : app.globalData.city,

             lat  : app.globalData.lat,

             long : app.globalData.long

        },

        method: 'POST',

        success: function(res){

            console.log(res.data)

            var obj=res.data

            that.setData({teacherlist:obj.teacherlist, array1 : obj.array1, array : obj.array })

        }

    })
},

bindPickerChange: function(e) { //区域选择
    
    var that=this

    var index=e.detail.value

    var districtlist=e.target.id

    var districtList=new Array()

    districtList=districtlist.split(',')

    var district=districtList[index]

    that.setData({ district :  district, index : index })

    wx.request({

        url: 'https://zetongteacher.zetongedu.com?s=parent/Main/look_teacher',

        data:{

             city : app.globalData.city, //市

             lat  : app.globalData.lat,

             long : app.globalData.long,

             district : district //区

        },

        method:'POST',

        success:function(res){

            console.log(res.data)

            var obj = res.data

            that.setData({teacherlist:obj.teacherlist, array1 : obj.array1, array : obj.array })

        }
    })
 

},

bindPickerChange1: function(e) { //科目选择
    
    var that = this

    var index1 = e.detail.value

    var subjectlist = e.target.id

    var subjectList = new Array()

    subjectList = subjectlist.split(',')

    var subject = subjectList[index1]
    
    that.setData({ index1 :index1 })

    wx.request({

        url: 'https://zetongteacher.zetongedu.com?s=parent/Main/look_teacher',

        data:{

             city : app.globalData.city, //市

             district : that.data.district,

             subject : subject, //科目

             lat     : app.globalData.lat,

             long   : app.globalData.long

        },  

        method: 'POST',

        success: function (res) {

            console.log(res.data)

            var obj = res.data

            that.setData({teacherlist:obj.teacherlist, array1 : obj.array1, array : obj.array })

        }
    })

   

},

bindPickerChange2: function(e) { //附近优先 or 泽童优先 

    var _this = this

    var is_zetong = _this.data.array2[e.detail.value] == '附近优先'?true : false;//是否泽童
    console.log(is_zetong)
    this.setData({        index2: e.detail.value, is_zetong : is_zetong   })

},

toteacher:function(e){

    var teacherID=e.currentTarget.id

    wx.navigateTo({        url: '../../teacher/dangan/dangan?teacherID='+teacherID,    })
  
}

})