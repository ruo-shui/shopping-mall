<template>
  <div class="goods" @click="goToDetail">
    <img class="goods-img" :src="getImg" alt="">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">￥{{goods.price}}</span>
      <img src="~assets/img/common/collect.svg" alt="">
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    computed: {
      getImg() {
        return this.goods.img || this.goods.image || this.goods.show.img
      }
    },
    methods: {
      goToDetail() {
        let iid = this.goods.iid
        this.$router.push({path: '/detail', query: {iid}})
      }
    }
  }
</script>

<style scoped>
  .goods .goods-img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 14px;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info img {
    width: 14px;
    height: 14px;
  }
</style>
