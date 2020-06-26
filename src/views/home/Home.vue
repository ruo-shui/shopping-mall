<template>
  <div id="home">
    <nav-bar class="nav-bar sticky" >
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :data="showGoodList"
            :pull-up-load="true"
            :probe-type="3">
      <home-swiper :banners="banners" ref="hSwiper"></home-swiper>
      <recommends-view :recommends="recommends"></recommends-view>
      <pop-view></pop-view>
      <tab-control @itemClick="tabClick"
                   ref="tabControl1"
                   :titles="['流行','新款','精选']"></tab-control>
      <goods-list :goodList="showGoodList"></goods-list>
    </scroll>
    <tab-control v-show="isTabFixed"
                 @itemClick="tabClick"
                 :titles="['流行','新款','精选']"
                 ref="tabControl2"
                 class="fixed"></tab-control>
    <back-top class="back-top" @backTop="backTop" v-show="isShowBackTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendsView from './childComps/RecommendView'
  import PopView from './childComps/PopView'
  import GoodsList from './childComps/GoodsList'

  import {getHomeMultidata, getHomeData, BANNER, RECOMMEND} from "network/home"
  import {POP, NEW, SELL, BACKTOP_DISTANCE} from "common/const"

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendsView,
      PopView,
      GoodsList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goodList: {
          'pop': {page: 1, List: []},
          'new': {page: 1, List: []},
          'sell': {page: 1, List: []}
        },
        currentType: POP,
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoodList() {
        return this.goodList[this.currentType].List
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      //内容滚动
      contentScroll(position) {
        this.isShowBackTop = -position.y > BACKTOP_DISTANCE
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      //上拉加载更多
      loadMore() {
        this.getHomeData(this.currentType)
        setTimeout(this.$refs.scroll.refresh, 100)
      },
      //回到顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      //网络请求相关方法
      getMultiData() {
        getHomeMultidata().then(res => {
          this.banners = res.data[BANNER].list
          this.recommends = res.data[RECOMMEND].list
        })
      },
      getHomeData(type) {
        getHomeData(type, this.goodList[type].page).then(res => {
          const goodList = res.data.list
          this.goodList[type].List.push(...goodList)
          this.goodList[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    //生命周期函数，组件被创建的时候调用
    created() {
      //请求多个数据
      this.getMultiData()

      //请求商品数据
      this.getHomeData(POP)
      this.getHomeData(NEW)
      this.getHomeData(SELL)
    },
    updated() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100vh;
  }
  .sticky{
    position: sticky;
    top:0;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }

  .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
</style>
