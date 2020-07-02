<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration = 2000){
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    height: 22px;
    line-height: 22px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 0 10px;
    color: #fff;
    background-color: rgba(0,0,0,0.7);
    z-index: 10;
  }
</style>
