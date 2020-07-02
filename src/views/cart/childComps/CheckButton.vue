<template>
  <div class="icon-selector" :class="{active:checked}" @click="selectItem">
    <img src="~/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      checked:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      selectItem(){
        this.$emit('checkBtnClick')
      }
    }
  }
</script>

<style scoped>
  .icon-selector{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #ccc;
  }
  .active{
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
