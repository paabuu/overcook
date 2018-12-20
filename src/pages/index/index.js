//index.js
//获取应用实例
const app = getApp();
const materials = require('../../assets/materials/materials.js');
const { vegetables, meats, fruits, others } = materials;

Page({
  data: {
    motto: 'Hello World1',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    materials: {
      vegetables: [],
      meats: [],
      fruits: [],
      others: []
    },
    isEmpty: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function() {
    const materials = wx.getStorageSync("materials") || [];
    const vegetables = materials.filter(m => m.category === 'vegetables');
    const meats = materials.filter(m => m.category === 'meats');
    const fruits = materials.filter(m => m.category === 'fruits');
    const others = materials.filter(m => m.category === 'others');

    const isEmpty = (vegetables.length + meats.length + fruits.length + others.length) === 0;
    this.setData({
      materials: {vegetables, meats, fruits, others},
      isEmpty
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
