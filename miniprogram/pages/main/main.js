// pages/main/main.js
/**
  * type定义 0：衣服 1：裤子 2：鞋子 3：包包
  * 这里以type为index 记录入数组selectedList 这里js的Map数据结构好像有点问题 导致无法setValue 故沿用list
  */
const CLOTHES = 0
const PANTS = 1
const SHOES = 2
const BAGS = 3
Page({


  /**
   * 页面的初始数据
   */
  data: {
    clothes: "",
    pants: "",
    totalList: [],
    selectedList: [],
    clothesList: [],
    pantList: [],
    bagList: [],
    shoeList: [],
    isShowPanel: false,
    currentTab: 0,
    wardrobeList: []
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
    this.loadDataFromDB()
    this.initAnimation()
    // this.loadAnimation()
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

  initAnimation: function() {
    let anim = wx.createAnimation()
    anim.translateY(200).opacity(0).step()
    this.setData({
      optionPanelAnimation: anim.export()
    })
  },

  loadDataFromDB: function() {
    const db = wx.cloud.database()
    db.collection("clothes").field({
      img_array: true
    }).get({
      success: res => {
        console.log(res)
        let list = res.data[0].img_array
        let itemList = []
        for (let i = 0; i < list.length; i++) {
          itemList.push(list[i])
        }

        for (let type = CLOTHES; type <= BAGS; type++) {
          this.getSpecificList(type, itemList)
        }

        let selectedList = []
        // 默认先选中各自大类中的第一项
        selectedList.splice(0, 0, this.data.clothesList[0], this.data.pantList[0], this.data.shoeList[0], this.data.bagList[0])
        

        this.setData({
          clothes: selectedList[CLOTHES].url,
          pants: selectedList[PANTS].url,
          shoes: selectedList[SHOES].url,
          bags: selectedList[BAGS].url,
          itemList: itemList,
          selectedList: selectedList,
          totalList: itemList
        })
      },
      fail: err => {
        console.log(err)
      }
    })

    db.collection("clothes").field({
      recommend_list: true
    }).get({
      success: res => {
        console.log(res)
        this.setData({
          wardrobeList: res.data[0].recommend_list
        })
      },
      fail: err => {

      }
    })

    this.loadGuideAnimation()
  },

  loadGuideAnimation: function() {
    let needGuide = false
    try {
      needGuide = wx.getStorageSync("needGuide")
      if (needGuide) {
        needGuide = needGuide
      }
    } catch (e) {
      wx.setStorageSync("needGuide", true)
      needGuide = true
    }
    console.log(needGuide)
    this.setData({
      needGuide: needGuide
    })
    if (needGuide) {
      wx.setStorageSync("needGuide", false)
      let anim = wx.createAnimation()
      anim.translateX(0).translateX(-50).step({ druation: 1000 })
      anim.translateX(0).step({ duration: 500})
      anim.translateX(50).step({druation: 500})
      anim.translateX(0).step({ duration: 500})
      let timer = setInterval(() => {
        this.setData({
          guideAnimation: anim.export()
        })
      }, 1000)
      setTimeout(() => {
        clearInterval(timer)
        this.setData({
          needGuide: false
        })
      }, 4000)
    }
  },

  loadOptionPanelAnimation: function(show) {
    if (show == this.data.isShowPanel) {
      return
    }
    let option = {
      duration: 500,
      timingFunction: 'ease'
    }
    let anim = wx.createAnimation(option)
    if (show) {
      anim.translateY(200).opacity(0.1).step()
    } else {
      anim.translateY(0).opacity(1).step()
    }
    this.setData({
      optionPanelAnimation: anim.export()
    })
    setTimeout(() => {
      if (show) {
        anim.translateY(0).opacity(1).step()
      } else {
        anim.translateY(200).opacity(0.1).step()
      }
      this.setData({
        optionPanelAnimation: anim.export()
      })
    })
  },

  stopPageScroll: function () { },

  onSelectItem: function (e) {
    let selected = e.currentTarget.dataset.item
    let selectedList = this.data.selectedList
    for (let idx in selectedList) {
      let item = selectedList[idx]
      if (item.type == selected.type) {
        // 替换该类商品
        selectedList.splice(selected.type, 1, selected)
        this.setData({
          clothes: selectedList[CLOTHES].url,
          pants: selectedList[PANTS].url,
          shoes: selectedList[SHOES].url,
          bags: selectedList[BAGS].url,
          selectedList: selectedList
        })
        break
      }
    }
  },

  /**
   * 顶部区域衣服、裤子和空白区域的点击
   */
  onTapDisplay: function (e) {
    let type = parseInt(e.currentTarget.dataset.type)
    console.log(type)
    this.loadOptionPanelAnimation(true)
    switch(type) {
      case CLOTHES:
        this.setData({
          itemList: this.data.clothesList
        })
        break
      case PANTS: 
        this.setData({
          itemList: this.data.pantList
        })
        break
      case SHOES:
        this.setData({
          itemList: this.data.shoeList
        })
        break
      case BAGS: 
        this.setData({
          itemList: this.data.bagList
        })
        break
    }
    this.setData({
      isShowPanel: true
    })
  },
  onTapBlank: function () {
    console.log("onTapBlank")
    this.loadOptionPanelAnimation(false)
    setTimeout(() => {
      this.setData({
        itemList: this.data.totalList,
        isShowPanel: false
      })
    }, 500)
  },

  getSpecificList: function(type, itemList) {
    let list = []
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].type == type) {
        list.push(itemList[i])
      }
    }
    switch (type) {
      case CLOTHES:
        this.setData({
          clothesList: list
        })
        break
      case PANTS: 
        this.setData({
          pantList: list
        })
        break
      case SHOES:
        this.setData({
          shoeList: list
        })
        break
      case BAGS:
        this.setData({
          bagList: list
        })
        break
    }
  },

  onClothesMove: function(e) {
    this.setData({
      isStopSwiperMove: true
    })
  },

  stopTouchMove: function() {
    return false
  }

})