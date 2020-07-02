<template>
  <div id="bottom-menu">
    <CheckedButton class="select-all" @checkBtnClick="checkBtnClick" :checked="isSelectAll"></CheckedButton>
    <span>全选</span>
    <span class="total-price">合计:¥{{totalPrice}}</span>
    <span class="buy-product">去合算({{cartCount}})</span>
  </div>
</template>

<script>
  import CheckedButton from './CheckButton'

  export default {
    name: "BottomBar",
    components: {
      CheckedButton
    },
    computed: {
      cartCount() {
        return this.$store.getters.cartCount
      },
      cartList() {
        return this.$store.getters.cartList
      },
      totalPrice() {
        const cartList = this.cartList
        return cartList.filter(item => item.checked)
          .reduce((preValue, item) => preValue + item.count * item.newPrice, 0)
          .toFixed(2)
      },
      isSelectAll() {
        return this.cartList.find(item => item.checked === false) === undefined
      }
    },
    methods: {
      checkBtnClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false
          })
        }else{
          this.cartList.forEach(item => {
            item.checked = true
          })
        }
      }
    }
  }
</script>

<style scoped>
  #bottom-menu{
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
  }

  .select-all{
    position: absolute;
    left: 12px;
    top: 13px;
    line-height: 0;
  }
  .total-price{
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product{
    background-color: var(--color-tint);
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
