<template>
  <div class="chatpage-container">
    <!-- 头部 -->
    <myheader :nickname="info">
      <template v-slot:left>
        <div class="chat-back" @click="$router.go(-1)">
          <Icon type="ios-arrow-back" size="24"></Icon>
          <!-- <div class="back-message">50</div> -->
        </div>
      </template>
      <template v-slot:title>
        <!-- {{$route.params.id}} -->
        <span></span>
      </template>
      <Icon type="ios-more"></Icon>
    </myheader>
    <!-- 聊天盒子 -->
    <div class="chatbox">
      <!-- 别人发来的消息样式 -->
      <!-- <hemsg :data="{img:'http://taokanghua.cn/sources/avatar/20.jpg', name:null, cont:'你好鸭，我是xxx 很高兴认识你'}"></hemsg> -->
      <!-- <div class="he-chat-item" v-for="item in session.cont" :key="item">
          <img :src="session.img" alt="">
          <div class="content-box">
            <p>{{session.name}}</p>
            <div class="he-chat-i-content">
              {{item}}
            </div>
          </div>
        </div> -->
      <!-- 我的样式 -->
      <!-- <mymsg :data="data"></mymsg> -->
      <!-- <div class="he-chat-item my-chat-item">
          <div class="content-box">
            <p>西门吹大雪</p>
            <div class="he-chat-i-content my-chat-i-content">
              你好鸭，我是xxx 很高兴认识你
            </div>
          </div>
          
          <img src="http://taokanghua.cn/sources/avatar/5.jpg" alt="">
        </div> -->

      <!-- 用来跳转底部的盒子 -->
      <div class="bottom-view" ref="bview"></div>
    </div>
    <!-- 工具栏 -->
    <div class="chat-tools">
      <!-- 发送消息栏盒子 -->
      <div class="sendbox">
        <input type="text" v-model="iptcon" />
        <i-button type="primary" shape="circle" @click="sendmsg">发送</i-button>
      </div>
      <!-- 底部表情操作栏 -->
      <div class="tools-icon">
        <span class="iconfont icon-voice"></span>
        <span class="iconfont icon-picture"></span>
        <span class="iconfont icon-zhaoxiangji"></span>
        <span class="iconfont icon-hongbao"></span>
        <span class="iconfont icon-biaoqing"></span>
        <span class="iconfont icon-add"></span>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/index/header.vue";
import hemsg from "@/components/chat/heMessage.vue";
import mymsg from "@/components/chat/myMessage.vue";
export default {
  data() {
    return {
      info: "",
      iptcon: "",
      room:''
    };
  },
  sockets: {
    // 发送获取信息  以为发现dom插入子组件会加载不出来 就只能这样写了
    receivemsg(data) {
      this.$nextTick(()=>{
        this.renderMsg(data)
      })
    },
  },
  methods: {
    async getnickname() {
      const { data: res } = await this.axios(
        "/checkuser/" + this.$route.params.id
      );
      this.info = res.res;
    },
    inviteToRoom() {
      // 生成房间号
      let list = [this.$store.state.userinfo.id, this.$route.params.id];
      let max = Math.max(...list).toString();
      let min = Math.min(...list);
      let roomId = min + max;
      this.room = roomId
      // let roomId = Math.min(...list) + Math.Max(...list).toString()
      console.log(roomId)
      this.$socket.emit("inviteRoom", roomId);
    },
    sendmsg() {
      let data = {
        name: this.$store.state.userinfo.nickname,
        id: this.$store.state.userinfo.id,
        img: this.$store.state.userinfo.img,
        cont: [],
      };
      data.cont.push(this.iptcon);
      this.$socket.emit("sendmsg", data);
      this.iptcon = ''
    },
    renderMsg(data, ani='true') {
      if (data.id == this.$store.state.userinfo.id) {
        let text = `  <div class="he-chat-item my-chat-item">
          <div class="content-box">
            <p v-if="${data.name}">${data.name}</p>
            <div class="he-chat-i-content my-chat-i-content">
              ${data.cont}
            </div>
          </div>
          
          <img src="${data.img}" alt="">
    </div>`;
        this.$refs.bview.insertAdjacentHTML("beforebegin", text);
      } else {
        let text = `<div class="he-chat-item">
          <img src="${data.img}" alt="">
          <div class="content-box">
            <p v-if="${data.name}">${data.name}</p>
            <div class="he-chat-i-content">
              ${data.cont}
            </div>
          </div>
        </div>`;
        this.$refs.bview.insertAdjacentHTML("beforebegin", text);
      }
      if(ani){
        this.$refs.bview.scrollIntoView({ block: "end", behavior: "smooth" });
      }else{
        this.$refs.bview.scrollIntoView({ block: "end"});
      }
    },
    getHistoryMsg(){
      //获取历史聊天记录
      console.log(this.$store.state.roomcontent)
      let hisMsg = this.$store.state.roomcontent[this.room]
      console.log(hisMsg)
      if(hisMsg){
        hisMsg.forEach(item=>{
          this.renderMsg(item, false)
        })
      }
    },
    
  },
  components: {
    myheader,
    hemsg,
    mymsg,
  },
  watch:{
  },
  created() {
    this.getnickname();
    this.inviteToRoom();

  },
  mounted(){
    this.getHistoryMsg()
  },
  beforeDestroy(){
    this.$store.state.session.forEach(item=>{
      if(this.room == item.room){
        // this.$store.state.havemsg = false
        item.cont = []
      }
    })
  }
};
</script>

<style lang="less">
.chatpage-container {
  height: 100vh;
  background-color: #f5f6fa;
}
.chat-back {
  display: flex;
  align-items: center;
  .back-message {
    margin-left: -5px;
    box-sizing: content-box !important;
    border-radius: 50%;
    background-color: red;
    color: #fff;
    padding: 0 3px;
    font-size: 11px;
    // line-height: 12px;
    text-align: center;
  }
}
.chatbox {
  padding: 0 2%;
  max-height: 80%;
  overflow: auto;
  .he-chat-item {
    display: flex;
    margin-bottom: 8px;
    padding-right: 50px;
    padding-left: 0;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    p {
      font-size: 11px;
      text-align: left;
      color: #c3cbd6;
    }
    .he-chat-i-content {
      display: flex;
      align-items: center;
      margin-left: 5px;
      border-radius: 5px;
      background-color: #1fbafc;
      color: #fff;
      text-align: left;
      padding: 4px;
      position: relative;
      &:before {
        content: "";
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 6px solid #1fbafc;
        border-bottom: 6px solid transparent;
        border-left: 0 solid transparent;
        position: absolute;
        left: 0;
        top: 5px;
        transform: translateX(-98%);
      }
    }
  }
  .my-chat-item {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-left: 45px;
    padding-right: 0;
    position: relative;
    p {
      text-align: right;
    }
    .my-chat-i-content {
      margin-right: 5px;
      &::before {
        display: none;
      }
      &:after {
        content: "";
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 0px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 6px solid #1fbafc;
        position: absolute;
        right: 0;
        top: 5px;
        transform: translateX(98%);
      }
    }
  }
}
.chat-tools {
  max-width: 768px;
  margin: auto;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0 3%;
  .sendbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      flex: 1;
      border: none;
      outline: none;
      box-shadow: 0 0 2px 1px #ccc;
      border-radius: 10px;
      margin-right: 5px;
      padding: 5px 0 5px 5px;
    }
    button {
      padding-top: 5px;
      padding-bottom: 5px;
      font-weight: 400;
    }
  }
  .tools-icon {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 24px;
      color: #979eb3;
    }
  }
}
</style>
