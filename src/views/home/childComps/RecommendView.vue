<template>
    <div class="recommend">
      <div class="recommendItem" v-for="item in recommends">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        props: Array,
        default:[]
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 10px solid #eee;
  }
  .recommendItem{
    flex:1
  }
  .recommend img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
