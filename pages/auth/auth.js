// pages/auth/auth.js
let app = getApp();
let url = app.globalData.auth;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleGetMessage:function(e){
    console.log(e); 

    if(e!=undefined){
      var access_token = e.detail.data[0].access_token;
      var openid = e.detail.data[0].openid;

      wx.setStorageSync('access_token', access_token);
      wx.setStorageSync('openid', openid);
      wx.setStorageSync('has_auth', 1);
    }
    


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phone=wx.getStorageSync('pho')||'';
    
    console.log(url)
    

    this.setData({
      phone:phone,
      url:url
    })
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