//host
var HOST = 'https://zetongteacher.zetongedu.com/parent/';

var Url = {
  login_isuser: HOST + 'login/isuser',//
  login_sendto: HOST + 'login/sendto',//发送验证码
  main_main: HOST + 'Main/mian',//小程序登录
  main_shops: HOST + 'Main/shops',//首页返回门店
  main_shop_info: HOST + 'Main/shop_info',//返回门店
  main_cao_te_me: HOST + 'Main/cao_te_me',//校区接口
  main_even: HOST + 'Main/even',//评价老师
  main_userInfo: HOST + 'Main/userInfo',//我的信息
  main_look_teacher: HOST + 'Main/look_teacher',//老师列表
  main_my_indent: HOST + 'Main/my_indent',//我的订单
  main_weeks: HOST + 'Main/weeks',//
  main_goleave: HOST + 'Main/goleave',//我要请假
  main_my_message: HOST + 'Main/my_message',//我的消息
  main_my_even: HOST + 'Main/my_even',//我的评价
  main_parent_info: HOST + 'Main/parent_info',//家长信息
  main_up_info: HOST + 'Main/up_info',//用户信息修改
  main_orders: HOST + 'Main/orders',//订单列表
  main_submitorder: HOST + 'Main/submitorder',//提交订单
  main_storedetail: HOST + 'Main/storedetail',//
  main_ch_city: HOST + 'Main/ch_city',//
  main_signup: HOST + 'Main/signup',//
  index_loadmoreimages: HOST + 'index/loadmoreimages',//风采展示
  index_loadmorecertificate: HOST + 'index/loadmorecertificate',//荣誉证书
  index_teacherpro: HOST + 'index/teacherpro',//老师简介
  index_cancelorder: HOST + 'index/cancelorder',//取消订单
  index_up_order: HOST + 'index/up_order',//
  index_signupmain: HOST + 'index/signupmain',//
  index_lookmembers: HOST + 'index/lookmembers',//查看成员
  index_signupsave: HOST + 'index/signupsave',//
  wxpay1_wechat: HOST + 'wxpay1/wechat',//微信支付

}
//请求
function request(url, params, success, fail, showLoading) {
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  var that = this;
  console.log('请求: ' + url)
  wx.request({
    url: url,
    data: params,
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      if (success && typeof success == 'function') {
        success(res.data)
      }
    },
    fail: function (e) {
      console.error('请求异常:' + e.errMsg)
      //console.error(e);
      if (fail && typeof fail == 'function') {
        fail(e)
      }
    },
    complete: function () {
      wx.hideLoading();
    }
  })
}

module.exports = {
  Url: Url,
  request: request,
}

