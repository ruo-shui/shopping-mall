<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: {}
      }
    },
    methods: {
      _initScroll() {
        //创建better-scroll
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })
        //监听滚动事件
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
        //监听上拉到底部
        this.scroll.on('pullingUp', () => {
          console.log('上拉')
          this.$emit('pullingUp')
        })
      },
      refresh(){
        this.scroll && this.scroll.scrollTo &&this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.scrollTo &&this.scroll.finishPullUp()
      },
      scrollTo(x, y, time = 0) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      scrollGetY(){
        return this.scroll.y
      }
    },
    watch: {
      data() {
        setTimeout(this.refresh, 20)
      }
    },
    mounted() {
      setTimeout(this._initScroll, 20)
    }
  }
</script>

<style scoped>

</style>
