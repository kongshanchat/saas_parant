// pages/setting/setting.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
// import {
//   get,
//   post
// } from "../../utils/util.js";

const utils = require('../../utils/util.js')
const regeneratorRuntime = require('../../lib/runtime')
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
    async editSetting(avatar) {
      var token = wx.getStorageSync('token');
      const data = await utils.get("/api/user/profile", {
        avatar: avatar
      }, token);
      this.setData({
        avatar:avatar
      })
      console.log(data)
    },
  avatar: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0];

        var token = wx.getStorageSync('token');
       
        
        console.log(tempFilePaths);
        
        wx.uploadFile({
          url: baseUrl + '/api/common/upload',
          filePath: tempFilePaths,
          name: 'file',
          header: {
             token: token
          },
          formData: {
            'file': tempFilePaths
          },
          success: function (res) {
            
            var Tojson=JSON.parse(res.data)
            if (Tojson.code == 1 || Tojson.code==200) {
              console.log(Tojson.data.url)
              var avatar = Tojson.data.url;
              that.changeInfo(avatar)
            }
          }
        })


      }
    })
  },
  getsInfo: function () {
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
          //console.log(res.data.data.userinfo.avatar);
          wx.hideNavigationBarLoading();
          that.setData({
            username: res.data.data.userinfo.username,
            avatar: res.data.data.userinfo.avatar
          })
        }
      }
    })
  },
  getInfo:function(){
    wx.hideNavigationBarLoading();
    var token = wx.getStorageSync('token');
    var that = this;
    app.setting.getInfomation(token).then(res=>{
      console.log(res)
    }).catch(res=>{

    })
  },
  changeInfo: function (avatar) {
    var token = wx.getStorageSync('token');
    var that = this;
    console.log(avatar)
    wx.request({
      url: baseUrl + '/api/user/profile',
      method: 'post',
      header: {
        "Content-type":'application/x-www-form-urlencoded',
        token: token
      },
      data: {
        avatar: avatar
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '修改成功',
          })
          that.getsInfo()

        }
      }
    })
  },
  username: function (e) {
    var username = e.currentTarget.dataset.username;
    wx.navigateTo({
      url: '../editUsername/editUsername',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var avatar = options.avatar;
    var username = options.username;
    wx.showNavigationBarLoading();
    this.setData({
      avatar: avatar,
      username: username
    })
   //this.getData()
  },
   async getData() {
     var token = wx.getStorageSync('token');
     const data = await utils.get("/api/topic_post/get_list", {
       page: 1
     },token);
     console.log(data)
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
    this.getsInfo();
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