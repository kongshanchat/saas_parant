// pages/addTeacher/addTeacher.js
let app = getApp();
let baseUrl = app.globalData.baseUrl;
var token = wx.getStorageSync('token');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Tname: '',
    Tel: '',
    curIndex: null,
    multi_choose: [],
    username: '',
    mobile: '',
    disable: false
  },
  //更新对象,id为属性id，obj为操作对象
  updateData: function (id, obj, val) {
    for (var i = 0; i < obj.length; i++) {
      var cur_data = obj[i];
      if (cur_data['attr_id'] == id) {
        obj[i] = val;
        return obj;
      }
    }
  },
  //
  //删除对象,id为属性id，obj为操作对象
  deleteData: function (id, obj, val) {
    //alert(name);
    for (var i = 0; i < obj.length; i++) {
      var cur_data = obj[i];
      if (cur_data['attr_id'] == id) {
        obj.splice(i, 1);

        return obj;
      }
    }

  },
  //查询对象,id为属性id，obj为操作对象
  checkData: function (id, obj) {
    //alert(name);
    for (var i = 0; i < obj.length; i++) {
      var cur_data = obj[i];
      if (cur_data['attr_id'] == id) {
        return true;
      }
    }
    return false;
  },
  selectRights: function (e) {
    var that = this;
    var list = this.data.ruleList;
    var clickIndex = e.currentTarget.dataset.select;
    var multi_choose = that.data.multi_choose;
    var data_id = e.currentTarget.dataset.id;
    var choose = {};

    //多个属性选中
    if (list[clickIndex].state == 1) {
      list[clickIndex].state = 0;

    } else if (list[clickIndex].state == 0) {
      list[clickIndex].state = 1;
    }

    //拼接当前选中对象
    var current_choose = { "attr_id": data_id };

    //判断是否存在当前的属性的id，如果存在则更新，不存在则push新增
    if (that.checkData(data_id, multi_choose)) {
      that.deleteData(data_id, multi_choose, current_choose);

      choose = that.updateData(data_id, multi_choose, current_choose);
    } else {
      multi_choose.push(current_choose);

      choose = multi_choose;
      //console.log(choose)
    }
    that.setData({
      multi_choose: multi_choose,
      ruleList: list
    })

  },
  user: function (e) {
    var username = e.detail.value;
    var that = this;
    that.setData({
      username: username
    })
  },
  phone: function (e) {
    var mobile = e.detail.value;
    var that = this;
    that.setData({
      mobile: mobile
    })
  },
  save: function (e) {
    var that = this;
    var token = wx.getStorageSync('token');
    var username = this.data.username;
    var mobile = this.data.mobile;
    var teacherId = this.data.teacherId;
    var status = this.data.status;
    //var thd=this.data.third_id;
    if (status == 1) {
      var do_type = 0;
    } else if (status == 2) {
      var do_type = 1;
    } else if (status == 2) {
      var do_type = 2;
    }

    var powwerList = [];
    var muti = this.data.multi_choose;
    for (var i = 0; i < muti.length; i++) {
      powwerList.push(muti[i].attr_id)
    }

    console.log('sss')

    //console.log(powwerList)

    if (username == '' || mobile == '') {
      wx.showToast({
        title: '信息不完整',
        image: '../../images/warn.png',
        duration: 1000
      })
    } else if (powwerList.length == 0 || powwerList == undefined) {
      wx.showToast({
        title: '请选择权限',
        image: '../../images/warn.png',
        duration: 1000
      })

    } else {
      console.log('sss');
      if (status == 1) {
        this.edits(teacherId, username, mobile, powwerList)
      } else if (status == 2) {
        var do_type = 1;
        this.adds(teacherId, username, mobile, powwerList, do_type)
      } else if (status == 3) {
        var do_type = 2;
        this.adds(teacherId, username, mobile, powwerList, do_type)
      }
    }
  },

  edits: function (teacherId, username, mobile, powwerList) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: baseUrl + '/api/teacher/edit',
      method: 'post',
      data: {
        id: teacherId,
        username: username,
        mobile: mobile,
        power: powwerList,
        type: 3
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '修改成功',
          })

          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            image: '../../images/warn.png'
          })
        }
      }
    })
  },
  adds: function (teacherId, username, mobile, powwerList, do_type) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: baseUrl + '/api/teacher/add',
      method: 'post',
      data: {
        third_id: teacherId,
        username: username,
        mobile: mobile,
        power: powwerList,
        do_type: do_type,
        type: 3
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '新增成功',
          })

          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  loadRules: function () {
    var that = this;
    var token = wx.getStorageSync('token');
    //ar group_id = wx.getStorageSync('userinfo').group.id;

    wx.request({
      url: baseUrl + '/api/user_role/get_list',
      method: 'post',
      data: {
        group_id: 4
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token
      },
      success: function (res) {
        if (res.data.code == 1) {
          var datas = res.data.data;
          var checkPower = that.data.power;
          for (var i = 0; i < datas.length; i++) {
            datas[i].state = 0;
            for (var j = 0; j < checkPower.length; j++) {
              if (datas[i].id == checkPower[j].id) {
                datas[i].state = 1;
              }
            }
          }

          that.setData({
            ruleList: datas
          })
        }
      }
    })
  },
  delate: function () {
    // /api/teacher / del
    var token = wx.getStorageSync('token');
    var teacherId = this.data.teacherId;
    wx.request({
      url: baseUrl + '/api/teacher/del',
      method: 'post',
      data: {
        id: teacherId,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        token: token
      },
      success: function (res) {
        if (res.data.code == 1) {
          wx.showToast({
            title: '删除成功',
          })

          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.power);
    var power = JSON.parse(options.power);


    var multi_choose = [];

    for (var i = 0; i < power.length; i++) {
      power[i].attr_id = power[i].id;
      multi_choose.push(power[i])
    }

    this.setData({
      teacherId: options.teacherId,
      mobile: options.phone,
      username: options.username,
      power: power,
      status: options.status,
      //third_id:options.third_id,
      multi_choose: multi_choose
    })

    if (options.status != 1) {
      this.setData({
        disable: true
      })
    }


    //console.log(power)
    //console.log(multi_choose)


    this.loadRules();
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