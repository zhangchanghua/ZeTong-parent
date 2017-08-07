var api = require('../../../utils/api.js');
var app = getApp(), that;

var imgsrc = app.imgsrc;

var statsnum = [0, 0, 0]; //初始化0

let img1 = imgsrc + '1.png',

  img2 = imgsrc + '2.png',

  img3 = imgsrc + '3.png',

  img4 = imgsrc + '4.png',

  img5 = imgsrc + 'bg1.png';


var navs = [{
  'text': '每日日报'
},
{
  'text': '查看菜谱'
},
{
  'text': '查看监控'
},
{
  'text': '每月月报'
}];

var sub = [];// 月报 作业掌握情况

var pinjian = [
  {
    xiguan: '',
    bodys: [
      {
        idd: 0,
        text: '专业水平',
        src1: img4,
        src2: img3,
        pingyu: '(专业水平：阳光正面，善于引导学生良好的学习和生活习惯)',
        ads: [
          {
            src: img4
          },
          {
            src: img4

          },
          {
            src: img4

          },
          {
            src: img4

          }, {
            src: img4

          }
        ]
      },
      {
        idd: 1,
        text: '敬业程度',
        src1: img4,
        src2: img3,
        pingyu: '(爱心等级:关心孩子的身心健康，乐于与家长交流孩子在校表现)',
        ads: [
          {
            src: img4
          },
          {
            src: img4

          },
          {
            src: img4

          },
          {
            src: img4

          }, {
            src: img4

          }
        ]
      },
      {
        idd: 2,
        text: '爱心等级',
        src1: img4,
        src2: img3,
        pingyu: '(专业水平：阳光正面，善于引导学生良好的学习和生活习惯)',
        ads: [
          {
            src: img4
          },
          {
            src: img4

          },
          {
            src: img4

          },
          {
            src: img4

          }, {
            src: img4

          }
        ]
      }]
  }];

Page({

  data: {

    nav: navs,

    foodkinds: [],

    indexs: 1,

    hides: 1,

    hidede: false,

    autp: false,

    time1: '2017-01-13', //日报时间

    month1: '2017年3月',

    stuName: '', //学生姓名

    kinds: '全托', //套餐类型

    arrs: [], //日报 

    subject: sub, //作业掌握情况

    teacher: pinjian,

    pinjia: true, //默认不显示评价

    opendetail: true,

    record: [], //视频

    bzyysp: '',//本周营养食谱

    day_teacher: [], //日报教师信息

    monreport: [], //月报信息

    byzs: '', //本月综合叙述

    mon_teacher: [], //月报教师信息

    teacherId: 0, //老师id

    childId: 0, // 学生id

    xiabiao: 0, //所要显示的监控时段类型

    play_url: '', //视频播放链接  

    is_bofang: false, //是否播放，默认不播放

    is_img: false, //图片是否显示

    aaa: 0, //图片地址

    foodname: '',//食物名字

    foodmes: [],

    start : '', //中午开始时间

    end   : '', //中午结束时间

    x_start : '', //下午开始时间

    x_end   : '', //下午结束时间

    hui     : 0, //灰色
  },

  tabtrun: function (e) {

    that = this;

    var ind = e.currentTarget.dataset.id;

    that.setData({ indexs: ind, hides: ind })

  },

  onShow: function (e) {

    var that = this

    wx.request({

      url: 'https://zetongteacher.zetongedu.com/parent/main/cao_te_me',

      data: { openid: app.globalData.openid },

      method: 'POST',

      success: function (e) {



        var data = e.data

        var arrsd = data.arrsd //日报信息

        var alllen = arrsd.length //日报长度 

        var monreport = data.monreport //月报信息

        var monreport_len = monreport.length

        for (var i = 0; i < alllen; i++) { //日报遍历

          var midlen = arrsd[i].bodys.length;

          for (var j = 0; j < midlen; j++) {

            var k = arrsd[i].bodys[j].have;

            var tems = [];

            for (var n = 0; n < 5; n++) {

              if (k - 1 >= n) {

                tems.push({ 'src': imgsrc + "biao2.png" });

              } else {

                tems.push({ 'src': imgsrc + "biao1.png" });

              }

            }
            arrsd[i].bodys[j].ads = tems;

          }

        }

        for (var i = 0; i < monreport_len; i++) { //日报遍历

          var midlen = monreport[i].bodys.length;

          for (var j = 0; j < midlen; j++) {

            var k = monreport[i].bodys[j].have;

            var tems = [];

            for (var n = 0; n < 5; n++) {

              if (k - 1 >= n) {

                tems.push({ 'src': imgsrc + "biao2.png" });

              } else {

                tems.push({ 'src': imgsrc + "biao1.png" });

              }

            }
            monreport[i].bodys[j].ads = tems;

          }

        }

        console.log(data)
        that.setData({
          arrs: arrsd,  //日报信息
          bzyysp: data.bzyysp,   //本周营养食谱
          time1: data.time1, //日报日期
          stuName: data.stuName, //日报孩子姓名
          kinds: data.kinds, //日报套餐类型
          day_teacher: data.day_teacher, //日报日报老师头像和姓名
          month1: data.month1, //月报日期
          monreport: monreport,//月报信息
          subject: data.sub,//作业掌握情况
          byzs: data.byzs, //本月综述
          mon_teacher: data.mon_teacher, //月报教师信息
          foodkinds: data.tem, //菜品
          record: data.monitor, //门店监控
          pinjia: data.pinjia,
          childId: data.childId,
          teacherId: data.teacherId,
          hidede: data.hidede,
          play_url: data.monitor.length ? data.monitor[0].play_url : '',
          is_bofang: data.monitor.length ? data.monitor[0].is_bofang : '',
        })


      }

    })

  },

  play: function (e) {

    that = this;

    this.videoContext = wx.createVideoContext('myVideo');

    this.videoContext.play();

    that.setData({ autp: true, hidede: true })

  },

  opendetail: function (e) {

    this.setData({ opendetail: !this.data.opendetail })

  },

  ks: function (e) {
    console.log(e);
  },

  pal: function () {

    this.videoContext = wx.createVideoContext('myVideo');

    this.videoContext.pause();

    this.setData({ autp: false, hidede: false })

  },

  zans: function (e) {

    var ids = e.currentTarget.dataset.index;

    var arids = e.currentTarget.dataset.arrind;

    var allindex = e.currentTarget.dataset.allindex;

    var arrlen = pinjian[allindex].bodys[arids].ads.length;

    statsnum[arids] = ids + 1

    for (var i = 0; i < arrlen; i++) {

      var datad = pinjian[allindex].bodys[arids].ads[i],

        datalen = pinjian[allindex].bodys[arids];

      if (i <= ids) {

        datad.src = datalen.src2;

      } else {

        datad.src = datalen.src1;

      }

    }
    this.setData({ teacher: pinjian })
  },

  closem: function () {

    this.setData({ pinjia: true })

  },

  formBindsubmit: function (e) { //提交数据

    var that = this

    var professional = statsnum[0]//专业水平

    var dedication = statsnum[1] //评价敬业程度

    var love = statsnum[2]//爱心等级

    var content = e.detail.value.content

    if (!professional) { wx.showModal({ title: '提示', content: '请评价专业水平' }); return false }

    if (!dedication) { wx.showModal({ title: '提示', content: '请评价敬业程度' }); return false }

    if (!love) { wx.showModal({ title: '提示', content: '请评价爱心等级' }); return false }

    wx.request({

      url: 'https://zetongteacher.zetongedu.com/parent/Main/even',

      data: {
        professional: professional,
        dedication: dedication,
        love: love,
        content: '',
        teacherId: that.data.teacherId,
        childId: that.data.childId,
      },

      method: 'POST',

      success: function (e) {

        wx.showToast({ title: '评价成功', icon: 'success', duration: 2000 })

        setTimeout(function () { that.setData({ pinjia: true }) }, 2000)
      }
    })

  },

  yang: function (e) {

    var _this = this

    var record = _this.data.record //视频

    var xiabiao = e.currentTarget.id

    var data = record[xiabiao];

    console.log(data)

    _this.setData({ play_url: data.play_url, is_bofang: data.is_bofang,
        start : data.start_time, end: data.end_time, x_start : data.start_time2,
        x_end : data.end_time2, hui : xiabiao
    })

  },
  images_: function (e) {

    var that = this

    var img  = that.data.foodkinds

    var data = e.target.id.split('_')

    var foodmes = []

    if( data[0]==1 ) {//午餐     
      var image = img[data[1]].lunch
      var dang  = image[data[2]]     
      foodmes[0] = dang
      for(var i =0; i< image.length; i++){
        if( i != data[2] ){
           foodmes.push(image[i])
        }      
      }

    }else{ //晚餐
      var image = img[data[1]].supper
      var dang  = image[data[2]]        
      foodmes[0] = dang
      for(var i =0; i< image.length; i++){
        if( i != data[2] ){
           foodmes.push(image[i])
        }      
      }
    }
    console.log(foodmes)
    that.setData({   is_img: true,  foodmes: foodmes  })

  },

  bbbb: function () {

    this.setData({ is_img: false })

  },

  report : function(e){//日报月报查教师详情

      var teacherID=e.currentTarget.id

      if( !teacherID ) return false

      wx.navigateTo({        url: '../../teacher/dangan/dangan?teacherID='+teacherID,    })
  }

})
