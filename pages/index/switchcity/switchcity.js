var city = require('../../../utils/city.js');
var Api = require('../../../utils/api.js');
var app = getApp(), that;

var imgsrc=app.imgsrc;

Page({

  data: {

    searchLetter: [],

    showLetter: "",

    winHeight: 0,

    tHeight: 0,

    bHeight: 0,

    startPageY: 0,

    cityList: [],

    isShowLetter: false,

    scrollTop: 0,

    city: "",

    dqwz : '深圳市', //当前位置

    value : '',

    areaname :''

  },

  onLoad: function (options) {

    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;

    var cityList = city.cityList();
    // console.log(cityInfo);

    var sysInfo = wx.getSystemInfoSync();

    var winHeight = sysInfo.windowHeight;

    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = (winHeight-100) / searchLetter.length;

    var tempObj = [];

    for (var i = 0; i < searchLetter.length; i++) {

      var temp = {};

      temp.name = searchLetter[i];

      temp.tHeight = i * itemH+90;

      temp.bHeight = (i + 1) * itemH+90;

      tempObj.push(temp)

    }

    this.setData({

      dqwz  : app.globalData.city,

      winHeight: winHeight,

      itemH: itemH,

      searchLetter: tempObj,

      cityList: cityList

    })

  },

  searchStart: function (e) {

    console.log(e);

    var showLetter = e.currentTarget.dataset.letter;

    var pageY = e.touches[0].pageY;

    this.setScrollTop(this, showLetter);

    this.nowLetter(pageY, this);

    this.setData({
    
      showLetter: showLetter,

      startPageY: pageY,

      isShowLetter: true,

    })

  },
  searchMove: function (e) {

    var pageY = e.touches[0].pageY;

    var startPageY = this.data.startPageY;

    var tHeight = this.data.tHeight;

    var bHeight = this.data.bHeight;

    var showLetter = 0;

    // console.log(pageY);
    if (startPageY - pageY > 0) { //向上移动
      if (pageY < tHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    } else {//向下移动
      if (pageY > bHeight) {
        // showLetter=this.mateLetter(pageY,this);
        this.nowLetter(pageY, this);
      }
    }
  },

  searchEnd: function (e) {

    console.log(this.data.scrollTop);

    var scro=this.data.scrollTop+370;
    // var showLetter=e.currentTarget.dataset.letter;
    var that = this;

     that.setData({      scrollTop:scro      })

    setTimeout(function () {

      that.setData({        isShowLetter: false      })

    }, 1000)

  },
  nowLetter: function (pageY, that) {//当前选中的信息

    var letterData = this.data.searchLetter;

    var bHeight = 0;

    var tHeight = 0;

    var showLetter = "";

    for (var i = 0; i < letterData.length; i++) {

      if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {

        bHeight = letterData[i].bHeight;

        tHeight = letterData[i].tHeight;

        showLetter = letterData[i].name;

        break;

      }

    }

    this.setScrollTop(that, showLetter);

    that.setData({

      bHeight: bHeight,

      tHeight: tHeight,

      showLetter: showLetter,

      startPageY: pageY

    })

  },
  bindScroll: function (e) {
    // console.log(e.detail)
  },
  setScrollTop: function (that, showLetter) {

    var scrollTop = 0;

    var cityList = that.data.cityList;

    var cityCount = 0;

    var initialCount = 0;

    for (var i = 0; i < cityList.length; i++) {

      if (showLetter == cityList[i].initial) {

        scrollTop = initialCount * 40 + cityCount * 41;

        break;

      } else {

        initialCount++;

        cityCount += cityList[i].cityInfo.length;

      }
    }

    that.setData({      scrollTop: scrollTop    })
    
  },
  bindCity: function (e) {
    // 点击城市
    var city = e.currentTarget.dataset.city;
    
    app.globalData.city = city //赋值

    wx.switchTab({   url: '../../main/index/index',  });
  },

  yang  : function(e){
    var city = e.currentTarget.id

    app.globalData.city = city //赋值

    wx.switchTab({   url: '../../main/index/index',  });
  },
  yang_input : function (e) {
      var that = this
      var areaname = e.detail.value
      if( !areaname ){ return false }
      that.setData({areaname : areaname})
      var url = Api.Url.main_ch_city
      var params={
        areaname: areaname
      }
      Api.request(rul,params,function(data){
        that.setData({ value:data })
      })
  },
  xiao : function () {
      this.setData({ value : '' })
  },
  gang : function () {
      var value = this.data.value

      var areaname = this.data.areaname

      if( value ){

        if(value == areaname){ return false }

        if( value == '暂无数据' ){ return false }

        app.globalData.city = value //赋值

        wx.switchTab({   url: '../../main/index/index',  });
      }
  }


})