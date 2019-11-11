// pages/main/main.js
Page({
  /**
   * type定义 0：衣服 1：裤子 2：鞋子 3：包包
   */

  /**
   * 页面的初始数据
   */
  data: {
    clothes: "",
    pants: "",
    CLOTHES: 0,
    PANTS: 1,
    SHOES: 2,
    BAGS: 3,
    selectedList: [],
    allImages: [],
    allPants: [],
    allClothes: [],
    allShoes: [],
    allBags: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          screenWidth: res.windowWidth,
          pixelRatio: res.pixelRatio
        })
      }
    })
    const db = wx.cloud.database()
    db.collection("clothes").field({
      img_array: true
    }).get({
      success: res => {
        console.log(res)
        var item_list = []
        var pants = res.data[0].img_array[0].url
        var obj = new Object()
        obj.type = 0
        obj.url = "../../images/test-clothes.png"
        for (let i = 0; i < 10; i++) {
          if (i % 3 == 0) {
            item_list.push(obj)
          } else if (i % 3 == 1) {
            item_list.push(res.data[0].img_array[1])
          } else {
            item_list.push(res.data[0].img_array[0])
          }
        }
        var allImages = res.data[0].img_array

        var allClothes = []
        var allPants = []
        var allBags = []
        var allShoes = []
        //todo 更换为常量
        for (let j = 0; j < allImages.length; j++) {
          var item = allImages[j]
          var url = item.url
          switch (item.type) {
            case this.data.CLOTHES:
              allClothes.push(item)
              break;
            case this.data.PANTS:
              allPants.push(item)
              break;
            case this.data.BAGS:
              allBags.push(item)
              break;
            case this.data.SHOES:
              allShoes.push(item)
              break;
            default:
              break;
          }
        }
        var selectedList = []
        selectedList.push(obj, pants)
        this.setData({
          clothes: obj.url,
          pants: pants,
          item_list: item_list,
          allClothes: allClothes,
          allPants: allPants,
          allBags: allBags,
          allShoes: allShoes,
          allImages: allImages
        })
      },
      fail: err => {
        console.log(err)
      }
    })
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

  },

  /**
   * 以下为自定义函数
   */
  
  stopPageScroll: function() {},

  onSelectItem: function(e) {
    console.log(e)
    var selected = e.currentTarget.dataset.item
    this.setData({
      clothes: selected.url
    })
  },

  /**
   * 顶部区域衣服、裤子和空白区域的点击
   */
  onTapClothes: function() {
    console.log("onTapClothes")
    this.setData({
      item_list: this.data.allClothes,
    })
  },
  onTapPants: function() {
    console.log("onTapPants")
    this.setData({
      item_list: this.data.allPants,
    })
  },
  onTapBlank: function() {
    console.log("onTapBlank")
    this.setData({
      item_list: this.data.allImages,
    })
  },

})