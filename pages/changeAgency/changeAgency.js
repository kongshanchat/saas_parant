// pages/changeAgency/changeAgency.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  async getJoined() {
    var token = wx.getStorageSync('token');
    const data = await utils.get('user/get_my_agency', {

    }, token);
    if (data.code == 1) {
      this.setData({
        list: data.data.join_agency_list
      })
    }
  },

  changeAgency: function (e) {
    var id = e.currentTarget.dataset.id;
    var token = wx.getStorageSync('token');
    var that = this;
    var fromPage = this.data.fromPage;

    wx.request({
      url: baseUrl + 'agency/set_join_agency',
      method: 'POST',
      header: {
        token: token
      },
      data: {
        agency_id: id,
        from:1
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '切换成功',
            success: function () {
              wx.setStorageSync('student', res.data.data.userinfo.student)
                wx.reLaunch({
                  url: '../selectStu/selectStu',
                })
                //that.getJoined()
            }
          })
        }
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
          
          var userinfo = res.data.data.userinfo;
          var initagencyId = userinfo.agency.id;

          that.setData({
            initagencyId: initagencyId
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    this.getJoined()
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