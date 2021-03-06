// pages/add-material/add-material.js
const { formatDate } = require('../../utils/util.js');
const types = [
  {
    name: "蔬菜",
    value: "vegetables"
  },
  {
    name: "肉类",
    value: "meats"
  },
  {
    name: "水果",
    value: "fruits"
  },
  {
    name: "其他",
    value: "others"
  }
];

const defaultShlefLife = formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));

Page({

  /**
   * Page initial data
   */
  data: {
    name: '',
    icon: '',
    category: 'vegetables',
    cost: '',
    total: '',
    remark: '',
    shelfLife: defaultShlefLife,
    types
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      icon: `/assets/materials/${options.icon}`,
      category: options.category,
      categoryName: types.find(t => t.value === options.category).name
    });
  },

  bindDateChange: function(e) {
    this.setData({
      shelfLife: e.detail.value
    });
  },
  bindInfoChange: function(e) {
    const type = e.currentTarget.dataset.type;
    if (type === 'shelfLife') {
      this.setData({
        shelfLife: formatDate(new Date(e.detail.value))
      });
    } else {
      this.setData({
        [type]: e.detail.value
      });
    }
  },
  bindConfirm: function() {
    const materials = wx.getStorageSync('materials') || [];
    const { name, icon, category, cost, total, remark, shelfLife, categoryName } = this.data;
    materials.push({name, icon, category, cost, total, remark, shelfLife, categoryName, id: Date.now(), surplus: 100});
    wx.setStorage({
      key: "materials",
      data: materials,
      success: function() {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }
    })
  }
})