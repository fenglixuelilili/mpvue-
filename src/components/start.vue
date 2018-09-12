<template>
    <div class="start">
        ☆☆☆☆☆
        <span class="mask" :style="style">★★★★★</span>
    </div>
</template>

<script>

export default {
  props: {
    value: {
      type: [Number, String],
      default: '0'
    }
  },
  computed: {
    style () {
      return `width:${this.value / 2.5}em`
    }
  }
}
</script>

<style lang="scss" scoped>
.start{
  font-size: 24rpx;
  position: relative;
  display: inline-block;
  float: right;
  color: #ea5149;
  // line-height: 48rpx;
  .mask{
    padding: 0;
    margin: 0;
    position: absolute;
    left:0;
    top:0;
    width: 2em;
    overflow: hidden;
  }
}
</style>
