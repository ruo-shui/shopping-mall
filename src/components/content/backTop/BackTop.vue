<template>
  <div class="back-top" @click="topClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods:{
      topClick(){
        this.$emit('backTop')
      }
    }
  }
</script>

<style scoped>
  .back-top img{
    width: 43px;
    height: 43px;
  }
</style>
