<template>
  <div class="contact-container">
    <myheader>
        <router-link :to="{name:'addfriend'}" tag="i" class="iconfont icon-tianjiayonghu"></router-link>
    </myheader>
    <scrollcom>首次登陆请先点击左侧头像设置用户信息，否则别人搜不到你哦~</scrollcom>

     <keep-alive>
    <div >
     
        <userlistitem v-for="item in friendlist" :key="item" :id="item"></userlistitem>
      
    </div>
    </keep-alive>
    
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/index/tabBar.vue'
import myheader from '@/components/index/header.vue'
import scrollcom from '@/components/other/scrollcom.vue'
import userlistitem from '@/components/other/userlistitem.vue'
export default {
  data(){
    return{
      friendlist: this.$store.state.userinfo.personlist.friends //好友列表
    }
  },
  methods:{},
  components:{
    tabbar,
    myheader,
    scrollcom,
    userlistitem
  },
  created(){
    // console.dir(this.friendlist)
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