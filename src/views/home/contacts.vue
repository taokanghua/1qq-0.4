<template>
  <div class="contact-container">
    <myheader>
        <router-link :to="{name:'addfriend'}" tag="i" class="iconfont icon-tianjiayonghu"></router-link>
    </myheader>
      <h1>this is contacts page</h1>
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
  },
  created(){
    
  }
}
</script>

<style lang="less" scoped>
.contact-container{
  width: 100%;
  height: 100vh;
  background-color: #F5F6FA;
}
</style>