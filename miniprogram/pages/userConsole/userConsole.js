// pages/userConsole/userConsole.js
// const db = wx.cloud.database()
// db.collection("clothes").field({
//   img_array: true,
//   recommend_list: true
// }).get({
//   success: res => {
//     console.log(res)
//     let list = res.data[0].img_array
//     let clothesList = []
//     let pantList = []
//     let shoeList = []
//     for (let i = 0; i < list.length; i++) {
//       if (list[i].type == 0) {
//         clothesList.push(list[i])
//       } else if (list[i].type == 1) {
//         pantList.push(list[i])
//       } else if (list[i].type == 2) {
//         shoeList.push(list[i])
//       }
//     }
//     let recommendList = []
//     for (let i = 0; i < 10; i++) {
//       let selectedList = []
//       for (let j = 0; j <= 2; j ++) {
//         switch(j) {
//           case 0:
//             let r = Math.floor(Math.random(10) * clothesList.length)
//             selectedList.push(clothesList[r])
//             break
//           case 1:
//             r = Math.floor(Math.random(10) * pantList.length)
//             selectedList.push(pantList[r])
//             break
//           case 2:
//             r = Math.floor(Math.random(10) * shoeList.length)
//             selectedList.push(shoeList[r])
//             break
//         }
//       }
//       recommendList.push(selectedList)
//     }
//     console.log(recommendList)
//     db.collection("clothes").doc('86fae1ae-88c7-414c-9e35-9e6a3bcd592d').update({
//       data: {
//         recommend_list: recommendList
//       },
//       success: rs => {
//         console.log(rs)
//       },
//       fail: error => {
//         console.log(error)
//       }
//     })
//   },
//   fail: err => {
//     console.log(err)
//   }
// })

Page({

  data: {
    openid: ''
  },

  onLoad: function (options) {
    this.setData({
      openid: getApp().globalData.openid
    })
  }
})