// pages/recipes/recipes.js
Page({

  /**
   * Page initial data
   */
  data: {
    keyword: '',
    recipes: [],
    loading: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.fetchPopularRecipes();
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

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  bindKeywordChange: function(e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  fetchRecipesByKeyword: function() {
    if (!this.data.keyword) {
      this.fetchPopularRecipes();
    };
    const url = `https://pabu.pub/overcook/recipes/search?keyword=${this.data.keyword}`;
    this.fetchRecipes(url);
  },

  fetchPopularRecipes: function() {
    const url = `https://pabu.pub/overcook/recipe/popular`;
    this.fetchRecipes(url);
  },

  fetchRecipes: function(url) {
    this.setData({
      loading: true
    });
    wx.request({
      url,
      success: res => {
        if (res.data.meta.code == 200) {
          this.setData({
            recipes: res.data.data,
            loading: false
          });
        }
      },
      fail: function() {
        this.setData({
          loading: false,
          recipes: []
        });
      }
    });
  }
})