//index.js
var that = undefined;
var barrageList = [];
var i = 0;
var ids=0;

// 弹幕参数
class Barrage {
  constructor(text, top, time, color) {  //内容，顶部距离，运行时间，颜色（参数可自定义增加）
    this.text = text;
    this.top = top;
    this.time = time;
    this.color = color;
    this.display = true;
    this.id = i++;
  }
}

Page({
  data: {
    barrageData: [],  //屏幕展示内容
    arr: [
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕1",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕2",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕3",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕4",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕5",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕6",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕7",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕8",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕9",
      "弹幕弹幕弹幕弹幕弹幕弹幕弹幕10"
    ],
    barrageTop: 0,
    timer: "",  //定时器
    value: "", //输入框
  },
  
  //弹幕垂直间距
  //这里看项目需求可更改弹幕运行行数  目前三行
  //记得手动改弹幕的高度
  getRandomDistance() {
    let that = this;
    that.setData({
      barrageTop : that.data.barrageTop == 0 ? 35 : that.data.barrageTop == 35 ? 70 : 0
    })
    return that.data.barrageTop;
  },
  
  //弹幕移动速度
  getRandomTime() {
    let time = [6.5, 7, 7.5, 8, 8.5];
    return time[Math.floor(Math.random()*time.length)]
  },
  
  // 弹幕字体颜色
  getRandomColor() {
    let rgb = []
    for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },

  onLoad: function () {
    let that = this;
    that.setData({
      timer: setInterval(function () {
        let arr = that.data.arr;
        if(arr[ids] == undefined){
          ids = 0
          // 1.循环一次，清除计时器
          // barrageList = []
          // clearInterval(that.data.timer)

          // 2.无限循环弹幕
          barrageList.push(new Barrage(arr[ids], that.getRandomDistance(), that.getRandomTime(), that.getRandomColor()));
          if(barrageList.length > 8){   //删除运行过后的dom
            barrageList.splice(0, 1)
          }
          that.setData({
            barrageData: barrageList
          })
          ids++;
        } else {
          barrageList.push(new Barrage(arr[ids], that.getRandomDistance(), that.getRandomTime(), that.getRandomColor()));
          if(barrageList.length > 8){  
            barrageList.splice(0, 1)
          }
          that.setData({
            barrageData: barrageList
          })     
          ids++;
        }
      }, 1200)
    })
  },
  onHide(){
    clearInterval(this.data.cycle)
    ids = 0;
    barrageList = [];
  },
  onUnload(){
    clearInterval(this.data.cycle)
    ids = 0;
    barrageList = [];
  },
  input(e) {
    this.setData({
      value: e.detail.value
    })
  },
  bindbt() {
    if (!this.data.value) {
      wx.showToast({
        title: '输入不能为空!',
        icon: 'none'
      })
      return;
    }
    wx.showToast({
      title: '发送成功',
      icon: 'success'
    })
    barrageList.push(new Barrage(this.data.value, this.getRandomDistance(), this.getRandomTime(), this.getRandomColor()));
    this.setData({
      barrageData : barrageList,
      value: ""
    })
  }
})




