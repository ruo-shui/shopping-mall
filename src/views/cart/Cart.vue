<template>
  <div id="cart">
    <nav-bar class="nav-bar sticky">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <cart-list-item v-for="item in carList" :key="item.iid" :item-info="item"></cart-list-item>
    <bottom-bar></bottom-bar>
    <div style="height: 93px"></div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartListItem from './childComps/CartListItem'
  import BottomBar from './childComps/BottomBar'

  export default {
    name: "cart",
    components:{
      NavBar,
      CartListItem,
      BottomBar
    },
    computed:{
      carList(){
        return this.$store.getters.cartList
      },
      cartCount(){
        return this.$store.getters.cartCount
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .sticky {
    position: sticky;
    top: 0;
  }
</style>
