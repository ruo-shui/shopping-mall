<template>
  <div id="detail">
    <detail-nav-bar class="sticky" @itemClick="titleClick" :current-index="currentIndex"></detail-nav-bar>
    <detail-swiper ref="base" :images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
    <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
    <div style="height: 58px"></div>
    <back-top class="back-top" v-show="showBackTop" @backTop="backTop">
      <img src="~assets/img/common/top.png" alt="">
    </back-top>
    <detail-bottom-bar @addToCart=""></detail-bottom-bar>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import BackTop from 'components/content/backTop/BackTop'
  import DetailBottomBar from './childComps/DetailBottomBar'


  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail"
  import {backTopMixin} from "common/mixin";

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      BackTop,
      DetailBottomBar
    },
    mixins:[backTopMixin],
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    created() {
      this._getDetailData()
      this._getRecommend()
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this._listenScrollTheme(window.pageYOffset)
        this.showBackTop = window.pageYOffset > 1000
      })
    },
    updated() {
      this._getOffsetTops()
      setTimeout(this._getOffsetTops, 500)
    },
    methods: {
      //获取详情页数据
      _getDetailData() {
        const iid = this.$route.query.iid
        this.iid = iid
        //请求数据
        getDetail(iid).then(res => {
          const data = res.result
          // 获取轮播图
          this.topImages = data.itemInfo.topImages
          // 获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          // 获取店铺信息
          this.shop = new Shop(data.shopInfo)
          // 获取商品信息
          this.detailInfo = data.detailInfo
          // 保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
          // 保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      //获取推荐数据
      _getRecommend() {
        getRecommend().then(res => {
          this.recommendList = res.data.list
        })
      },
      //获取主题到顶部高度
      _getOffsetTops() {
        this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop - 44)
        this.themeTops.push(this.$refs.param.$el.offsetTop - 44)
        this.themeTops.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTops.push(Number.MAX_VALUE)
      },
      _listenScrollTheme(position) {
        let length = this.themeTops.length
        for (let i = 0; i < length; i++) {
          if(position>=this.themeTops[i]&&position<this.themeTops[i+1]){
            this.currentIndex = i
          }
        }
      },
      //点击切换主题
      titleClick(index) {
        window.scrollTo(0, this.themeTops[index])
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  .sticky {
    position: sticky;
    top: 0;
  }

  .back-top{
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
