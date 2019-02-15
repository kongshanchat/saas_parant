// pages/commentDetail/commentDetail.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime');
var a;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      teacher: '哈哈哈',
      img: '../../images/avatar.png',
      cont: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      pic: ['../../images/a.jpg', '../../images/a.jpg']
    }
  },
  preview: function(e) {
    var cur = e.currentTarget.dataset.cur;
    var pics = e.currentTarget.dataset.pic;
    console.log(cur)
    console.log(pics)
    a = true;
    wx.previewImage({
      current: cur, // 当前显示图片的http链接
      urls: pics // 需要预览的图片http链接列表
    })
  },
  async getDetail() {
    var token = wx.getStorageSync('token');
    var cid = this.data.cid;
    var that = this;
    const data = await utils.get('shedule_comment/get_info', {
      shedule_comment_id: cid
    }, token);

    if (data.code == 1) {
      wx.hideLoading();





      that.setData({
        detail: data.data
      })



    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cid = options.id;
    this.setData({
      cid: cid
    })
    this.getDetail();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (a) {
      a = false;
      return;
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})