// pages/selectStu/selectStu.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{
      gender:1,
      username:'哈哈哈哈',
      birthday:'2018-12-12',
      course:'guartar'
    },
    list: [
      {
        id: 1
      },
      {
        id: 2
      }
    ]
  },
  select:function(e){
    var stu_id=e.currentTarget.dataset.stu_id;
    var thd = e.currentTarget.dataset.third_id;
    wx.setStorageSync('stu_id', stu_id);
    wx.setStorageSync('stu_third_id', thd);
    
    wx.showToast({
      title: '切换成功',
      icon:'none',
      duration:1000,
      success:function(){
        wx.reLaunch({
          url: '../signs/signs',
        })
      }
    })
    

  },
  getInfo: function () {
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: baseUrl + 'user/getUserInfo',
      method: 'get',
      header: {
        token: token
      },
      data: {

      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.hideLoading();
          var stu = res.data.data.userinfo.student;
          that.setData({
            list: stu
          })
          //wx.hideLoading();

        } 
        if (res.data.code == 401) {
          wx.reLaunch({
            url: '../login/login',
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var my=options.my;
    if(my){
      wx.setNavigationBarTitle({
        title: '切换学员',
      })
    }

    this.getInfo();
    //var stu=wx.getStorageSync('student');
    var select = wx.getStorageSync('stu_id');

    if (select){
      this.setData({
        select_id: select
      })
    }else{
      this.setData({
        select_id: ''
      })
    }
    // if(stu){
    //   this.setData({
    //     list: stu
    //   })
    // }

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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