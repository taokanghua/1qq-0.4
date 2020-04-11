<template>
  <div id="app">
    <div class="loading" v-show="isShow">
      <img src="./assets/load.gif" alt="">
      <p>正在加载 请稍后...</p>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isShow: false
    }
  },
  watch:{
      '$store.state.loading'(val){
        this.isShow = val
      }
    }
}
</script>

<style lang="less">
.now{
    color: #3399ff !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width:768px;
  width: 100%;
  height: 100vh;
  margin: auto;
  overflow: hidden;
  position: relative;
}
.loading{
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  img{
    width: 20vw;
    height: 10%;
  }
  p{
    font-weight: 600;
    font-size: 12px;
  }
}
</style>
