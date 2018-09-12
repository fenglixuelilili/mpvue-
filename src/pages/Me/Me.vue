<template>
    <div>
        <!-- <button open-type="getUserInfo" lang="zh_CN"  @click="doLogin"  v-if="show">{{msg}}</button> -->
        <div>
          <div class="tx">
            <!-- <img :src="imgUrl" alt="" @click="doLogin" open-type="getUserInfo"> -->
            <button class = "btnImg" open-type="getUserInfo" lang="zh_CN"  @click="doLogin" :style="{'background-image':'url('+imgUrl+')'}"></button>
          </div>
          <div class="name">{{msg}}</div>
          <year-progress></year-progress>
          <button class="btn" @click = "addBook"  v-if="!show">添加图书</button>
        </div>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import CONF from '../../config.js'
import yearProgress from '@/components/yearProgress.vue'

export default {
  components: {
    yearProgress
  },
  data () {
    return {
      msg: '点击登陆',
      userInfo: {},
      logged: false,
      show: true,
      imgUrl: '../../../static/imgs/unlogin.png',
      session: {}
    }
  },
  created () {
    // 设置登陆的请求接口
    qcloud.setLoginUrl(CONF.loginUrl)
    const session = qcloud.Session.get()
    // console.log(session);

    if (session) {
      // 已经登陆的情况
      this.Lstatus(session.userinfo)
      // console.log(this.imgUrl);
    } else {
      wx.showToast({
        title: '请您您先登陆呢'
      })
    }
  },
  methods: {
    doLogin: function () {
      // 这个是session信息，用户信息也是在李曼的，下面的res也用户是具体信息，这个session就可以判断我们有没有登陆
      const session = qcloud.Session.get()
      if (session) {
        // 第二次登录
        // 或者本地已经有登录态
        // 可使用本函数更新登录态
        qcloud.loginWithCode({
          success: res => {
            console.log('首次登陆成功')
            this.Lstatus(res)
          },
          fail: err => {
            console.error(err)
            // util.showModel("登录错误", err.message);
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            console.log('登陆成功')
            this.Lstatus(res)
          },
          fail: err => {
            console.error(err)
            // util.showModel("登录错误", err.message);
          }
        })
      }
    },
    // 扫图书
    addBook () {
      wx.scanCode({
        success: res => {
          // console.log(res);
          this.addBookInfo(res.result)
        }
      })
    },
    // 更改状态：
    Lstatus (userinfo) {
      this.msg = userinfo.nickName
      this.show = false
      this.imgUrl = userinfo.avatarUrl
    },
    // 添加图书
    async addBookInfo (isbn) {
      // console.log("我被出发了");
      let session = qcloud.Session.get()
      const result = await this.$http(
        '/weapp/addbook',
        'post',
        {
          openid: session.userinfo.openId,
          isbn
        }
      )
      // console.log(result);
      if (result.data.code === 0 && result.data.data.title) {
        wx.showToast({
          title: result.data.data.msg
        })
        wx.showModal({
          title: '成功添加',
          content: result.data.data.title,
          showCancel: false
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: result.data.data.msg
        })
      }
    }
  }
}
</script>
  
<style>
.name {
  text-align: center;
  line-height: 80rpx;
  font-size: 36rpx;
  margin: 100rpx 0;
}
.tx {
  width: 300rpx;
  height: 300rpx;
  border-radius: 50%;
  margin: 20rpx auto;
  overflow: hidden;
}
.tx img {
  width: 100%;
  height: 100%;
}
.btnImg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: transparent;
  background: url("../../../static/imgs/unlogin.png") no-repeat center center;
  background-size: 350rpx 350rpx;
}
</style>
