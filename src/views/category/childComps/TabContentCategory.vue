<template>
  <grid-view :cols="3" :lineSpace="15" :v-margin="20">
    <div class="item" v-for="(item,index) in subcategories" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" class="item-img">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'

  export default {
    name: "TabContentCategory",
    components: {
      GridView
    },
    props: {
      subcategories: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    text-align: center;
    font-size: 12px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
