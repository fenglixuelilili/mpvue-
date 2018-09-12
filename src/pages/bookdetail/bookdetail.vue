<template>
  <div>
    <div class="detail">
    <div class="topinfo">
      <!-- 充当背景图的图片 -->
      <img :src="listbook.image" alt="" class="bgc" mode="aspectFill">
      <!-- 下面是具体内容 -->
      <img :src="listbook.image" mode="aspectFit" class="img">
      <div class="info">
         <p class="info-bookname info-text">
           {{listbook.title}}
          </p>
          <p class="info-author info-text">
            {{listbook.author}}
          </p>
      </div>

      <div class="userinfos">
        <div class="top">
          <div class="name one">
            <!-- <img :src="userinfo.avatarUrl" alt="" mode="aspectFill" class="small"> -->
            <!-- {{userinfo.nickName}} -->
            {{listbook.title}}
          </div>
          <div class="fen text-right one">{{listbook.rate}}分 <div class="satrt"> <start :value="listbook.rate"></start></div></div>
        </div>
        <div class="bottom">
          <div class="ban one">{{listbook.publisher}}</div>
          <div class="price text-right one">{{listbook.price}}</div>
        </div>
      </div>
      <div class="booktaginfo">
        <div class="tags" :key="i" v-for="(tag,i) in listbook.tags">{{tag}}</div>
        <p class="text" :key="i" v-for="(s,i) in listbook.summary">{{s}}</p>
      </div>


      <comment-list :commentlist="commentlist"></comment-list>
      <comment :bookid="listbook.id" :showui="showui" @comment = 'getMycomment(bookid)' v-if = 'showComment'></comment>

      <p v-if="!showComment" class='bott'>您还未登录或者已经评论过了呢</p>
    </div>
  </div>

  </div>
</template>

<script>
import detail from '@/components/detail'
import start from '@/components/start'
import comment from '@/components/comment'
import commentList from '@/components/commentList'
import qcloud from 'wafer2-client-sdk'
const session = qcloud.Session.get()
export default {
  created () {
    // this.bookid = this.$root.$mp.query.bookid
  },
  mounted () {
    this.bookid = this.$root.$mp.query.bookid
    this.getlist()
    this.getMycomment(this.bookid)
  },
  data () {
    return {
      bookid: 0,
      listbook: {},
      valuetext: '',
      showui: false,
      commentlist: []
    }
  },
  methods: {
    async getlist () {
      const detail = await this.$http('/weapp/bookdetail', 'get', {bookid: this.bookid})
      this.listbook = detail.data.data
      wx.setNavigationBarTitle({
        title: this.listbook.title
      })
    },
    info () {
      
    },
    async getMycomment (bookid) {
      const comments = await this.$http('/weapp/mycomment', 'get', {
        bookid: bookid
      })
      this.commentlist = comments.data.data.list
    }
  },
  components: {
    detail,
    start,
    comment,
    commentList
  },
  computed: {
    userinfo () {
      return this.listbook.user_info
    },
    showComment () {
      if (!session.userinfo) { return false }
      if (this.commentlist.filter((v) => { if (v.openid === session.userinfo.openId) { return true } }).length) {
        return false
      }
      return true
    }
  },
  onHide () {
    this.showui = true
  },
  onShareAppMessage: function () {
    return {
      title: this.listbook.title
    }
  }
}
</script>

<style lang="scss" scoped>

.bott{
  display:block;
  line-height:50rpx;
  text-align:center;
  font-size:28rpx;
  color:red;
  font-wight:800;
}
.satrt{
  display: inline-block;
  padding-top: 14rpx;
}
    .text-right{
    text-align: right;
  }
  .userinfos{
    padding: 10rpx;
    margin-bottom: 10rpx;
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
    .booktaginfo{
      padding: 8rpx;
      .text{
        text-indent: 2em;
        font-size: 28rpx;
      }
    }
    .tags{
      text-align: center;
      display: inline-block;
      line-height: 30rpx;
      border:1px solid red;
      color: red;
      padding: 8rpx;
      margin: 8rpx;
      border-radius: 20rpx;
    }
  }
  .myinfo{
    padding:10rpx;
    .top{
      disply:flex;
      height:50rpx;
      width:100%;
      font-size:28rpx;
      line-height:50rpx;
      .my{
         flex:1;
        img{
          display:inline-block;
          border-radius:50%;
          height:50rpx;
          width:50rpx;
          margin-right:10rpx;
          vertical-align:middle;
        }
      .xinhao{
        flex:1;
        text-align:center;
      }

      }
    }

  }
  .commentsinfo{
    padding:20rpx;
    font-size:32rpx;
    text-indent:2em;
  }
</style>
