//host
var HOST = 'https://zetongteacher.zetongedu.com/parent';
var Url = {
  main_main: HOST + '/Main/mian',//小程序登录
  main_shops: HOST + '/Main/shops',//首页返回门店
}
//请求
function request(url, data, success, fail, showLoading) {
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
    })
  }
  var that=this;
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    success: success,
    fail: fail,
    complete: function () {
      wx.hideLoading();
    }
  })
}

module.exports = {
  Url: Url,
  request: request,
}

