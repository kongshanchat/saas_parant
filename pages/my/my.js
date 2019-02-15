// pages/my/my.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  order:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },
  fankui:function(){
    wx.navigateTo({
      url: '../fankui/fankui',
    })
  },
  egency:function(e){
    var id=e.currentTarget.dataset.id;
    var logo = e.currentTarget.dataset.logo;
    var url = encodeURIComponent(logo);
    var name=e.currentTarget.dataset.name;
    var mobile = e.currentTarget.dataset.mobile;
    var address = e.currentTarget.dataset.address;
    console.log(logo)
    wx.navigateTo({
      url: '../editAgency/editAgency?' + 'id=' + id + '&address=' + address + '&mobile=' + mobile + '&name=' + name + '&logo=' + url,
    })
  },
  selectEgency:function(){
    wx.navigateTo({
      url: '../changeAgency/changeAgency',
    })
  },
  loginOut:function(){
    var token = wx.getStorageSync('token');
    var that = this;
    wx.request({
      url: baseUrl + 'user/logout',
      method: 'get',
      header: {
        token: token
      },
      data: {

      },
      success:function(){
        wx.removeStorageSync('token');
        wx.removeStorageSync('stu_id');
        wx.reLaunch({
          url: '../login/login',
        })
      }
      })
  },
  getInfo:function(){
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
          wx.hideLoading();
          that.setData({
           detail:res.data.data.userinfo,
           logo: res.data.data.userinfo.agency.logo,
           name: res.data.data.userinfo.agency.name,
           type_text: res.data.data.userinfo.agency.type_text
          })
          wx.hideLoading();

        }else if(res.data.data==null){
          // wx.reLaunch({
          //   url: '../login/login',
          // })
          // 在工作中 我都是很想把这份事情做好  但
        }
          if(res.data.code == 401){
              wx.reLaunch({
                  url: '../login/login',
              })
          }
          
      }
    })
  },
  setting:function(e){
    var avatar = e.currentTarget.dataset.avatar;
    var username = e.currentTarget.dataset.username;
    wx.navigateTo({
      url: '../setting/setting?' + 'avatar=' + avatar +'&username='+username,
    })
  },
  mystu(e){
    var my=e.currentTarget.dataset.my;
    wx.navigateTo({
      url: '../selectStu/selectStu?'+'my='+my,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中',
    })

    var stu = wx.getStorageSync('student');
    var select = wx.getStorageSync('stu_id');

    for(var i=0;i<stu.length;i++){
      if (stu[i].student_id == select){
        this.setData({
          username: stu[i].username,
          gender: stu[i].gender
        })
      }
    }
    this.getInfo();
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