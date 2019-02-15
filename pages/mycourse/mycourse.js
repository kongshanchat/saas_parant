// pages/mycourse/mycourse.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  //list
  async getList() {
    var token = wx.getStorageSync('token');
    var stu_id = wx.getStorageSync('stu_id');
    const data = await utils.post('shedule/parent_student_lesson', {
      page:1,
      page_size:100,
      student_id:stu_id
    }, token);
    
    if(data.code==1){
      var list = data.data;
      this.setData({
        list: list.data
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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