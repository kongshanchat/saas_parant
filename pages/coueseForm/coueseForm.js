// pages/coueseForm/coueseForm.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime')
var page = 1;
var a;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:88,
    vlist:[],
    
  },
  mycourse:function(){
    wx.navigateTo({
      url: '../mycourse/mycourse',
    })
  },
  async getList() {
    var that=this;
    var token = wx.getStorageSync('token');
    var stu_id = wx.getStorageSync('stu_id');
    var vlist = that.data.vlist;

    const data = await utils.post('shedule/shedule_record', {
      page:page,
      page_size:4,
      student_id:stu_id
    }, token);

    if (data.code == 1) {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      var list = data.data.data;
      for (var i = 0; i < list.length; i++) {
        vlist.push(list[i]);
      }


      this.setData({
        list: vlist,
        has_more: data.data.has_more,
        allData: data.data
      })
    }

  },
  async getLists() {
    var that = this;
    var token = wx.getStorageSync('token');
    var stu_id = wx.getStorageSync('stu_id');
    

    const data = await utils.post('shedule/shedule_record', {
      page: 1,
      page_size: 4,
      student_id: stu_id
    }, token);

    if (data.code == 1) {
      var vlist = [];
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
      var list = data.data.data;
      for (var i = 0; i < list.length; i++) {
        vlist.push(list[i]);
      }

      wx.showToast({
        title: '刷新成功',
        icon: 'none'
      })
      page=1;



      this.setData({
        list: vlist,
        has_more: data.data.has_more,
        allData: data.data,
        vlist: vlist
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    page=1;
    wx.showLoading({
      title: '正在加载中',
    })
    this.getList();
    console.log(page);
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
    page = 1;
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
    wx.showNavigationBarLoading();
    this.getLists();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var has_more = this.data.has_more;
    
    if (has_more === false) {
      return false
    }
    if (has_more == true) {
      wx.showNavigationBarLoading();
      page++;
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {



  }
})