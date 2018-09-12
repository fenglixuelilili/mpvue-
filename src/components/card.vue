<template>
    <div class="card">
      <a :href="href">
        <div class="leftImg" @click.stop="viewImg">
          <img :src="bookdata.image" alt="" mode="aspectFit">
        </div>

        <div class="rightdetail">
            <div class="xu">
              <div class="bookname left">{{bookdata.title}}</div>
              <start :value="bookdata.rate"></start>
              <div class="scae right">{{bookdata.rate}}</div>
            </div>
            <div class="xu">
              <div class="authorname left">{{bookdata.author}}</div>
              <div class="looks right">浏览量:{{bookdata.count}}</div>
            </div>
            <div class="xu">
              <div class="cbsname left">{{bookdata.publisher}}</div>
              <div class="name right">添加人:{{bookdata.user_info.nickname}}</div>
            </div>
        </div>
        </a>
    </div>
</template>

<script>
import start from './start.vue'
export default {
  props: ['bookdata'],
  components: {
    start
  },
  computed: {
    href () {
      return '/pages/bookdetail/main?bookid=' + this.bookdata.id
    }
  },
  mounted () {

  },
  methods: {
    viewImg () {
      wx.previewImage({
        url: this.bookdata.image,
        urls: [this.bookdata.image]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.left {
  float: left;
}
.right {
  float: right;
}
.xu{
  overflow: hidden;
}
.xing{
  display: inline-block;
  
}
.scae{
  margin-right: 10rpx;
}
.card {
  padding: 30rpx;
  // display: flex;
  position: relative;
  padding-left: 180rpx;
  .leftImg {
    position: absolute;
    left:30rpx;
    top:30rpx;
    width: 180rpx;
    height: 180rpx;
    img {
      display: block;
      height: 100%;
      width: 80%;
      padding: 0;
      margin: 0;
    }
  }

  .rightdetail {
    height: 180rpx;
    font-size: 24rpx;
    // width: 100%;
    .bookname{
      color: #ea5149;
    }
  }

}

</style>
