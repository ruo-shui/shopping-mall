<template>
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" >
      </div>
      <div class="title" slot="center">
        <div class="title-item"
             v-for="(item,index) in titles"
             :class="{active:index===currentIndex}"
             @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components:{
      NavBar
    },
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
      }
    },
    props:{
      currentIndex:{
        type:Number,
        default:0
      }
    },
    methods:{
      titleClick(index){
        this.$emit('itemClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav{
    background-color: #fff;
  }
  .title{
    display: flex;
    padding: 0 20px;
    font-size: 15px;
  }
  .title-item{
    flex: 1;
  }
  .title .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 12px;
  }
</style>
