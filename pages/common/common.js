var app = getApp(), that;
var imgsrc=app.imgsrc;
var arrsd_zan = [
  {
    xiguan: '行为习惯',
    bodys: [
      {
        idd: 0,
        text: '餐饮习惯',
        src1: imgsrc+"biao1.png",
        src2: imgsrc+"biao2.png",
        ads: [
          {
            src: imgsrc+"biao1.png"
          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          }, {
            src: imgsrc+"biao1.png"

          }
        ]
      },
      {
        idd: 1,
        text: '午睡习惯',
        src1: imgsrc+"biao1.png",
        src2: imgsrc+"biao2.png",
        ads: [
          {
            src: imgsrc+"biao1.png"
          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          }, {
            src: imgsrc+"biao1.png"

          }
        ]
      },
      {
        idd: 2,
        text: '纪律表现',
        src1: imgsrc+"biao1.png",
        src2: imgsrc+"biao2.png",
        ads: [
          {
            src: imgsrc+"biao1.png"
          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          }, {
            src: imgsrc+"biao1.png"

          }
        ]
      }],
      
  },
  {
    xiguan: '学习习惯',
    bodys: [
      {
        idd: 0,
        text: '专注度',
        src1: imgsrc+"biao1.png",
        src2: imgsrc+"biao2.png",
        ads: [
          {
            src: imgsrc+"biao1.png"
          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          }, {
            src: imgsrc+"biao1.png"

          }
        ]
      },
      {
        idd: 1,
        text: '完成质量',
        src1: imgsrc+"biao1.png",
        src2: imgsrc+"biao2.png",
        ads: [
          {
            src: imgsrc+"biao1.png"
          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          }, {
            src: imgsrc+"biao1.png"

          }
        ]
      },
      {
        idd: 2,
        text: '坐姿',
        src1: imgsrc+"biao1.png",
        src2: imgsrc+"biao2.png",
        ads: [
          {
            src: imgsrc+"biao1.png"
          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          },
          {
            src: imgsrc+"biao1.png"

          }, {
            src: imgsrc+"biao1.png"

          }
        ]
      }]
  },

]
var arrsd_show = [
  {
    xiguan: '行为习惯',
    bodys: [
      {
        text: '餐饮习惯',
        have: '4',
        ads: ''
      },
      {

        text: '午睡习惯',
        have: '1',
        ads: ''
      },
      {

        text: '纪律表现',
        have: '3',
        ads: ''
      }]
  },
  {
    xiguan: '学习习惯',
    bodys: [
      {

        text: '专注度',
        have: '2',
        ads: ''
      },
      {

        text: '完成质量',
        have: '3',
        ads: ''
      },
      {

        text: '坐姿',
        have: '1',
        ads: ''
      }]
  },

]
  ;
Page({
  data: {
   
  },
  onLoad: function (e) {

  },
  zans: function (e) {
    // console.log(e);
    // 点赞
    var ids = e.currentTarget.dataset.index;
    var arids = e.currentTarget.dataset.arrind;
    var allindex = e.currentTarget.dataset.allindex;
    var arrlen = arrsd[allindex].bodys[arids].ads.length;
    for (var i = 0; i < arrlen; i++) {
      var datad = arrsd[allindex].bodys[arids].ads[i],
        datalen = arrsd[allindex].bodys[arids];
      if (i <= ids) {
        datad.src = datalen.src2;
      } else {
        datad.src = datalen.src1;
      }
    }
    this.setData({
      arrs: arrsd
    })
  },

  
})