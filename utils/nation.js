//共用函数nation
function re(url) {
  //跳转页面
  wx.redirectTo({
    url: url
  });
}
function na(url) {
  //跳转页面
  wx.navigateTo({
    url: url
  });
}
function loadingshow() {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
}
function loadinghide() {
  wx.hideToast();
}
function call(phonenum) {
  wx.makePhoneCall({
    phoneNumber: phonenum
  })
}
function trim(obj) {
  //去空
  var str = obj.replace(/\s+/g, "");
  return str;
}
// 正则
function check(types, val) {
  // 调用check(1,'13426856878')
  var val = trim(val);
  switch (types) {
    case 1:
      //手机号
      var reg = /^1[34578]\d{9}$/;
      return reg.test(val);
      break;
    case 2:
      //6~20字符
      var reg = /\w{6,15}$/;
      return reg.test(val);
      break;
    case 3:
      //身份证号码
      var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
      return reg.test(val);
      break;
    case 4:
      // 金钱
      var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
      return reg.test(val);
      break;

    case 5:
      // 正整数
      var reg = /^\+?[1-9][0-9]*$/;
      return reg.test(val);
      break;
    default: break;
  }
}
module.exports = {
  re: re,
  na: na,
  loadingshow: loadingshow,
  loadinghide: loadinghide,
  trim: trim,
  check: check,
  call: call
}