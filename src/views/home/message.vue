<template>
  <div class="message-container">
    <!-- 头部header栏 -->
    <myheader><i class="iconfont icon-i-add"></i></myheader>

    <!-- 聊天item     -->
    <div class="chat-item">
      <img src="http://taokanghua.cn/sources/avatar/20.jpg" alt="">
      <div class="chat-info">
        <div class="chat-head">
          <h4>it交流群</h4>
          <span>下午10:39</span>
        </div>
        <div class="content-msg">
          <p>kanghuat:hon的哈哈可惜我学python的哈哈</p>
          <div class="chat-msg-box">5</div>
        </div>
      </div>
    </div>

    <!-- 底部tab栏 -->
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
.message-container{
  width: 100%;
  height: 100vh;
  background-color: #F5F6FA;
}
.chat-item{
  display: flex;
  align-items: center;
  padding: 0 2%;
  margin-bottom: 10px;
  box-sizing: border-box;
  img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .chat-info{
    width: 100%;
    margin-left: 2%;
    .chat-head{
      width: 100%;
      display: flex;
      justify-content: space-between;
      h4{
        font-weight: 600;
        font-family: "Microsoft YaHei";
      }
      span{
        font-size: 12px;
        color:#B0B4BC;
      }
    }
    .content-msg{
      display: flex;
      justify-content: space-between;
      p{
        color:#B0B4BC;
        max-width: 70vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

      }
      .chat-msg-box{
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background-color: red;
        color: #fff;
        line-height: 17px;
        text-align: center;
      }
    }
  }
}
</style>