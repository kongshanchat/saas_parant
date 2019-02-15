// pages/orderDetails/orderDetails.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    discount: '',
    isShow: '',
    orderInfo: {}
  },
  getDevice: function (username) {
    var token = wx.getStorageSync('token');
    var that = this;

    wx.request({
      url: baseUrl + 'backend.lesson_order/get_detail',
      method: 'get',
      header: {
        token: token
      },
      data: {
        order_id: this.data.order_id,
      },
      success: function (res) {
        if (res.data.code == 1) {
          var data = res.data.data;
          wx.hideNavigationBarLoading();
          var show = false;
          if (data.status == 2) {
            show = true
          }
          that.setData({
            orderInfo: data,
            discount: data.discount * 100,
            isShow: show
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_id: options.order_id,
    })
    console.log(this.data.order_id)
    this.getDevice()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})