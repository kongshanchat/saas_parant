// pages/signs/signs.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime')
var page = 1;
var a;
Page({
  /**
   * 页面的初始数
   */
  data: {
    list: [{
        id: 1,
        title: '帕格尼尼哈哈哈哈哈哈哈哈',
        num: 333,
        status: 0,
        date: '2018-12-12',
        time: '09:30-10:30',
        teacher: '张老四',
        course: '小提琴'
      },
      {
        id: 1,
        title: '帕格尼尼哈22s',
        num: 999,
        status: 1,
        date: '2018-12-15',
        time: '05:30-10:30',
        teacher: '张老四',
        course: '小提琴'
      },
    ],
    future: [],
    vlist: []
  },

  toBottom: function() {

  },
  //list
  async getList() {
    var token = wx.getStorageSync('token');
    var stu_id = wx.getStorageSync('stu_id');
    var that = this;
    const data = await utils.get('shedule/parent_get_lesson', {
      student_id: stu_id,
      page: page,
      page_size: 5
    }, token);

    if (data.code == 1) {
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      
      var vlist = that.data.vlist;
      var list = data.data.data;

      
      var datas = data.data.data.future;
      
      for (var i = 0; i < datas.length; i++) {
        vlist.push(datas[i]);
      }

      that.setData({
        future: vlist,
        today: data.data.data.today,
        has_more: data.ext.has_more,
        
      })


      // this.setData({
      //   today: list.today,
      //   future:list.future
      // })
    }

  },
  async getLists() {
    var token = wx.getStorageSync('token');
    var stu_id = wx.getStorageSync('stu_id');
    var that = this;
    const data = await utils.get('shedule/parent_get_lesson', {
      student_id: stu_id,
      page: 1,
      page_size: 5
    }, token);

    if (data.code == 1) {
      page = 1;
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      var vlist = [];
      var list = data.data.data;


      var datas = data.data.data.future;

      for (var i = 0; i < datas.length; i++) {
        vlist.push(datas[i]);
      }

      wx.showToast({
        title: '刷新成功',
        icon:'none'
      })

      that.setData({
        future: vlist,
        today: data.data.data.today,
        has_more: data.ext.has_more,
        vlist: vlist
      })


     
    }

  },

 



  refreshToken: function() {
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: baseUrl + 'token/refresh',
      method: 'POST',
      header: {
        token: token
      },
      data: {

      },
      success: function(res) {
        if (res.data.code == 1) {
          wx.setStorageSync('token', res.data.data.token)
        } else if (res.data.code == 401) {
          wx.removeStorageSync('token');
          wx.showToast({
            title: 'token已失效，重新登录',
            duration: 1000,
            success: function() {
              wx.reLaunch({
                url: '../login/login',
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '正在加载中',
    })

    this.getList();

    var token = wx.getStorageSync('token');
    var is_stu = wx.getStorageSync('stu_id');

    if (token) {
      this.refreshToken();
    }
    console.log(is_stu)

    if (token == undefined || token == null || token == '') {
      wx.reLaunch({
        url: '../login/login',
      })
    }

    if (is_stu == undefined || is_stu == '') {
      wx.reLaunch({
        url: '../selectStu/selectStu',
      })
    }




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
    page = 1;
    var token = wx.getStorageSync('token');
    //this.getInfo();
    if (token == undefined || token == null || token == '') {
      wx.reLaunch({
        url: '../login/login',
      })
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
    console.log('shuaxin');
    // this.setData({
    //   vlist:[]
    // })

     wx.showNavigationBarLoading();
    this.getLists();

    
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log('daodilexsx');
    var that = this;
    var has_more = this.data.has_more;
    if (has_more === false) {
      return false
    }
    if (has_more == true) {
      page++;
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})