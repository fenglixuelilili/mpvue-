<template>
    <div class="swiper">
        <swiper :indicator-dots="true"
                :autoplay="true" 
                indicator-active-color="#ea5149">
            <div v-for="(swiper,indeximg) in arrSwiper" :key="indeximg">
              <swiper-item class="imgbox">
                <img @click="nav(imgUrl.id)" v-for="imgUrl in swiper" :key="imgUrl.id" :src="imgUrl.image" class="slide-image" mode="aspectFit"/>
              </swiper-item>
            </div>
        </swiper>
      </div>
</template>

<script>
export default {
  props: ['swipers'],
  data () {
    return {
      arrSwiper: []
    }
  },
  mounted () {
    // console.log(this.swipers)
    // console.log('我是滑块内容')
    this.arrSwiper = [this.swipers.slice(0, 3), this.swipers.slice(3, 6), this.swipers.slice(6, 9)]
    // console.log(this.arrSwiper)
  },
  methods: {
    nav (id) {
      wx.navigateTo({
        url: '/pages/bookdetail/main?bookid=' + id
      })
    }
  }
}
</script>

<style>
  .imgbox{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .slide-image{
    display: block;
    width: 30%;
    height: 250rpx;
  }
  .swiper{
    padding-top: 10rpx;
    
  }
</style>
