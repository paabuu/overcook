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
      url: `https://pabu.pub/overcook/recipe/${id}`,
      success: res => {
        if (res.data.meta.code == 200) {
          this.setData({
            recipe: res.data.data
          });
        }
      }
    });
  }
})