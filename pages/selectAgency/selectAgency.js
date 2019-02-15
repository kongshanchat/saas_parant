// pages/selectAgency/selectAgency.jsssss
let app = getApp();
var page = 1;
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime');
var token = wx.getStorageSync('token')
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  // joinAgency: function () {
  //   wx.navigateTo({
  //     url: '../joinAgency/joinAgency',
  //   })
  // },
  createAgency: function () {
    wx.navigateTo({
      url: '../addAgency/addAgency',
    })
  },
  async getJoined() {
    var token = wx.getStorageSync('token');
    const data = await utils.get('/api/user/get_my_agency', {

    }, token);
    if (data.code == 1) {
      this.setData({
        joined: data.data
      })
    }
  },

  async joinInvite(agency_id, teacher_id, status) {
    var token = wx.getStorageSync('token');
    const data = await utils.post('/api/user/do_join_agency', {
      agency_id: agency_id,
      teacher_id: teacher_id,
      status: status
    }, token);
    console.log(data.code)
    if (data.code == 1) {
      this.getJoined();
      wx.showToast({
        title: data.msg,
      })
    } else {
      this.getJoined();
      wx.showToast({
        title: data.msg,
      })
    }
  },
  isJoin: function (e) {
    var agencyName = e.currentTarget.dataset.name;
    var agency_id = e.currentTarget.dataset.id;
    var teacher_id = e.currentTarget.dataset.tid;

    var that = this;
    wx.showModal({
      title: '提示',
      content: agencyName + '邀请您加入',
      success: function (res) {
        if (res.confirm) {
          that.joinInvite(agency_id, teacher_id, 1);
        } else if (res.cancel) {
          that.joinInvite(agency_id, teacher_id, 2)
        }
      }
    })
  },
  getInfo: function () {
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: baseUrl + '/api/user/getUserInfo',
      method: 'get',
      header: {
        token: token
      },
      data: {

      },
      success: function (res) {
        if (res.data.code == 1) {
          // var user = wx.getStorageSync('userinfo');
          // var initangency = user;
          // var initagencyId = initangency.agency.id;
          var userinfo = res.data.data.userinfo;
          var initagencyId = userinfo.agency.id;

          var list = res.data.data.userinfo.join_agency_list;
          var newList = [];
          // for (var i = 0; i < list.length; i++) {
          //   if (list[i].type_text == "机构所有者") {
          //     newList.push(list[i]);
          //   }
          // }
          that.setData({
            detail: res.data.data.userinfo,
            initagencyId: initagencyId
          })
          wx.hideLoading();
        }
      }
    })
  },
  select: function (e) {
    var id = e.currentTarget.dataset.id;

    var token = wx.getStorageSync('token');
    var that = this;
    var fromPage = this.data.fromPage;

    wx.request({
      url: baseUrl + '/api/agency/set_join_agency',
      method: 'POST',
      header: {
        token: token
      },
      data: {
        agency_id: id,
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '切换成功',
            success: function () {
              if (fromPage == 'index') {
                wx.reLaunch({
                  url: '../index/index',
                })
                that.getJoined()
              } else {
                wx.reLaunch({
                  url: '../index/index',
                })
                that.getJoined()
              }

            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.navigateTo({
    //   url: '../addAgency/addAgency',
    // })

   

    this.getInfo();
    this.getJoined();
   
    var index = options.fromPage
    if (index) {
      this.setData({
        fromPage: index
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
    this.getInfo();
    this.getJoined();
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