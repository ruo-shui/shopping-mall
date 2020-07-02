<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
import SvgIcon from 'components/content/Icon/svg.vue'

export default {
  name: 'App',
  components: {
    MainTabBar,
    SvgIcon
  }
}
</script>

<style>
  @import "assets/css/base.css";

  #app{
    position: relative;
  }
</style>
