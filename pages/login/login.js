// pages/login/login.js

let app = getApp();
let baseUrl = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    plain: true,
    check_code: '获取验证码',
    disabled: false,
    inpu_num: '',
    inpu_code: '',
    islogin: 0
  },
  inpu_num: function (e) {
    var phone = e.detail.value;
    var that = this;
    that.setData({
      inpu_num: phone
    })

    wx.setStorageSync('pho', phone);
  },
  inpu_code: function (f) {
    var qr = f.detail.value;
    console.log(qr);
    var that = this;
    that.setData({
      inpu_code: qr
    })
    wx.setStorageSync('code', qr);
  },
  getcode: function (sbs, islogin) {
    var sbs = wx.getStorageSync('pho')

    var that = this
    var count = 50;
    //var sb = that.data.inpu_num;
    clearInterval(timer) //预清除定时器，防止多个定时器同时运行

    var re = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!re.test(that.data.inpu_num)) {
     
      wx.showToast({
        title: '手机号格式有误',
        icon:'none'
      })
      return false;
    } else {
     
      wx.request({
        url: baseUrl + 'sms/send',
        method: 'POST',
        data: { 
          "mobile": sbs,
          'event': 'mobilelogin'
          },
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if(res.data.code==1){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            });

          }
        }
      })

      var timer = setInterval(function () {
        count--;
        if (count >= 1) {
          that.setData({
            check_code: count + 's后重新获取',
            disabled: true
          })
        } else {
          that.setData({
            check_code: '获取验证码',
            disabled: false
          })

          clearInterval(timer);
          that.data.isdisable = false;
        }
      }, 1000);


    }
  },
  login: function (e) {
    //var localStorage = window.localStorage;
    var that = this;
    var re = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    var sbs = wx.getStorageSync('pho')
    var phone = that.data.inpu_num;
    var qr_code = that.data.inpu_code;
    var code = wx.getStorageSync('code');
    var open_id = wx.getStorageSync('open_id');
    var id = this.data.id;
    var cid = this.data.cid;
    var curPath = this.data.curPath;
    if (phone == '' || qr_code == '') {
      // wx.showModal({
      //   title: '提示',
      //   content: '您的输入信息不完整',
      //   showCancel: false
      // })
      wx.showToast({
        title: '请填写手机号和验证码',
        icon:'none'
      })
    } else if (!re.test(that.data.inpu_num)) {
      wx.showModal({
        title: '提示',
        content: '手机号格式有误',
        showCancel: false

      });
      return false;
    } else {
      // if (open_id == "" || open_id == null || open_id == undefined) {
      //   wx.showModal({
      //     title: '提示',
      //     content: '获取授权失败，请先授权微信登录',
      //     success: function (res) {
      //       if (res.confirm) {
      //         wx.navigateTo({
      //           url: '../welogin/welogin',
      //         })
      //       } else {
      //         return false;
      //       }
      //     },
      //     fail: function () {
      //       return false;
      //     }
      //   });
      //   return false;
      // }
      wx.request({
        url: baseUrl + 'user/mobilelogin',
        method: 'POST',
          data: { "mobile": sbs, "captcha": code, "from":1},
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          if (res.data.code == 200||res.data.code==1) {

            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            that.platformLogin(sbs)
            //var is_new = res.data.data.new_member;
            wx.setStorageSync('mobile', res.data.data.mobile);
            wx.setStorageSync('token', res.data.data.userinfo.token);
            wx.setStorageSync('username', res.data.data.userinfo.username);
            wx.setStorageSync('avatar', res.data.data.userinfo.avatar);
            wx.setStorageSync('rulelist', res.data.data.userinfo.group.rules_list);
            wx.setStorageSync('userinfo', res.data.data.userinfo);
            wx.setStorageSync('student', res.data.data.userinfo.student)
            
          
            var stuLength = res.data.data.userinfo.student.length;
            //console.log(phone);
            if (stuLength>1){
              wx.reLaunch({
                url: '../selectStu/selectStu',
              })
            }else{

              if (stuLength.length==0){
                wx.showToast({
                  title: '该账号下无学员',
                  icon:'none'
                })
                return false;
              }
              wx.setStorageSync('stu_id', res.data.data.userinfo.student[0].student_id);
              wx.setStorageSync('stu_third_id', res.data.data.userinfo.student[0].third_id);
              wx.reLaunch({
                 url: '../signs/signs',
              })
            }

           
            
          }
          if (res.data.code != 1) {
            var msg = res.data.msg;
            wx.showModal({
              title: '提示',
              content: msg,
              showCancel: false,
                complete:function(){
                    if (res.data.code == 1001 || res.data.code == 1002) {
                        wx.showToast({
                          title: res.data.msg,
                          icon:'none'
                        })
                    }
                }
            })
          }

           

          if (res.data.code == 1) {
            var msg = res.data.msg;
            wx.showToast({
              title: msg,
              icon:'none'
            })
          }
          // console.log(res.data);
        }, fail: function () {

        }
      })



    }


  },
  platformLogin:function(mobile){
    var access_token = wx.getStorageSync('access_token');
    var open_id = wx.getStorageSync('openid');
    
    wx.request({
      url: baseUrl + 'wechat/platform_login',
      method: 'POST',
      data: {
        "mobile": mobile,
        'open_id': open_id,
        'access_token': access_token
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (res.data.code == 1) {
          // wx.showToast({
          //   title: res.data.msg,
          //   icon: 'none'
          // });

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var token = wx.getStorageSync('token');
    if(token){
      wx.switchTab({
        url: '../signs/signs',
      })
    }

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var mobile = wx.getStorageSync('mobile');
    // if (mobile != '' && mobile != null && mobile != undefined) {
    //   wx.navigateBack({
    //     delta: 1
    //   });
    // }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('隐藏了')
    // wx.switchTab({
    //   url: '../index/index',
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})