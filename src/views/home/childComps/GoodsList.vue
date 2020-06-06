<template>
    <grid-view>
      <goods-list-item v-for="(item,index) in goodList" :key="index" :goods="item"></goods-list-item>
    </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import GoodsListItem from './GoodListItem'

  export default {
    name: "GoodsList",
    components:{
      GridView,
      GoodsListItem
    },
    props:{
      goodList:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style scoped>

</style>
