<template>
  <div class="detail">
    <div class="topinfo">
      <!-- 充当背景图的图片 -->
      <img :src="bookdetail.image" alt="" class="bgc" mode="aspectFill">
      <!-- 下面是具体内容 -->
      <img :src="bookdetail.image" mode="aspectFit" class="img">
      <div class="info">
         <p class="info-bookname info-text">
           {{bookdetail.title}}
          </p>
          <p class="info-author info-text">
            {{bookdetail.author}}
          </p>
      </div>

      <!-- <div class="userinfo">
        <div class="top">
          <div class="name one">
            <img :src="userinfo.avatarUrl" alt="" mode="aspectFill" class="small">
            {{userinfo.nickName}}
          </div>
          <div class="fen text-right one">{{bookdetail.rate}}分</div>
        </div>
        <div class="bottom">
          <div class="ban one">{{bookdetail.publisher}}</div>
          <div class="price text-right one">{{bookdetail.price}}</div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    props: ['bookdetail'],
    data () {
      return {
  
      }
    },
    computed: {
      userinfo () {
        return this.bookdetail.user_info
      }
    },
    created () {
  
    },
    methods: {
  
    },
    mounted () {
      // console.log(this.bookdetail.image)
      // console.log('nihao')
      // console.log(this.bookdetail)
    }
  }
</script>

<style lang="scss">
  .text-right{
    text-align: right;
  }
  .userinfo{
    padding: 10rpx;
  }
  .top,.bottom{
    display: flex;
  }
  .small{
    width: 10rpx;
  }
  .one{
    flex:1;
  }
  .topinfo{
    width: 100%;
    height: 500rpx;
    position: relative;
    .bgc{
      width: 100%;
      height: 100%;
      filter: blur(8px);
    }
    .img{
      width: 200rpx;
      height: 250rpx;
      position: absolute;
      top:0;
      left:0;
      right: 0;
      margin: 0 auto;
    }
    .info{
      position: absolute;
      top:260rpx;
      left: 0;
      width: 100%;
      color: #fff;
        p{
          width: 100%;
           text-align: center;
        }
        p.info-bookname{
          font-size: 48rpx;
        }
    }
  }

</style>
