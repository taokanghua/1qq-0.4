<template>
  <div class="discover-container">
    <myheader><i class="iconfont icon-Settings"></i></myheader>
    <h1>this is discover page</h1>
    <tabbar></tabbar>
  </div>
  
</template>

<script>
import tabbar from '@/components/index/tabBar.vue'
import myheader from '@/components/index/header.vue'
export default {
  data(){
    return{}
  },
  methods:{},
  components:{
    tabbar,
    myheader
  }
}
</script>

<style lang="less" scoped>
.discover-container{
  width: 100%;
  height: 100vh;
  background-color: #F5F6FA;
}
</style>