Page({
  data: {
    radioItems: [
      { name: '成功提交订单后40分钟送达', value: '0', checked: true },
      { name: '预约当天时间稍晚送餐', value: '1' },
      { name: '隔天送餐', value: '2' }
    ],
    address: [],
    isConfirm: true,
    checkedNum: 0
  },
  onReady: function (e) {
    let that = this;
    wx.getStorage({
      key: 'OrderAddress',
      success: function (res) {
        console.log(res.data);
        that.setData({
          address: res.data.address
        })
      }
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      checkedNum: e.detail.value,
      radioItems: radioItems
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      checkboxItems: checkboxItems
    });
  },
  addressCheck: function () {
    let is_confirm = !this.data.isConfirm;
    this.setData({
      isConfirm: is_confirm
    })
  },
  toMap: function () {
    wx.navigateBack()
  },
  toMenu: function () {
    if (this.data.isConfirm) {
      wx.navigateTo({
        url: '/pages/menu/menu'
      })
    } else {
      //
      wx.showModal({
        content: '地址还没填写噢',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }

  }
});