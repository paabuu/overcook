// pages/recipe-detail/recipe-detail.js
Page({

  /**
   * Page initial data
   */
  data: {
    recipe: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getRecipeById(options.id);
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
  },

  getRecipeById: function(id) {
    wx.request({
      url: `https://greatwhole90.com/overcook/recipe/${id}`,
      success: res => {
        if (res.data.meta.code == 200) {
          this.setData({
            recipe: res.data.data
          });
        }
      }
    });
  },
  addToBuy: function(e) {
    const { name, unit } = e.currentTarget.dataset;
    const tobuys = wx.getStorageSync('tobuys') || [];
    const newTobuy = {
      text: `${name}${unit}`,
      done: false,
      id: Date.now()
    };
    tobuys.push(newTobuy);
    wx.setStorage({
      key: 'tobuys',
      data: tobuys,
      success: function() {
        wx.showToast({
          title: `${name}${unit}`
        });
      }
    });
  }
})