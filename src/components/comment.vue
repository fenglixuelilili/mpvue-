<template>
  <div class="comment">
      <!-- 评论区域 -->
        <textarea 
            v-model="valuetext"
            class="textrarea"
            placeholder="请输入您的见解，最长100个字"
            :maxlength="100"/>
        <div class="com">
                  <div class="location">
          地理位置:
          <switch color="#ea5a49" @change="getLocation" :checked="location" class="swithc"/>
          <span>{{location}}</span>
        </div>
        <div class="phone">
          手机型号:
          <switch color="#ea5a49" @change="getPhone" :checked="phone" class="swithc"/>
          <span>{{phone}}</span>
        </div>
        </div>
        <button type="warn" v-if="show" @click = "plancomment"> 发表评论 </button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
export default{
  props: ['bookid', 'showui'],
  data () {
    return {
      valuetext: '',
      location: '',
      phone: '',
      show: false,
      info: {}
    }
  },
  methods: {
    getLocation (e) {
      if (e.target.value) {
        const url = 'http://api.map.baidu.com/geocoder/v2/'
        const ak = 'k30Yo0TyN8TRapRW9N3CC9QT20eSTNcL'
        // 显示地理位置
        wx.getLocation({
          success: (e) => {
            // console.log(e)
            // console.log(e.latitude)
            // console.log(e.longitude)
            wx.request({
              url: url,
              data: {
                ak,
                output: 'json',
                location: `${e.latitude},${e.longitude}`
              },
              success: (e) => {
                // console.log(e)
                if (e.data.status === 0) {
                  this.location = e.data.result.formatted_address
                } else {
                  wx.showToast({
                    title: '获取位置失败'
                  })
                }
              }
            })
          }
        })
      } else {
        // 清空地理位置
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        // 显示手机图标
        wx.getSystemInfo({
          success: (e) => {
            this.phone = e.model
          }
        })
      } else {
        // 不显示
        this.phone = ''
      }
    },
    async plancomment () {
      if (this.valuetext.trim().length === 0) {
        wx.showToast({
          title: '您还未写评论内容'
        })
        return
      }
      const data = {
        openid: this.info.openId,
        bookid: this.bookid,
        comment: this.valuetext,
        phone: this.phone,
        location: this.location
      }
      const res = await this.$http('/weapp/addcomment', 'post', data)
      console.log(res)
      if (res.data.code === 0) {
        this.valuetext = ''
        wx.showToast({
          title: '评论成功'
        })
        this.$emit('comment')
      } else {
        wx.showToast({

        })
      }
    }

  },
  mounted () {
    // 如果登录了就可以评论
    const session = qcloud.Session.get()
    if (session) {
      this.show = true
      this.info = session.userinfo
    } else {
      wx.wx.showToast({
        title: '您还未登录'
      })
    }

    if (!this.showui) {
      this.valuetext = ''
      this.location = ''
      this.phone = ''
    }
  },
  created () {
    console.log(this.showui)
    console.log('出发了')
  }
}
</script>

<style lang="scss" scoped>
  .textrarea{
    padding: 10rpx;
    width: 100%;
    height: 180rpx;
    background-color: #eee;
    font-size: 28rpx;
    
  }
  .com{
    padding:20rpx;
  }
  .location,.phone{
    font-size: 32rpx;
      margin-bottom:30rpx;
      .swithc{
        display:inline-block;
        height:20rpx;
      }
    }

</style>
