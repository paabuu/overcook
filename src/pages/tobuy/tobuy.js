// pages/tobuy/tobuy.js
Page({

  /**
   * Page initial data
   */
  data: {
    tobuys: [],
    tobuy: ''
  },

  onLoad: function (options) {

  },

  onShow: function () {
    this.setData({
      tobuys: wx.getStorageSync('tobuys') || []
    });
  },
  onHide: function() {
    wx.setStorage({
      key: 'tobuys',
      data: this.data.tobuys
    });
  },
  addTobuy: function() {
    if (!this.data.tobuy) return;
    this.setData({
      tobuys: [
        ...this.data.tobuys,
        { id: Date.now(), text: this.data.tobuy, done: false }
      ],
      tobuy: ''
    });
  },
  bindTobuyChange: function(e) {
    this.setData({
      tobuy: e.detail.value
    });
  },
  bindToggleChecked: function(e) {
    const { id } = e.currentTarget.dataset;
    const tobuys = this.data.tobuys.map(b => {
      if (b.id == id) {
        return {
          ...b,
          done: !b.done
        };
      }
      return b;
    });

    this.setData({
      tobuys
    });
  },
  clear: function() {
    const tobuys = this.data.tobuys.filter(b => !b.done);
    this.setData({
      tobuys
    });
  }
})