<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">购物街商城</div></nav-bar>
    <user-info></user-info>
    <user-account></user-account>
    <list-view :list-data="orderList" class="order-list list-view"></list-view>
    <list-view :list-data="serviceList" class="service-list list-view"></list-view>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import UserInfo from './childComps/UserInfo'
  import UserAccount from './childComps/UserAccount'
  import ListView from './childComps/ListView'


  export default {
    name: "Profile",
    components:{
      NavBar,
      UserInfo,
      UserAccount,
      ListView
    },
    data(){
      return {
        orderList: [
          {icon: '#order', iconColor: '#ff8198', info: '我的消息'},
          {icon: '#point', iconColor: '#fc7b53', info: '积分商城'},
          {icon: '#vip', iconColor: '#ffc636', info: '会员卡'},
        ],
        serviceList: [
          {icon: '#service', iconColor: '#ff8198', info: '我的购物车'},
          {icon: '#download', iconColor: '#ff8198', info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
  #profile{
    background-color: #f2f2f2;
  }
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .list-view{
    margin-top: 12px;
  }
</style>
