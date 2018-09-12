<template>
    <div>
        <div>
          <swiper-z :swipers="topList"></swiper-z>
          <book-card v-for="book in bookLists" :key="book.id" :bookdata="book"></book-card>
          <div class="footer" v-if="!more">
              没有更多数据.....
          </div>
        </div>
    </div>
</template>

<script>
import bookCard from '@/components/card.vue'
import swiperZ from '@/components/swiper.vue'
export default {
  components: {
    bookCard,
    swiperZ
  },
  data () {
    return {
      bookLists: [],
      size: 6,
      page: 0,
      more: true,
      topList: []
    }
  },
  mounted () {
    this.getlist()
  },
  created () {
    this.getTop()
  },
  methods: {
    async getlist (page = this.page, size = this.size) {
      if (!this.more) {
        return
      }
      wx.showNavigationBarLoading()
      const lists = await this.$http('/weapp/booklist', 'get', {
        page,
        size
      })
      if (lists.data.data.list.length < size) {
        this.more = false
      }
      this.bookLists.push(...lists.data.data.list)
      // console.log(this.bookLists)
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    },
    // 请求top的数据
    async getTop () {
      const topList = await this.$http('/weapp/top', 'get')
      this.topList = topList.data.data.top
    }
  },
  config: {
    window: {
      enablePullDownRefresh: 'true'
    }
  },
  // 下拉事件
  onPullDownRefresh () {
    if (!this.more) {
      wx.showToast({
        title: '已经没有数据了'
      })
    }
    this.page++
    this.getlist()
  },
  // 触底事件
  onReachBottom () {
    this.page += 1
    this.getlist()
  }
}
</script>

<style>
  .footer{
    text-align: center;
  }
</style>
