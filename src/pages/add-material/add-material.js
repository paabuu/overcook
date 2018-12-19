// pages/add-material/add-material.js
const materials = require('../../assets/materials/materials.js');

Page({

  /**
   * Page initial data
   */
  data: {
    selectedType: "vegetables",
    materials: materials,
    types: ['vegetables', 'meats', 'fruits', 'others']
  },

  handleChangeType: function(e) {
    const type = this.data.types[e.detail.current];
    this.setData({
      selectedType: type
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})