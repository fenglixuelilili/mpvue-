<template>
    <div class="comment">
        <div>
            <div class='myinfo' v-for="comment in commentlist" @click = 'nav(comment.bookid)'>
                <div class="top">
                    <div class="my">
                        <img :src="comment.image" alt="" mode="aspectFit">
                        {{comment.title}}
                    </div>
                    <div class="xinhao">
                        {{comment.phone || '未知型号'}}
                        |
                        {{comment.location || '未知地点'}}
                    </div>
                </div>
                <div class="commentsinfo">
                    {{comment.comment}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
const session = qcloud.Session.get()
    export default {
        props:['commentlist','type'],
        data(){
            return {
                
            }
        },
        computed: {
            showComment () {
                if (!session.userinfo) { return false }
                if (this.commentlist.filter((v) => { if (v.openid === session.userinfo.openId) { return true } }).length) {
                    return false
                }
                return true
            }
        },
        methods: {
          nav(bookid){
            if(!this.type){
              return
            }
            wx.navigateTo({
              url:'/pages/bookdetail/main?bookid='+bookid
            })
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
      }
      .xinhao{
        flex:1;
        text-align:right;
        color:#ea5a49;
        font-size:20rpx;
      }
    }

  }
  .commentsinfo{
    padding:20rpx;
    font-size:32rpx;
    text-indent:2em;
    
  }
</style>