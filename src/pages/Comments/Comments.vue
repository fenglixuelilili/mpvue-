<template>
    <div class='comlist'>
        <comment-list :commentlist='commentlist' :type='true'></comment-list>
    </div>
</template>

<script>
  import commentList from '@/components/commentList.vue'
  import qcloud from 'wafer2-client-sdk'
  const session = qcloud.Session.get()
  const openid = session.userinfo.openId
  console.log(session)
  export default {
    data(){
      return {
        commentlist:[]
      }
    },
    mounted() {
      this.getcommentList()
    },
    methods: {
      async getcommentList(){
        if(!openid){
          wx.showToast({
            title:'您未登录'
          })
          return
        }
        const commentlist = await this.$http('/weapp/mycomment','get',{
          openid:openid
        })
        console.log(commentlist)
        this.commentlist = commentlist.data.data.list
        if(this.commentlist.length == 0){
          wx.showToast({
            title:'您还未评价任何'
          })
        }
      }
    },
    components: {
      commentList
    }
  }
</script>

<style lang="scss" scoped>
  .comlist{
    padding:30rpx;
  }
</style>
