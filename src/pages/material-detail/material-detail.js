// pages/material-detail/material-detail.js
const { formatDate } = require('../../utils/util');

Page({

  /**
   * Page initial data
   */
  data: {
    material: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const materials = wx.getStorageSync('materials');
    const material = materials.find(m => m.id == options.id);
    material.buyDate = formatDate(new Date(material.id));
    this.setData({
      material
    });
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },
  clear: function() {
    const materials = wx.getStorageSync('materials');
    const newMaterials = materials.filter(m => m.id != this.data.material.id);
    wx.setStorage({
      key: "materials",
      data: newMaterials,
      success: function() {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    });
  },

  use: function() {
    const materials = wx.getStorageSync('materials');
    const newMaterials = materials.map(m => {
      if (m.id === this.data.material.id) {
        return {
          ...m,
          surplus: this.data.material.surplus,
          remark: this.data.material.remark
        }
      }
      return m;
    });
    wx.setStorage({
      key: "materials",
      data: newMaterials,
      success: function() {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    });
  },

  changeInfo: function(e) {
    const { type } = e.target.dataset;
    this.setData({
      material: {
        ...this.data.material,
        [type]: e.detail.value
      }
    });
  }
})