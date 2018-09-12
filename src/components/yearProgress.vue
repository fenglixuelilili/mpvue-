<template>
    <div>
      <!-- 我是年组件
       -->
       <p>今天是{{year}}年的第{{day}}天 已经过去{{bfb}}%，好好珍惜时间吧 </p>
       <progress :percent="bfb" color="pink" class="pro"/>
    </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      isyear (year) {
        if (year % 400 === 0) {
          return 366
        } else if (year % 4 === 0 && year % 100 === 0) {
          return 366
        } else {
          return 365
        }
      }
    },
    computed: {
      year () {
        return new Date().getFullYear()
      },
      day () {
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        let time = new Date().getTime() - start.getTime()
        return parseInt(time / 1000 / 60 / 60 / 24)
      },
      bfb () {
        return (this.day / this.isyear(new Date().getFullYear()) * 100).toFixed(2)
      }
    }
  }
</script>

<style scoped>
  .pro{
    width: 100%;
    margin: 50rpx 0;
  }
  p{
    font-size: 24rpx;
    text-align: center;

  }
</style>
