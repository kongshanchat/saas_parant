// pages//editUsername/editUsername.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  inputs:function(e){
    var username=e.detail.value;
    this.setData({
      username: username
    })

  },
  changeInfo: function (username) {
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: baseUrl + '/api/user/profile',
      method: 'post',
      header: {
        "Content-type": 'application/x-www-form-urlencoded',
        token: token
      },
      data: {
        username: username
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '修改成功',
          })
         
          wx.navigateBack({
            delta:1
          })

        }
      }
    })
  },
edit:function(){
  var that=this;
var username=this.data.username;
if(username==''){
wx.showToast({
  title: '用户名不能为空',
  image:'../../images/warn.png'
})
}else{
  that.changeInfo(username)
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